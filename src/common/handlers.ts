import { APIGatewayAuthorizerHandler, APIGatewayTokenAuthorizerEvent } from 'aws-lambda';
import { extractBearerToken, generateAuthFuncOutput } from './utils';

/*
 * A token-based Lambda authorizer function
 */
export const authorize: APIGatewayAuthorizerHandler = (event, context, callback) => {
  const tokenAuthEvent = event as APIGatewayTokenAuthorizerEvent;
  const token = extractBearerToken(tokenAuthEvent.authorizationToken);
  const authContext = {
    type: event.type,
    token: tokenAuthEvent.authorizationToken,
    methodArn: tokenAuthEvent.methodArn,
  };
  switch (token) {
    case 'allow':
      callback(null, generateAuthFuncOutput('user', 'Allow', event.methodArn, authContext));
      break;
    case 'deny':
      callback(null, generateAuthFuncOutput('user', 'Deny', event.methodArn, authContext));
      break;
    case 'unauthorized':
      callback('Unauthorized'); // Return a 401 Unauthorized response
      break;
    default:
      callback('Error: Invalid token'); // Return a 500 Invalid token response
  }
  callback(null);
};

export default authorize;
