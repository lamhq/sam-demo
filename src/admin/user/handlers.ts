import { APIGatewayProxyHandler } from 'aws-lambda';
import { format } from 'date-fns';

export const getUserList: APIGatewayProxyHandler = async (event, context) => {
  let response;
  try {
    const formattedDate = format(new Date(), 'EEEE');
    response = {
      statusCode: 200,
      body: JSON.stringify(formattedDate),
    };
  } catch (err) {
    console.log(err);
    return err;
  }

  return response;
};

export const getUserDetail: APIGatewayProxyHandler = async (event, context) => {
  const response = {
    statusCode: 200,
    body: JSON.stringify('123'),
  };
  return response;
};
