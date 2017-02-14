import EchoService from '../services/EchoService';

describe('The Echo service', () => {
  it('returns a default value', () => {
    expect(EchoService()).toEqual('Hello, world');
  });

  it('echoes its input', () => {
    expect(EchoService({message: 'hi'})).toEqual('hi');
  })
});