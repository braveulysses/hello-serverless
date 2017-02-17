// @flow
import EchoService from './services/EchoService';
import AWS from 'aws-sdk';

type Request = {
  message: string
};

// Adds a hello message to the DB and echoes it back to the client.
const hello = (event: Object, context: Object, callback: Function): void => {
  const response: Object = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  try {
    const body: Request = JSON.parse(event.body);
    const result: Object = EchoService({
      message: body.message
    });

    const db = new AWS.DynamoDB.DocumentClient();
    const params = {
      TableName: 'helloTable',
      Item: {
        messageId: result.messageId,
        message: result.message
      }
    };
    db.put(params, (err, data) => {
      if (!err) {
        response.statusCode = 200;
        console.log('success', result);
        console.log('data', data);
        response.body = JSON.stringify({
          messageId: result.messageId,
          message: result.message,
          input: event,
          dynamoDb: data
        });
        callback(null, response);
      } else {
        response.statusCode = 500;
        console.error('server error', err);
        response.body = JSON.stringify({
          message: 'Server error',
          error: err,
          input: event
        });
        callback(null, response);
      }
    });
  } catch (ex) {
    response.statusCode = 400;
    console.error('client error', ex);
    response.body = JSON.stringify({
      message: 'Client error',
      error: ex,
      input: event
    });
    callback(null, response);
  }
};

// Retrieves a previously added hello message.
const hellos = (event: Object, context: Object, callback: Function): void => {
  const response: Object = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  const messageId = event.pathParameters.messageId;

  if (messageId) {
    const db = new AWS.DynamoDB;
    const params = {
      TableName: 'helloTable',
      Key: {
        messageId: { S: messageId }
      }
    };
    db.getItem(params, (err, data) => {
      if (!err) {
        response.statusCode = 200;
        console.log('success', data.Item);
        console.log('data', data);
        response.body = JSON.stringify({
          messageId: data.Item.messageId.S,
          message: data.Item.message.S,
          input: event,
          dynamoDb: data
        });
        callback(null, response);
      } else {
        response.statusCode = 500;
        console.error('server error', err);
        response.body = JSON.stringify({
          message: 'Server error',
          error: err,
          input: event
        });
        callback(null, response);
      }
    });
  } else {
    response.statusCode = 400;
    console.error('client error: messageId not provided');
    response.body = JSON.stringify({
      message: 'Client error: messageId not provided',
      input: event
    });
    callback(null, response);
  }
};

export { hello, hellos };