import boto3
import os
import simplejson as json
import uuid

from datetime import datetime, timezone

# https://boto3.amazonaws.com/v1/documentation/api/latest/reference/services/dynamodb.html
def handler(event, context):
    taskTable = os.environ['TASK_TABLE_NAME']

    try:
        client = boto3.client('dynamodb')
        body = json.loads(event['body'])
        
        taskDetails = body['taskDetails']
        
        dt = datetime.now(tz=timezone.utc)
        createdDate = str(dt.strftime("%Y%m%d%H%M%S"))
        
        task_item = {
            'taskId': {
                'S': str(uuid.uuid1())
            },
            'taskDetails': {
                'S': taskDetails
            },
            'createdDate': {
                'N': createdDate
            }
        }
        
        if 'createdBy' in task_item:
            task_item.update({'N': task_item['createdBy']})
        
        if 'reminderTime' in task_item:
            task_item.update({'N': task_item['reminderTime']})
        
        if 'assignedTo' in task_item:
            task_item.update({'S': task_item['assignedTo']})
        
        if 'clonedBy' in task_item:
            task_item.update({'S': task_item['clonedBy']})
        
        if 'dueDate' in task_item:
            task_item.update({'S': task_item['dueDate']})
        
        if 'status' in task_item:
            task_item.update({'S': task_item['status']})
        
        client.put_item(
            TableName=taskTable,
            Item=task_item
        )
        return {
            'statusCode': 200,
            'body': json.dumps(event)
        }
    except Exception as err:
        return {
            'statusCode': 500,
            'body': json.dumps(err)
        }        