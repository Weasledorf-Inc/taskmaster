import * as cdk from '@aws-cdk/core';
import * as cdkPipeline from '@aws-cdk/pipelines';
import * as codecommit from '@aws-cdk/aws-codecommit';
import { TaskMasterApiStack } from './api-gateway.stack';
import { TaskMasterDbStack } from './dynamodb.stack';
import { devEnv } from './main';


export class APIStage extends cdk.Stage {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StageProps) {
    super(scope, id, props);
    new TaskMasterApiStack(this, 'task-master-api', props);
  }
}

export class DynamoDBStage extends cdk.Stage {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StageProps) {
    super(scope, id, props);
    new TaskMasterDbStack(this, 'dynamodb-stacks', props);
  }
}

export class SelfMutatingPipelineStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);
    
    const repo = codecommit.Repository.fromRepositoryName(this, 'repo', 'taskmaster');

    const pipeline = new cdkPipeline.CodePipeline(this, 'self-mutating-pipeline', {
      synth: new cdkPipeline.ShellStep('Synth', {
        input: cdkPipeline.CodePipelineSource.codeCommit(repo, 'main'),
        commands: [
          'yarn install',
          'yarn build',
          'npx cdk synth'
        ],
      }),
    });

    pipeline.addStage(new APIStage(this, 'dev-api-stage', {env: devEnv}));
    pipeline.addStage(new DynamoDBStage(this, 'dev-dynamo-db', {env: devEnv}));

  }
}