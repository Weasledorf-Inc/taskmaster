import { App, Construct, RemovalPolicy, Stack, StackProps, Tags} from '@aws-cdk/core';
import * as dynamodb from '@aws-cdk/aws-dynamodb';

// for development, use account/region from cdk cli
const devEnv = {
  account: "496834626558",
  region: "us-east-1",
};

export class TaskMasterApi extends Stack {
  constructor(scope: Construct, id: string, props: StackProps = {}) {
    super(scope, id, props);

  }
}

export class TaskMasterDb extends Stack {
  constructor(scope: Construct, id: string, props: StackProps = {}) {
    super(scope, id, props);

    new dynamodb.Table(this, 'task-master-users', {
      tableName: 'task-master-users',
      partitionKey: { name: 'id', type: dynamodb.AttributeType.STRING },
      sortKey: { name: 'username', type: dynamodb.AttributeType.STRING },
      removalPolicy: RemovalPolicy.DESTROY
    })

    new dynamodb.Table(this, 'task-master-tasks', {
      tableName: 'task-master-tasks',
      partitionKey: { name: 'id', type: dynamodb.AttributeType.STRING },
      removalPolicy: RemovalPolicy.DESTROY
    })
  }
}

const app = new App();
new TaskMasterApi(app, 'TaskMasterApi', { env: devEnv });
new TaskMasterDb(app, 'TaskMasterDb', { env: devEnv });

Tags.of(app).add(
  'CreatedBy', 'TaskMasterCDK'
)
app.synth();