// @flow
import respond from './Respond';

// Retrieves a previously added hello message.
const getMessages = (db: any, event: Object, context: Object, callback: Function): void => {
  const messageId = event.pathParameters && event.pathParameters.messageId;
  if (messageId) {
    const params = {
      TableName: 'helloTable',
      Key: {
        messageId: messageId
      }
    };

    db.get(params).promise().then((data) => {
      if (data.Item) {
        console.log('success', data.Item);
        console.log('data', data);
        respond(200, {
          messageId: data.Item.messageId,
          message: data.Item.message,
          event: event,
          context: context
        }, callback);
      } else {
        console.error('messageId not found');
        respond(404, {
          message: 'messageId not found',
          event: event,
          context: context
        }, callback);
      }
    }).catch((err) => {
      console.error('unknown server error', err);
      respond(500, {
        message: 'unknown server error',
        event: event,
        context: context,
        error: err
      }, callback);
    });
  } else {
    console.error('messageId not provided');
    respond(400, {
      message: 'messageId not provided',
      event: event,
      context: context
    }, callback);
  }
};

export default getMessages;