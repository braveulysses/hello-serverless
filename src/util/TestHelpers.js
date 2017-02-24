// @flow

type Request = {
  event: Object,
  context: Object
}

function postRequest(message: ?string = null): Request {
  let requestBody = {};
  if (message) {
    requestBody.message = message;
  }

  const event = {
    httpMethod: 'POST',
    path: '/hello',
    pathParameters: null,
    queryStringParameters: null,
    headers: {
      Accept: 'application/json, */*',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(requestBody)
  };

  const context = {};

  return { event, context };
}

function getRequest(messageId: ?string = null): Request {
  let pathParameters = null;
  if (messageId) {
    pathParameters = {
      messageId: messageId
    };
  }

  const event = {
    httpMethod: 'GET',
    path: '/hello',
    pathParameters: pathParameters,
    queryStringParameters: null,
    headers: {
      Accept: 'application/json, */*'
    },
    body: null
  };

  const context = {};

  return { event, context };
}

export { postRequest, getRequest };