import { App, Tags } from '@aws-cdk/core';
import { managementEnv } from './constants';
import { SelfMutatingPipelineStack } from './mutating-pipeline';

const app = new App();

new SelfMutatingPipelineStack(app, 'SelfMutatingPipeline', { env: managementEnv });

Tags.of(app).add(
  'CreatedBy', 'TaskMasterCDK',
);

app.synth();