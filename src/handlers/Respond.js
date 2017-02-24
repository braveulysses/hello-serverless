// @flow
const respond = (statusCode: number, body: Object, callback: Function): void => {
  const response: Object = {
    headers: {
      'Content-Type': 'application/json'
    },
    statusCode: statusCode,
    body: JSON.stringify(body)
  };
  callback(null, response);
};

export default respond;