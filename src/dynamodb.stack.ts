import * as dynamodb from '@aws-cdk/aws-dynamodb';
import { RemovalPolicy, Construct } from '@aws-cdk/core';

export class TaskMasterDbConstruct extends Construct {
  public userTable: dynamodb.Table;
  public taskTable: dynamodb.Table;
  constructor(scope: Construct, id: string, envName: string) {
    super(scope, id);

    this.userTable = new dynamodb.Table(this, 'task-master-users', {
      tableName: `task-master-users-${envName}`,
      partitionKey: { name: 'userId', type: dynamodb.AttributeType.NUMBER },
      sortKey: { name: 'username', type: dynamodb.AttributeType.STRING },
      removalPolicy: RemovalPolicy.DESTROY,
    });

    this.taskTable = new dynamodb.Table(this, 'task-master-tasks', {
      tableName: `task-master-tasks-${envName}`,
      partitionKey: { name: 'taskId', type: dynamodb.AttributeType.NUMBER },
      removalPolicy: RemovalPolicy.DESTROY,
    });
  }
}