import '@aws-cdk/assert/jest';
import { Template } from '@aws-cdk/assertions';
import * as cdk from '@aws-cdk/core';

import { TaskMasterApiStack } from '../src/stacks/api-gateway.stack';
import { API_RESOURCE_TYPE, DYNAMODB_TABLE_TYPE, LAMBDA_FUNCTION_TYPE, REST_API_TYPE } from './aws-resource-types';

let app: cdk.App;
let stack: cdk.Stack;

beforeEach(() => {
  app = new cdk.App();
  stack = new cdk.Stack(app, 'Test-Stack');
});


describe('When API Stack Is Synthesized', () => {
  describe('Dynamodb Tables resources consist of', () => {
    test('1 tables', () => {
      // GIVEN
      const expectedTableCount = 1;

      // WHEN
      stack = new TaskMasterApiStack(app, 'test-api-stack', 'test-case');
      const assertTemplate = Template.fromStack(stack);

      // THEN
      assertTemplate.resourceCountIs(DYNAMODB_TABLE_TYPE, expectedTableCount);
    });
  });

  describe('Lambda resources consist of', () => {
    test('10 lambda functions', () => {
      // GIVEN
      const expectedLambdaCount = 10;

      // WHEN
      stack = new TaskMasterApiStack(app, 'test-api-stack', 'test-case');
      const assertTemplate = Template.fromStack(stack);

      // THEN
      assertTemplate.resourceCountIs(LAMBDA_FUNCTION_TYPE, expectedLambdaCount);
    });
  });

  describe('API Gateway resources consist of', () => {
    test('1 REST API', () => {
      // GIVEN
      const expectedRestAPICount = 1;

      // WHEN
      stack = new TaskMasterApiStack(app, 'test-api-stack', 'test-case');
      const assertTemplate = Template.fromStack(stack);

      // THEN
      assertTemplate.resourceCountIs(REST_API_TYPE, expectedRestAPICount);
    });

    test('4 API Resources', () => {
      // GIVEN
      const expectedResourceCount = 4;

      // WHEN
      stack = new TaskMasterApiStack(app, 'test-api-stack', 'test-case');
      const assertTemplate = Template.fromStack(stack);

      // THEN
      assertTemplate.resourceCountIs(API_RESOURCE_TYPE, expectedResourceCount);
    });
  });
});