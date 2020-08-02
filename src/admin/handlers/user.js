const axios = require('axios');

/**
 *
 * Event doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html#api-gateway-simple-proxy-for-lambda-input-format
 * @param {Object} event - API Gateway Lambda Proxy Input Format
 *
 * Context doc: https://docs.aws.amazon.com/lambda/latest/dg/nodejs-prog-model-context.html
 * @param {Object} context
 *
 * Return doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html
 * @returns {Object} object - API Gateway Lambda Proxy Output Format
 *
 */
exports.getUsers = async (event, context) => {
  let response;
  try {
    const resp = await axios.get(
      'https://www.metaweather.com/api/location/search',
      {
        params: { query: 'London' },
      },
    );

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

exports.getUser = async (event, context) => {
  const { id } = event.pathParameters;
  const response = {
    statusCode: 200,
    body: JSON.stringify(id),
  };
  return response;
};
