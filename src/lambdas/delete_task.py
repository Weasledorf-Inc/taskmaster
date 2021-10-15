import json
import boto3    

# https://boto3.amazonaws.com/v1/documentation/api/latest/reference/services/dynamodb.html
def handler(event, context):
  client = boto3.client('dynamodb')
  print(event)
  print("***************")
  print(context)

  return {
    "statusCode": 200,
    "body": json.dumps(event)
  }
