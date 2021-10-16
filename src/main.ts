import { App, Tags} from '@aws-cdk/core';
import { TaskMasterApiStack } from './api-gateway.stack';
import { devEnv, managementEnv } from './constants';
import { TaskMasterDbStack } from './dynamodb.stack';
import { SelfMutatingPipelineStack } from './mutating-pipeline';




const app = new App();
new TaskMasterApiStack(app, 'TaskMasterApi', { env: devEnv });
new TaskMasterDbStack(app, 'TaskMasterDb', { env: devEnv });

new SelfMutatingPipelineStack(app, 'SelfMutatingPipeline', {env: managementEnv});

Tags.of(app).add(
  'CreatedBy', 'TaskMasterCDK'
);

app.synth();