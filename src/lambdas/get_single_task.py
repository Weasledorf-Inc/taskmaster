import json
import os
import boto3


def handler(event, context):
  client = boto3.client('dynamodb')
  print(event)
  taskTable = os.environ['TASK_TABLE_NAME']
  parameters = event['pathParameters']
  taskId = parameters['taskId']

  print(f"TASK TABLE: {taskTable}")

  try:
    item = client.get_item(
      TableName=taskTable,
      Key={
            'taskId': {
                'S': taskId
            }
        }
    )

    if not "Item" in item:
      return {
        "statusCode": 404,
        "body": f"Task {taskId} NOT FOUND!!"
      }

    return {
      "statusCode": 200,
      "body": json.dumps(item)
    }
  except Exception as e:
    raise e
