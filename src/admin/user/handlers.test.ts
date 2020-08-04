import { mock } from 'jest-mock-extended';
import { APIGatewayProxyEvent, Context, Callback, APIGatewayProxyResult } from 'aws-lambda';
import { getUserList } from './handlers';

describe('getUserList', () => {
  test('should return token', async () => {
    const mockEvent = mock<APIGatewayProxyEvent>();
    const mockContext = mock<Context>();
    const mockCb = mock<Callback>();
    mockEvent.requestContext.authorizer = { type: 'TOKEN', token: 'abc' };
    const response = await getUserList(mockEvent, mockContext, mockCb);

    const body = JSON.parse((response as APIGatewayProxyResult).body);
    expect(body).toHaveProperty('context.type', 'TOKEN');
    expect(body).toHaveProperty('context.token', 'abc');
  });
});
