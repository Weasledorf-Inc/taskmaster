import { App, Tags} from '@aws-cdk/core';
import { TaskMasterApiStack } from './api-gateway.stack';
import { TaskMasterDbStack } from './dynamodb.stack';


// for development, use account/region from cdk cli
const devEnv = {
  account: "496834626558",
  region: "us-east-1",
};

const app = new App();
new TaskMasterApiStack(app, 'TaskMasterApi', { env: devEnv });
new TaskMasterDbStack(app, 'TaskMasterDb', { env: devEnv });

Tags.of(app).add(
  'CreatedBy', 'TaskMasterCDK'
);

app.synth();