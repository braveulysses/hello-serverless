import EchoService from '../services/EchoService';

describe('The Echo service', () => {
  it('returns a default value', () => {
    expect(EchoService().message).toEqual('Hello, world');
  });

  it('echoes its input', () => {
    expect(EchoService({message: 'hi'}).message).toEqual('hi');
  });

  it('returns a message id', () => {
    expect(EchoService({message: 'hi'}).messageId).not.toBeNull();
  });
});