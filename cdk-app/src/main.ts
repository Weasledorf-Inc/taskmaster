import { App, Construct, Stack, StackProps } from '@aws-cdk/core';
import * as dynamodb from '@aws-cdk/aws-dynamodb';


export class MyStack extends Stack {
  constructor(scope: Construct, id: string, props: StackProps = {}) {
    super(scope, id, props);

    new dynamodb.Table(this, 'table', {
      partitionKey: { name: 'id', type: dynamodb.AttributeType.STRING }
    })
  }
}

// for development, use account/region from cdk cli
const devEnv = {
  account: "496834626558",
  region: "us-east-1",
};

const app = new App();

new MyStack(app, 'my-stack-dev', { env: devEnv });
// new MyStack(app, 'my-stack-prod', { env: prodEnv });

app.synth();