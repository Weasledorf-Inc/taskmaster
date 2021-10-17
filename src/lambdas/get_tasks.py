import simplejson as json

import boto3
import os

from boto3.dynamodb.types import TypeDeserializer

def from_dynamodb_to_json(item):
    d = TypeDeserializer()
    return {k: d.deserialize(value=v) for k, v in item.items()}
    

# https://boto3.amazonaws.com/v1/documentation/api/latest/reference/services/dynamodb.html
def handler(event, context):
  client = boto3.client('dynamodb')
  
  current_page = 1
  table_name = os.environ.get('TASK_TABLE_NAME')
  
  try:
    queryString = event["queryStringParameters"] if "queryStringParameters" in event else ""
    page_size_limit = int(queryString["page_size"]) if "page_size" in queryString else 100
    desired_page = int(queryString["page"]) if "page" in queryString else 1

    page_items = client.scan(
      TableName=table_name,
      Limit=page_size_limit,
    )
    
    lastEvaluated = page_items["LastEvaluatedKey"]

    items_in_page = len(page_items["Items"])
    print(f"Page {current_page} Results Contained: {items_in_page} Items")

    while desired_page > current_page:
      page_items = client.scan(
        TableName=table_name,
        Limit=page_size_limit,
        ExclusiveStartKey=lastEvaluated
      )
      current_page += 1
      items_in_page = len(page_items["Items"])
      print(f"Page {current_page} Results Contained: {items_in_page} Items")
      
      if "LastEvaluatedKey" in page_items:
        lastEvaluated = page_items["LastEvaluatedKey"]
      else:
        if current_page != desired_page:
          return {
            "statusCode": 404,
            "body": f"No Results Found For Page {desired_page}"
          }
    new_items = []
    print(page_items)
    
    for i in page_items["Items"]:
      new_items.append(from_dynamodb_to_json(i))
    
    return {
      "statusCode": 200,
      "body": json.dumps(new_items)
    }
  except Exception as e:
    return {
      "statusCode": 500,
      "body": f"{e}"
    }