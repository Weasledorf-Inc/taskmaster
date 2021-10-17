import { App, Tags } from '@aws-cdk/core';
import { devEnv, managementEnv } from './constants';
import { SelfMutatingPipelineStack } from './mutating-pipeline';
import { TaskMasterApiStack } from './stacks/api-gateway.stack';

const app = new App();

new SelfMutatingPipelineStack(app, 'SelfMutatingPipeline', { env: managementEnv });
const hasanTestStack = new TaskMasterApiStack(app, 'hasan-dev-stack', 'hasan-dev', { env: devEnv });

Tags.of(hasanTestStack).add('developer', 'hasan');

Tags.of(app).add(
  'CreatedBy', 'TaskMasterCDK',
);

app.synth();