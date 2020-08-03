import { APIGatewayProxyHandler } from 'aws-lambda';
import { format } from 'date-fns';

export const getUserList: APIGatewayProxyHandler = async (event) => {
  let response;
  try {
    const formattedDate = format(new Date(), 'EEEE');
    const data = {
      context: event.requestContext.authorizer,
      date: formattedDate,
    };
    response = {
      statusCode: 200,
      body: JSON.stringify(data),
    };
  } catch (err) {
    return err;
  }

  return response;
};

export const getUserDetail: APIGatewayProxyHandler = async () => {
  const response = {
    statusCode: 200,
    body: JSON.stringify('123'),
  };
  return response;
};
