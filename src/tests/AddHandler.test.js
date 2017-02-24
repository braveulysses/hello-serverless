import addMessage from '../handlers/AddHandler';
import MockDb from './__mocks__/MockDb';
import { postRequest } from '../util/TestHelpers';

describe('The AddHandler service', () => {
  it('responds with a 200 when a message is provided', async () => {
    const db = new MockDb();
    const { event, context } = postRequest('Hello');

    const callback = jest.fn();
    await addMessage(db, event, context, callback);
    expect(callback.mock.calls.length).toBe(1);
    const response = callback.mock.calls[0][1];
    expect(response.statusCode).toBe(200);
    const responseBody = JSON.parse(response.body);
    expect(responseBody.message).toEqual('Hello');
  });

  it('responds with a 400 if the client omits the message field', () => {
    const db = new MockDb();
    const { event, context } = postRequest();

    const callback = jest.fn();
    addMessage(db, event, context, callback);
    expect(callback.mock.calls.length).toBe(1);
    const response = callback.mock.calls[0][1];
    expect(response.statusCode).toBe(400);
  });

  it.skip('responds with a 500 if a server error occurs', async () => {
    const db = new MockDb();
    db.setError('simulated error');
    const { event, context } = postRequest('Hello');

    const callback = jest.fn();
    await addMessage(db, event, context, callback);
    expect(callback.mock.calls.length).toBe(1);
    const response = callback.mock.calls[0][1];
    console.log('RESPONSE', response);
    expect(response.statusCode).toBe(500);
  });
});
