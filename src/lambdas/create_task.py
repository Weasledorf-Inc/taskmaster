import boto3
import simplejson as json
import uuid
from datetime import datetime, timezone
client = boto3.client('dynamodb')

dt = datetime.now(tz=timezone.utc)
createdDate = str(dt.strftime("%Y%m%d%H%M%S"))

someItem = {
  'taskId': {
    'S': str(uuid.uuid1())
  },
  'taskDetails': {
    'S': 'hasan-task'
  },
  'createdDate': {
    'S': createdDate
  }
}

def post_tasks(task):
  client.put_item(
      TableName='ching-change',
      Item=task)


post_tasks(someItem)

# import boto3

# client = boto3.client('dynamodb')

# def handler(event, context):
#   data = client.put_item(
#     TableName='task-master-tasks',
#     Item={'taskDetails': {'S': 'Test task stuff'}, 'createdBy': {'S': 'some asshole'}, 'status': {'S': 'on'}, 'taskId': {'N': '054'}, 'createdDate': {'N': '12341'}}
#   )

#   response = {
#       'statusCode': 200,
#       'body': 'successfully created item!',
#       'headers': {
#         'Content-Type': 'application/json',
#         'Access-Control-Allow-Origin': '*'
#       },
#   }
  
#   return response

# https://boto3.amazonaws.com/v1/documentation/api/latest/reference/services/dynamodb.html
# def handler(event, context):
#   post_tasks(taskDetails, createdBy, assignedTo, clonedBy, status, createdDate, completedDate, dueDate, reminder)

# def post_tasks(taskDetails, createdBy, assignedTo, clonedBy, status, createdDate, completedDate, dueDate, reminder):
#   client = boto3.client('dynamodb')
#   response = client.put_item(
#       TableName='task-master-tasks',
#       Item={
#         'taskDetails': taskDetails,
#         'createdBy': createdBy,
#       },
#   )
#   return response