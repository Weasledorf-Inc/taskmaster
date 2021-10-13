import { App, Construct, RemovalPolicy, Stack, StackProps, Tags} from '@aws-cdk/core';
import * as dynamodb from '@aws-cdk/aws-dynamodb';
import * as apigateway from '@aws-cdk/aws-apigateway';

// for development, use account/region from cdk cli
const devEnv = {
  account: "496834626558",
  region: "us-east-1",
};

export class TaskMasterApi extends Stack {
  constructor(scope: Construct, id: string, props: StackProps = {}) {
    super(scope, id, props);

    const api = new apigateway.RestApi(this, 'task-master-api', {
      restApiName: 'Task Master Api'
    });

    // Resources
    const tasks = api.root.addResource('task'); // /task
    const task = tasks.addResource('{taskId}'); // /task/{taskId}
    const users = api.root.addResource('user'); // /user
    const user = users.addResource('{userId}'); // /user/{userId}

    // Task Operations
    tasks.addMethod('GET')
    tasks.addMethod('POST')

    task.addMethod('GET')
    task.addMethod('PUT')
    task.addMethod('DELETE')

    // User Operations
    users.addMethod('GET')
    users.addMethod('POST')

    user.addMethod('GET')
    user.addMethod('PUT')
    user.addMethod('DELETE')

    /**
     * Request Models
     */
    api.addModel(
        'user-request-model',
        {
          modelName: 'userRequestModel',
          contentType: 'application/json',
          description: 'Request Model for Users',
          schema: {
            type: apigateway.JsonSchemaType.OBJECT,
            required: ['username', 'email'],
            properties: {
              username: {
                type: apigateway.JsonSchemaType.STRING
              },
              email: {
                type: apigateway.JsonSchemaType.STRING
              }
            }
          }
        }
    )

    // example adding lambda function to Method
    // user.addMethod('PUT',
    //     new apigateway.LambdaIntegration(someLambdaFunction),
    //     {
    //       requestModels: {
    //         'application/json': userRequestModel
    //       }
    //     }
    // );


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