// @flow
import addMessage from './src/handlers/AddHandler';
import getMessages from './src/handlers/RetrieveHandler';
import AWS from 'aws-sdk';

const hello = (event: Object, context: Object, callback: Function): void => {
  const docClient = new AWS.DynamoDB.DocumentClient();
  addMessage(docClient, event, context, callback);
};

const hellos = (event: Object, context: Object, callback: Function): void => {
  const docClient = new AWS.DynamoDB.DocumentClient();
  getMessages(docClient, event, context, callback);
};

export { hello, hellos };