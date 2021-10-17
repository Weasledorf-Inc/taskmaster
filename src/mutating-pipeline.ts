import * as codecommit from '@aws-cdk/aws-codecommit';
import * as cdk from '@aws-cdk/core';
import * as cdkPipeline from '@aws-cdk/pipelines';
import { TaskMasterApiStack } from './api-gateway.stack';
import { devEnv, testEnv } from './constants';

export class APIStage extends cdk.Stage {
  constructor(scope: cdk.Construct, id: string, envName: string, props?: cdk.StageProps) {
    super(scope, id, props);
    new TaskMasterApiStack(this, 'task-master-api', envName, props);

    cdk.Tags.of(this).add('CreatedBy', 'Task Master Mutating Pipeline');
    cdk.Tags.of(this).add('Project', 'Task Master');
    cdk.Tags.of(this).add('Environment', envName);
  }
}
export class SelfMutatingPipelineStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const repo = codecommit.Repository.fromRepositoryName(this, 'repo', 'taskmaster');

    const pipeline = new cdkPipeline.CodePipeline(this, 'self-mutating-pipeline', {
      pipelineName: 'task-master-infrastructure',
      crossAccountKeys: true,
      synth: new cdkPipeline.ShellStep('Synth', {
        input: cdkPipeline.CodePipelineSource.codeCommit(repo, 'main'),
        commands: [
          'yarn install',
          'yarn build',
          'npx cdk synth',
        ],
      }),
    });

    const devWave = pipeline.addWave('dev-wave');
    devWave.addStage(new APIStage(this, 'dev-api-stage', 'dev', { env: devEnv }));

    const testWave = pipeline.addWave('test-wave');
    testWave.addStage(new APIStage(this, 'test-api-stage', 'test', { env: testEnv }));
  }
}