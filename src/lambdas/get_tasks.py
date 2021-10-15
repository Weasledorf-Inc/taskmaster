import simplejson as json

import boto3

from boto3.dynamodb.types import TypeDeserializer

def from_dynamodb_to_json(item):
    d = TypeDeserializer()
    return {k: d.deserialize(value=v) for k, v in item.items()}
    

# https://boto3.amazonaws.com/v1/documentation/api/latest/reference/services/dynamodb.html
def handler(event, context):
  client = boto3.client('dynamodb')
  
  items = client.scan(
    TableName='task-master-tasks',
    Limit=100
  )
  
  new_items = []
  
  for i in items["Items"]:
    new_items.append(from_dynamodb_to_json(i))
  
  return {
    "statusCode": 200,
    "body": json.dumps(new_items)
  }
