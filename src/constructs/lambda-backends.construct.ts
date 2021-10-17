import * as path from 'path';
import * as lambda from '@aws-cdk/aws-lambda';
import * as cdk from '@aws-cdk/core';

export class LambdaBackendConstruct extends cdk.Construct {
  public getAllTasksLambda: lambda.Function;
  public getAllUsersLambda: lambda.Function;
  public getSingleTaskLambda: lambda.Function;
  public getSingleUserLambda: lambda.Function;
  public createTaskLambda: lambda.Function;
  public createUserLambda: lambda.Function;
  public updateTaskLambda: lambda.Function;
  public updateUserLambda: lambda.Function;
  public deleteTaskLambda: lambda.Function;
  public deleteUserLambda: lambda.Function;

  constructor(scope: cdk.Construct, id: string, envName: string, environmentVariables?: {[key: string]: string}) {
    super(scope, id);
    // Lambda Functions
    this.getAllTasksLambda = new lambda.Function(this, 'get-task-lambda', {
      code: lambda.Code.fromAsset(
        path.join(__dirname, '../lambdas'),
        {
          exclude: ['**', '!get_tasks.py'],
        },
      ),
      functionName: `get-tasks-${envName}`,
      environment: environmentVariables,
      runtime: lambda.Runtime.PYTHON_3_9,
      handler: 'get_tasks.handler',
    });

    this.getSingleTaskLambda = new lambda.Function(this, 'get-single-task-lambda', {
      code: lambda.Code.fromAsset(
        path.join(__dirname, '../lambdas'),
        {
          exclude: ['**', '!get_single_task.py'],
        },
      ),
      functionName: `get-single-task-${envName}`,
      environment: environmentVariables,
      runtime: lambda.Runtime.PYTHON_3_9,
      handler: 'get_single_task.handler',
    });

    this.createTaskLambda = new lambda.Function(this, 'create-task-lambda', {
      code: lambda.Code.fromAsset(
        path.join(__dirname, '../lambdas'),
        {
          exclude: ['**', '!create_task.py'],
        },
      ),
      functionName: `create-task-${envName}`,
      environment: environmentVariables,
      runtime: lambda.Runtime.PYTHON_3_9,
      handler: 'create_task.handler',
    });

    this.updateTaskLambda = new lambda.Function(this, 'update-task-lambda', {
      code: lambda.Code.fromAsset(
        path.join(__dirname, '../lambdas'),
        {
          exclude: ['**', '!update_task.py'],
        },
      ),
      functionName: `update-task-${envName}`,
      environment: environmentVariables,
      runtime: lambda.Runtime.PYTHON_3_9,
      handler: 'update_task.handler',
    });

    this.deleteTaskLambda = new lambda.Function(this, 'delete-task-lambda', {
      code: lambda.Code.fromAsset(
        path.join(__dirname, '../lambdas'),
        {
          exclude: ['**', '!delete_task.py'],
        },
      ),
      functionName: `delete-task-${envName}`,
      environment: environmentVariables,
      runtime: lambda.Runtime.PYTHON_3_9,
      handler: 'delete_task.handler',
    });

    this.getAllUsersLambda = new lambda.Function(this, 'get-all-users-lambda', {
      code: lambda.Code.fromAsset(
        path.join(__dirname, '../lambdas'),
        {
          exclude: ['**', '!get_users.py'],
        },
      ),
      functionName: `get-users-${envName}`,
      environment: environmentVariables,
      runtime: lambda.Runtime.PYTHON_3_9,
      handler: 'get_users.handler',
    });

    this.getSingleUserLambda = new lambda.Function(this, 'get-single-user-lambda', {
      code: lambda.Code.fromAsset(
        path.join(__dirname, '../lambdas'),
        {
          exclude: ['**', '!get_single_user.py'],
        },
      ),
      functionName: `get-single-user-${envName}`,
      environment: environmentVariables,
      runtime: lambda.Runtime.PYTHON_3_9,
      handler: 'get_single_user.handler',
    });

    this.createUserLambda = new lambda.Function(this, 'create-user-lambda', {
      code: lambda.Code.fromAsset(
        path.join(__dirname, '../lambdas'),
        {
          exclude: ['**', '!create_user.py'],
        },
      ),
      functionName: `create-user-${envName}`,
      environment: environmentVariables,
      runtime: lambda.Runtime.PYTHON_3_9,
      handler: 'create_user.handler',
    });

    this.updateUserLambda = new lambda.Function(this, 'update-user-lambda', {
      code: lambda.Code.fromAsset(
        path.join(__dirname, '../lambdas'),
        {
          exclude: ['**', '!update_user.py'],
        },
      ),
      functionName: `update-user-${envName}`,
      environment: environmentVariables,
      runtime: lambda.Runtime.PYTHON_3_9,
      handler: 'update_user.handler',
    });


    this.deleteUserLambda = new lambda.Function(this, 'delete-user-lambda', {
      code: lambda.Code.fromAsset(
        path.join(__dirname, '../lambdas'),
        {
          exclude: ['**', '!delete_user.py'],
        },
      ),
      functionName: `delete-user-${envName}`,
      environment: environmentVariables,
      runtime: lambda.Runtime.PYTHON_3_9,
      handler: 'delete_user.handler',
    });
  }
}