import '@aws-cdk/assert/jest';
import { Template } from '@aws-cdk/assertions';
import * as cdk from '@aws-cdk/core';

import { TaskMasterApiStack } from '../src/api-gateway.stack';
import { DYNAMODB_TABLE_TYPE } from './aws-resource-types';

let app: cdk.App;
let stack: cdk.Stack;

beforeEach(() => {
  app = new cdk.App();
  stack = new cdk.Stack(app, 'Test-Stack');
});


describe('When API Stack Is Synthesized', () => {
  describe('Dynamodb Tables resources consist of', () => {
    test('only 2 tables', () => {
      // GIVEN
      const expectedTableCount = 2;

      // WHEN
      stack = new TaskMasterApiStack(app, 'test-api-stack', 'test-case');
      const assertTemplate = Template.fromStack(stack);

      // THEN
      assertTemplate.resourceCountIs(DYNAMODB_TABLE_TYPE, expectedTableCount);
    });
  });
});