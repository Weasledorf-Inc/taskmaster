import json

import boto3

# https://boto3.amazonaws.com/v1/documentation/api/latest/reference/services/dynamodb.html
def handler(event, context):
  post_tasks(taskDetails, createdBy, assignedTo, clonedBy, status, createdDate, completedDate, dueDate, reminder)

def post_tasks(taskDetails, createdBy, assignedTo, clonedBy, status, createdDate, completedDate, dueDate, reminder):
  client = boto3.client('dynamodb')
  response = client.put_item(
      TableName='task-master-tasks',
      Item={
        'taskDetails': taskDetails,
        'createdBy': createdBy,
      },
  )
  return response