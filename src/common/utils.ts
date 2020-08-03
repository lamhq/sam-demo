import { APIGatewayAuthorizerResultContext, APIGatewayAuthorizerResult } from 'aws-lambda';

/*
 * Extract Bearer token from HTTP Authorization header
 */
export function extractBearerToken(authHeader: string): string {
  return authHeader.startsWith('Bearer ') ? authHeader.substring(7, authHeader.length) : '';
}

/*
 * Generate output for Lambda authorizer functions
 */
export function generateAuthFuncOutput(
  principalId: string,
  effect: string,
  resource: string,
  context?: APIGatewayAuthorizerResultContext | null,
): APIGatewayAuthorizerResult {
  return {
    principalId,
    policyDocument: {
      Version: '2012-10-17',
      Statement: [
        {
          Action: 'execute-api:Invoke',
          Effect: effect,
          Resource: resource,
        },
      ],
    },
    context,
  };
}
