import boto3

my_user_pool = {'Id': 'us-east-1_jvI6OlqBB', 'Name': 'taskmaster-userpool-hasan-dev'}
example_all_users_result = {
    'Users': [
        {
            'Username': 'hasanaburayyan',
            'Attributes': [
                {
                    'Name': 'sub',
                    'Value': 'bd16114d-805b-4911-9987-87afee0d9428'
                },
                {
                 'Name': 'email',
                 'Value': 'hasanaburayyan21@gmail.com'
                },
            ],
        },
    ],
}

def main():
    client = boto3.client('cognito-idp')

    # getAllUsersInPool(client)
    getUser(client)

def getUser(client):
    user = client.admin_get_user(
        UserPoolId=my_user_pool['Id'],
        Username='hasanaburayyan'
    )
    print(user)


def getAllUsersInPool(client):
    users = client.list_users(
        UserPoolId=my_user_pool['Id'],
    )
    print(users)


if __name__ == '__main__':
    main()
