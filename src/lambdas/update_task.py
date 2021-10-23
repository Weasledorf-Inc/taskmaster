import boto3
import os
import simplejson as json
import uuid

from datetime import datetime, timezone

# https://boto3.amazonaws.com/v1/documentation/api/latest/reference/services/dynamodb.html
def handler(event, context):
    taskTable = os.environ['TASK_TABLE_NAME']
    parameters = event['pathParameters']
    taskId = parameters['taskId']

    try:
        client = boto3.client('dynamodb')
        body = json.loads(event['body'])
        
        taskDetails = body['taskDetails']

        task_key = {
            'taskId': {
                'S': taskId
            }
        }
        
        item = client.get_item(
          TableName=taskTable,
          Key=task_key
        )

        if not "Item" in item:
          return {
            "statusCode": 404,
            "body": f"Task {taskId} NOT FOUND!!"
          }

        client.update_item(
            TableName=taskTable,
            Key=task_key,
            UpdateExpression="set taskDetails=:s",
            ExpressionAttributeValues={
                ":s": {
                  "S": taskDetails
                }
            },
            ReturnValues="UPDATED_NEW"
        )
        return {
            'statusCode': 200,
            'body': json.dumps(event)
        }
    except Exception as err:
        print(err)
        return {
            'statusCode': 500,
            'body': json.dumps(err)
        }        