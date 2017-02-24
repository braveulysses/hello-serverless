// @flow
import EchoService from '../services/EchoService';
import respond from './Respond';

type Request = {
  message: string
};

// Adds a message to the DB and echoes it back to the client.
const addMessage = (db: any, event: Object, context: Object, callback: Function): void => {
  const body: Request = JSON.parse(event.body);

  if (body.message) {
    const result: Object = EchoService({
      message: body.message
    });

    const params = {
      TableName: 'helloTable',
      Item: {
        messageId: result.messageId,
        message: result.message
      }
    };

    db.put(params).promise().then((data) => {
      console.log('success', result);
      console.log('data', data);
      respond(200, {
        messageId: result.messageId,
        message: result.message,
        event: event,
        context: context
      }, callback);
    }).catch((err) => {
      console.error('unknown server error', err.message);
      respond(500, {
        message: 'unknown server error',
        event: event,
        context: context,
        error: err
      }, callback);
    });
  } else {
    console.error('message not provided');
    respond(400, {
      message: 'message not provided',
      event: event,
      context: context
    }, callback);
  }
};

export default addMessage;