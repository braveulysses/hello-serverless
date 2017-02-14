// @flow
type Message = {
  message: string
};

const EchoService = ({message = 'Hello, world'}: Message = {}): string => {
  return message;
};

export default EchoService;