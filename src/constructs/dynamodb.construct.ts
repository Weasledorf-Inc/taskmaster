import * as dynamodb from '@aws-cdk/aws-dynamodb';
import { RemovalPolicy, Construct } from '@aws-cdk/core';

export class TaskMasterDbConstruct extends Construct {
  public taskTable: dynamodb.Table;
  constructor(scope: Construct, id: string, envName: string) {
    super(scope, id);

    this.taskTable = new dynamodb.Table(this, 'task-master-tasks', {
      tableName: `task-master-tasks-${envName}`,
      partitionKey: { name: 'taskId', type: dynamodb.AttributeType.STRING },
      removalPolicy: RemovalPolicy.DESTROY,
    });
  }
}