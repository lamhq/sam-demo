import axios from 'axios';
import { APIGatewayProxyHandler } from 'aws-lambda';

export const getUserList: APIGatewayProxyHandler = async (event, context) => {
  let response;
  try {
    const resp = await axios.get('https://www.metaweather.com/api/location/search', {
      params: { query: 'London' },
    });

    response = {
      statusCode: 200,
      body: JSON.stringify(resp.data),
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
