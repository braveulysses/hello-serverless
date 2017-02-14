// @flow
import EchoService from './services/EchoService';

const hello = (event: Object, context: Object, callback: Function): void => {
  const response: Object = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  try {
    const body = JSON.parse(event.body);
    const result = EchoService({
      message: body.message
    });
    response.statusCode = 200;
    response.body = JSON.stringify({
      message: result,
      input: event
    });
  } catch (e) {
    response.statusCode = 400;
    response.body = JSON.stringify({
      message: 'Error',
      error: e,
      input: event
    });
  }

  callback(null, response);
};

export { hello };