import getMessages from '../handlers/RetrieveHandler';
import MockDb from './__mocks__/MockDb';
import { getRequest } from '../util/TestHelpers';

describe('The RetrieveHandler service', () => {
  const db = new MockDb();

  beforeAll(() => {
    const params1 = {
      Item: {
        messageId: 'messageId1',
        message: 'message1'
      }
    };

    const params2 = {
      Item: {
        messageId: 'messageId2',
        message: 'message2'
      }
    };

    const callback = jest.fn();

    db.put(params1, callback);
    db.put(params2, callback);
  });

  it('returns the correct message for a given message ID', async () => {
    const callback = jest.fn();
    const { event, context } = getRequest('messageId1');
    await getMessages(db, event, context, callback);
    expect(callback.mock.calls.length).toBe(1);
    const response = callback.mock.calls[0][1];
    expect(response.statusCode).toBe(200);
    const responseBody = JSON.parse(response.body);
    expect(responseBody.messageId).toEqual('messageId1');
    expect(responseBody.message).toEqual('message1');
  });

  it('returns the correct message for a different message ID', async () => {
    const callback = jest.fn();
    const { event, context } = getRequest('messageId2');
    await getMessages(db, event, context, callback);
    expect(callback.mock.calls.length).toBe(1);
    const response = callback.mock.calls[0][1];
    expect(response.statusCode).toBe(200);
    const responseBody = JSON.parse(response.body);
    expect(responseBody.messageId).toEqual('messageId2');
    expect(responseBody.message).toEqual('message2');
  });

  it('responds with a 400 messageId is omitted', () => {
    const callback = jest.fn();
    const { event, context } = getRequest();
    getMessages(db, event, context, callback);
    expect(callback.mock.calls.length).toBe(1);
    const response = callback.mock.calls[0][1];
    expect(response.statusCode).toBe(400);
    const responseBody = JSON.parse(response.body);
    expect(responseBody.message).toMatch(/not provided/);
  });

  it('responds with a 404 for a nonexistent message ID', async () => {
    const callback = jest.fn();
    const { event, context } = getRequest('nonexistent');
    await getMessages(db, event, context, callback);
    expect(callback.mock.calls.length).toBe(1);
    const response = callback.mock.calls[0][1];
    expect(response.statusCode).toBe(404);
    const responseBody = JSON.parse(response.body);
    expect(responseBody.message).toMatch(/not found/);
  });
});