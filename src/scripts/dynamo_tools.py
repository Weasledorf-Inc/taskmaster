import json
import os
import argparse
import boto3

client = boto3.client('dynamodb')

def main(args):
  print(f"Doing stuff with {args.table}")

def populate_table(args):
  print(f"Populating Table: {args.table} With:")
  mass_populate_table(args)
  # fake_tasks_file = f"{os.path.dirname(__file__)}/fake_tasks.json"

  # f = open(fake_tasks_file,)
  # data = json.load(f)
  # for item in data:
  #   print(item)
  #   put_item(args.table, create_dynamo_item(item))
  # f.close()

def mass_populate_table(args):
  number_of_fake_entries = 250
  for i in range(number_of_fake_entries):
    taskId = 1000 + i
    taskItem = {
      'taskId': {
        'N': str(taskId),
      },
      'taskDetails': {
        'S': f"something cool about task {taskId}",
      }
    }
    print(taskItem)
    put_item(args.table, taskItem)
  print(f"Done populating with {number_of_fake_entries} fake entries")

def create_dynamo_item(item):
  taskItem = {
    'taskId': {
      'N': str(item['taskId'])
    },
    'taskDetails': {
      'S': item['taskDetails']
    }
  }
  return taskItem


def put_item(tableName, item):
  client.put_item(
    TableName=tableName,
    Item=item,
  )

if __name__ == '__main__':
  parser = argparse.ArgumentParser(description='Helpful functions for dynamodb')\

  parser.add_argument('-t',
    '--table',
    action='store',
    metavar='table',
    required=True,
    type=str,
    help='Name of table')
  parser.set_defaults(func=main)
  
  subparsers = parser.add_subparsers()

  populate_parser = subparsers.add_parser('populate-table')
  populate_parser.add_argument('-r', '--records', action='store', metavar='records', required=False, type=int, help='Number of records')
  populate_parser.set_defaults(func=populate_table)

  args = parser.parse_args()

  args.func(args)