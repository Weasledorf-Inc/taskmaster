const { AwsCdkTypeScriptApp } = require('projen');
const project = new AwsCdkTypeScriptApp({
  cdkVersion: '1.125.0',
  defaultReleaseBranch: 'main',
  name: 'task-master',

  cdkDependencies: [
    '@aws-cdk/core',
    '@aws-cdk/pipelines',
    '@aws-cdk/aws-dynamodb',
    '@aws-cdk/aws-apigateway',
    '@aws-cdk/aws-codecommit',
    '@aws-cdk/aws-lambda',
    '@aws-cdk/assertions',
    '@aws-cdk/aws-cognito',
  ],
  context: {
    '@aws-cdk/core:newStyleStackSynthesis': true,
  },
  gitignore: [
    '.idea/',
    '.vscode/',
  ],
  // deps: [],                          /* Runtime dependencies of this module. */
  // description: undefined,            /* The description is just a string that helps people understand the purpose of the package. */
  // devDeps: [],                       /* Build dependencies for this module. */
  // packageName: undefined,            /* The "name" in package.json. */
  // projectType: ProjectType.UNKNOWN,  /* Which type of project this is (library/app). */
  // release: undefined,                /* Add release management to this project. */
  github: false,
});
project.synth();