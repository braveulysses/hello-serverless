// @flow
import uuidV4 from 'uuid/v1';

type Message = {
  message?: string
};

type Result = {
  messageId: string,
  message: string
}

const EchoService = ({message = 'Hello, world'}: Message = {}): Result => {
  return {
    messageId: uuidV4(),
    message: message
  };
};

export default EchoService;