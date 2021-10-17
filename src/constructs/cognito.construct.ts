import * as cognito from '@aws-cdk/aws-cognito';
import * as cdk from '@aws-cdk/core';

export class TaskMasterCognitoConstruct extends cdk.Construct {
  public userPool: cognito.UserPool;
  constructor(scope: cdk.Construct, id: string, envName: string) {
    super(scope, id);

    this.userPool = new cognito.UserPool(this, 'user-pool', {
      userPoolName: `taskmaster-userpool-${envName}`,
      selfSignUpEnabled: true,
      userVerification: {
        emailSubject: 'Verify your email to join Task Master!',
        emailBody: 'Thanks for signing up to join Task Master! Your verification link is {####} {##Verify Email##}',
        emailStyle: cognito.VerificationEmailStyle.LINK,
      },
      userInvitation: {
        emailSubject: 'Invite to join Task Master!',
        emailBody: 'Hello {username}, you have been invited to join Task Master! We are excited to provide you with this temporary password: {####}',
      },
      signInAliases: {
        username: true,
        email: true,
      },
      autoVerify: {
        email: true,
      },
      standardAttributes: {
        fullname: {
          required: true,
          mutable: true,
        },
        address: {
          required: false,
          mutable: true,
        },
        email: {
          required: true,
          mutable: true,
        },
        phoneNumber: {
          required: false,
          mutable: true,
        },
        birthdate: {
          required: true,
          mutable: false,
        },
      },
      signInCaseSensitive: false,
      mfa: cognito.Mfa.OFF,
      passwordPolicy: {
        minLength: 8,
        requireLowercase: true,
        requireUppercase: true,
        requireDigits: true,
        requireSymbols: false,
        tempPasswordValidity: cdk.Duration.days(5),
      },
      accountRecovery: cognito.AccountRecovery.EMAIL_AND_PHONE_WITHOUT_MFA,
    });

    if (! envName.startsWith('prod')) {
      this.userPool.applyRemovalPolicy(cdk.RemovalPolicy.DESTROY);
    }
  }
}