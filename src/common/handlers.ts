import { APIGatewayAuthorizerHandler } from 'aws-lambda';

// A simple token-based authorizer example to demonstrate how to use an authorization token
// to allow or deny a request. In this example, the caller named 'user' is allowed to invoke
// a request if the client-supplied token value is 'allow'. The caller is not allowed to invoke
// the request if the token value is 'deny'. If the token value is 'unauthorized' or an empty
// string, the authorizer function returns an HTTP 401 status code. For any other token value,
// the authorizer returns an HTTP 500 status code.
// Note that token values are case-sensitive.

export const authorize: APIGatewayAuthorizerHandler = (event, context, callback) => {
  console.log(event);
  callback(null, {
    principalId: 'user',
    policyDocument: {
      Version: '2012-10-17',
      Statement: [
        {
          Action: 'execute-api:Invoke',
          Effect: 'Allow',
          Resource: event.methodArn,
        },
      ],
    },
  });
};

export default authorize;
// // Help function to generate an IAM policy
// function generatePolicy(principalId, effect, resource) {
//   const authResponse = {};

//   authResponse.principalId = principalId;
//   if (effect && resource) {
//     const policyDocument = {};
//     policyDocument.Version = '2012-10-17';
//     policyDocument.Statement = [];
//     const statementOne = {};
//     statementOne.Action = 'execute-api:Invoke';
//     statementOne.Effect = effect;
//     statementOne.Resource = resource;
//     policyDocument.Statement[0] = statementOne;
//     authResponse.policyDocument = policyDocument;
//   }

//   // Optional output with custom properties of the String, Number or Boolean type.
//   authResponse.context = {
//     stringKey: 'stringval',
//     numberKey: 123,
//     booleanKey: true,
//   };
//   return authResponse;
// };
