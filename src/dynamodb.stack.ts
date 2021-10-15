import { Construct, RemovalPolicy, Stack, StackProps } from '@aws-cdk/core';
import * as dynamodb from '@aws-cdk/aws-dynamodb';

export class TaskMasterDbStack extends Stack {
  constructor(scope: Construct, id: string, props: StackProps = {}) {
    super(scope, id, props);

    new dynamodb.Table(this, 'task-master-users', {
      tableName: 'task-master-users',
      partitionKey: { name: 'userId', type: dynamodb.AttributeType.NUMBER },
      sortKey: { name: 'username', type: dynamodb.AttributeType.STRING },
      removalPolicy: RemovalPolicy.DESTROY
    })

    new dynamodb.Table(this, 'task-master-tasks', {
      tableName: 'task-master-tasks',
      partitionKey: { name: 'taskId', type: dynamodb.AttributeType.NUMBER },
      removalPolicy: RemovalPolicy.DESTROY
    })
  }
}