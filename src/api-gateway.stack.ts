import { Stack, StackProps, Construct } from '@aws-cdk/core';
import * as apigateway from '@aws-cdk/aws-apigateway';
import { LambdaBackendConstruct } from './lambda-backends.construct';

export class TaskMasterApiStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const api = new apigateway.RestApi(this, 'task-master-api', {
      restApiName: 'Task Master Api'
    });

    const backendLambdas = new LambdaBackendConstruct(this, 'backend-lambdas');

    /**
     * Request Models
     * 
     */

    // Available Endpoints Response Model
    const availableEndpointsResponseModel = api.addModel(
      'available-endpoints-response-model',
      {
        modelName: 'availableEndpointsResponseModel',
        contentType: 'application/json',
        description: 'All Available Endpoints In API',
        schema: {
          type: apigateway.JsonSchemaType.ARRAY,
          properties: {
            endpoint: {
              type: apigateway.JsonSchemaType.STRING,
            },
          },
        },
      },
    );

    // User Request Model
    const userRequestModel = api.addModel(
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
    );
    
    // User Response Model
    const userResponseModel = api.addModel(
      'user-response-model',
      {
        modelName: 'userResponseModel',
        contentType: 'application/json',
        description: 'Response Model For Users',
        schema: {
          type: apigateway.JsonSchemaType.OBJECT,
          properties: {
            id: {
              type: apigateway.JsonSchemaType.INTEGER,
            },
            username: {
              type: apigateway.JsonSchemaType.STRING,
            },
            email: {
              type: apigateway.JsonSchemaType.STRING,
            },
          }
        }
      }
    );

    // Task Request Model
    const taskRequestModel = api.addModel(
      'task-request-model',
      {
        modelName: 'taskRequestModel',
        contentType: 'application/json',
        description: 'Request Model For Tasks',
        schema: {
          type: apigateway.JsonSchemaType.OBJECT,
          required: ['taskDetails', 'createdBy'],
          properties: {
            taskDetails: {
              type: apigateway.JsonSchemaType.STRING,
            },
            createdBy: {
              type: apigateway.JsonSchemaType.INTEGER
            },
            assignedTo: {
              type: apigateway.JsonSchemaType.INTEGER
            },
            clonedBy: {
              type: apigateway.JsonSchemaType.INTEGER
            },
            status: {
              type: apigateway.JsonSchemaType.STRING
            },
            createdDate: {
              type: apigateway.JsonSchemaType.STRING
            },
            completedDate: {
              type: apigateway.JsonSchemaType.STRING
            },
            dueDate: {
              type: apigateway.JsonSchemaType.STRING
            },
            reminder: {
              type: apigateway.JsonSchemaType.STRING
            }
          }
        }
      }
    );

    // Task Response Model
    const taskResponseModel = api.addModel(
      'task-response-model',
      {
        modelName: 'taskResponseModel',
        contentType: 'application/json',
        description: 'Response Model For Tasks',
        schema: {
          type: apigateway.JsonSchemaType.OBJECT,
          properties: {
            id: {
              type: apigateway.JsonSchemaType.INTEGER
            },
            taskDetails: {
              type: apigateway.JsonSchemaType.STRING
            },
            createdBy: {
              type: apigateway.JsonSchemaType.INTEGER
            },
            assignedTo: {
              type: apigateway.JsonSchemaType.INTEGER
            },
            clonedBy: {
              type: apigateway.JsonSchemaType.INTEGER
            },
            status: {
              type: apigateway.JsonSchemaType.STRING
            },
            createdDate: {
              type: apigateway.JsonSchemaType.STRING
            },
            completedDate: {
              type: apigateway.JsonSchemaType.STRING
            },
            dueDate: {
              type: apigateway.JsonSchemaType.STRING
            },
            reminder: {
              type: apigateway.JsonSchemaType.STRING
            }
          }
        }
      }
    );

    /**
     * API Gateway Stuff
     */

    // Resources
    const tasks = api.root.addResource('task'); // /task
    const task = tasks.addResource('{taskId}'); // /task/{taskId}
    const users = api.root.addResource('user'); // /user
    const user = users.addResource('{userId}'); // /user/{userId}

    // Task Operations

    // /
    api.root.addMethod('GET', 
      new apigateway.LambdaIntegration(backendLambdas.getAllTasksLambda), // TODO: Change to corresponding lambda
      {
        methodResponses: [
          {
            statusCode: '200',
            responseModels: {
              'application/json': availableEndpointsResponseModel,
            },
          },
        ],
      },
    );

    // /task
    tasks.addMethod('GET',
      new apigateway.LambdaIntegration(backendLambdas.getAllTasksLambda),
      {
        methodResponses: [
          { 
            statusCode: '200',
            responseModels: {
              'application/json': taskResponseModel
            },
          },
        ],
      },
    );
    
    tasks.addMethod('POST',
      new apigateway.LambdaIntegration(backendLambdas.createTaskLambda),
      {
        requestModels: {
          'application/json': taskRequestModel
        },
        methodResponses: [
          {
            statusCode: '200',
            responseModels: {
              'application/json': taskResponseModel,
            }
          },
          {
            statusCode: '403',
          }
        ]
      }
    );

    // /task/{taskId}
    task.addMethod('GET',
      new apigateway.LambdaIntegration(backendLambdas.getSingleTaskLambda),
      {
        methodResponses: [
          {
            statusCode: '200', 
            responseModels: {
              'application/json': taskResponseModel
            },
          },
          {
            statusCode: '403',
          },
          {
            statusCode: '404',
          }
        ],
      },
    );

    task.addMethod('PUT', 
      new apigateway.LambdaIntegration(backendLambdas.updateTaskLambda),
      {
        methodResponses: [
          {
            statusCode: '200', 
            responseModels: {
              'application/json': taskResponseModel
            },
          },
          {
            statusCode: '403',
          },
          {
            statusCode: '404',
          }
        ],
      },
    );

    task.addMethod('DELETE',
      new apigateway.LambdaIntegration(backendLambdas.deleteTaskLambda),
      {
        methodResponses: [
          {
            statusCode: '200', 
            responseModels: {
              'application/json': taskResponseModel
            },
          },
          {
            statusCode: '403',
          },
          {
            statusCode: '404',
          }
        ],
      },
    )

    // User Operations

    // /user
    users.addMethod('GET',
      new apigateway.LambdaIntegration(backendLambdas.getAllUsersLambda),
      {
        methodResponses: [
          {
            statusCode: '200', 
            responseModels: {
              'application/json': userResponseModel
            },
          },
          {
            statusCode: '403',
          },
        ],
      },
    );

    users.addMethod('POST',
      new apigateway.LambdaIntegration(backendLambdas.createUserLambda),
      {
        requestModels: {
          'application/json': userRequestModel
        },
        methodResponses: [
          {
            statusCode: '200', 
            responseModels: {
              'application/json': userResponseModel
            },
          },
          {
            statusCode: '403',
          },
        ],
      },
    );

    // /user/{userId}
    user.addMethod('GET', 
      new apigateway.LambdaIntegration(backendLambdas.getSingleUserLambda),
      {
        methodResponses: [
          {
            statusCode: '200', 
            responseModels: {
              'application/json': userResponseModel
            },
          },
          {
            statusCode: '403',
          },
          {
            statusCode: '404',
          }
        ],
      },
    );

    user.addMethod('PUT', 
      new apigateway.LambdaIntegration(backendLambdas.updateUserLambda),
      {
        methodResponses: [
          {
            statusCode: '200', 
            responseModels: {
              'application/json': userResponseModel
            },
          },
          {
            statusCode: '403',
          },
          {
            statusCode: '404',
          }
        ],
      },
    );

    user.addMethod('DELETE', 
      new apigateway.LambdaIntegration(backendLambdas.deleteUserLambda),
      {
        methodResponses: [
          {
            statusCode: '200',
          },
          {
            statusCode: '403',
          },
          {
            statusCode: '404',
          }
        ],
      },
    );
  }
}