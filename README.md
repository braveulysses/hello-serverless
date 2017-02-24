## hello-serverless

A 'hello world' project for the [Serverless framework](https://serverless.com/). 

This exists because I need a simple point of reference for:

* Writing Amazon Lambda functions in ES6 (using the [serverless-webpack plugin](https://github.com/elastic-coders/serverless-webpack)).
* Performing simple read/write operations with [DynamoDB](https://aws.amazon.com/dynamodb/).
* Unit testing request handler code.

This project also uses [ESLint](http://eslint.org/) and [Flow](https://flowtype.org/). There's probably more to be done with them.

### Commands

#### Deploy

Deploy with `yarn run deploy`:

```
$ serverless config credentials --provider aws --key YOUR_ACCESS_KEY --secret YOUR_SECRET --profile serverless-hello
$ export AWS_PROFILE="serverless-hello"
$ yarn run deploy
yarn run v0.17.8
 serverless deploy -r us-east-1 -s dev 
Serverless: Bundling with Webpack...
Time: 685ms
     Asset    Size  Chunks             Chunk Names
handler.js  3.6 kB       0  [emitted]  main
Serverless: Packaging service...
Serverless: Uploading CloudFormation file to S3...
Serverless: Uploading service .zip file to S3 (1.33 KB)...
Serverless: Updating Stack...
Serverless: Checking Stack update progress...
..............
Serverless: Stack update finished...
Serverless: Removing old service versions...
Service Information
service: hello-serverless
stage: dev
region: us-east-1
api keys:
  None
endpoints:
  POST - https://something.execute-api.us-east-1.amazonaws.com/dev/hello
  GET - https://something.execute-api.us-east-1.amazonaws.com/dev/hellos/{messageId}
functions:
  hello-serverless-dev-addHello
  hello-serverless-dev-getHellos

Stack Outputs
GetHellosLambdaFunctionQualifiedArn: arn:aws:lambda:us-east-1:527771544151:function:hello-serverless-dev-getHellos:2
AddHelloLambdaFunctionQualifiedArn: arn:aws:lambda:us-east-1:527771544151:function:hello-serverless-dev-addHello:2
ServiceEndpoint: https://something.execute-api.us-east-1.amazonaws.com/dev
ServerlessDeploymentBucketName: hello-serverless-dev-serverlessdeploymentbucket-1g9af3sqp31zj

✨  Done in 62.34s.
```

#### Logs

View Lambda logs with `yarn run logs-add` and `yarn run logs-get`.

#### Code quality

Run code quality checks with `yarn run flow` and `yarn run eslint src`. Run tests with `yarn test`.

### Usage

#### Add

Post a message. The service will echo the message back along with a message ID.

```
$ http --verbose --json POST https://something.execute-api.us-east-1.amazonaws.com/dev/hello "message=HI THERE HELLO" 
  POST /dev/hello HTTP/1.1
  Accept: application/json, */*
  Accept-Encoding: gzip, deflate
  Connection: keep-alive
  Content-Length: 29
  Content-Type: application/json
  Host: something.execute-api.us-east-1.amazonaws.com
  User-Agent: HTTPie/0.9.6
  
  {
      "message": "HI THERE HELLO"
  }
  
  HTTP/1.1 200 OK
  Connection: keep-alive
  Content-Length: 1507
  Content-Type: application/json
  Date: Thu, 23 Feb 2017 14:54:12 GMT
  
  {
      "event": {
          "body": "{\"message\": \"HI THERE HELLO\"}",
          "headers": {
              "Accept": "application/json, */*",
              "Accept-Encoding": "gzip, deflate",
              "CloudFront-Forwarded-Proto": "https",
              "CloudFront-Is-Desktop-Viewer": "true",
              "CloudFront-Is-Mobile-Viewer": "false",
              "CloudFront-Is-SmartTV-Viewer": "false",
              "CloudFront-Is-Tablet-Viewer": "false",
              "CloudFront-Viewer-Country": "US",
              "Content-Type": "application/json",
              "Host": "something.execute-api.us-east-1.amazonaws.com",
              "User-Agent": "HTTPie/0.9.6",
              "X-Forwarded-For": "192.168.1.1, 54.240.149.109",
              "X-Forwarded-Port": "443",
              "X-Forwarded-Proto": "https",
              ...
          },
          "httpMethod": "POST",
          "isBase64Encoded": false,
          "path": "/hello",
          "pathParameters": null,
          "queryStringParameters": null,
          "requestContext": {
              "accountId": "527771544151",
              "apiId": "something",
              "httpMethod": "POST",
              "identity": {
                  "accessKey": null,
                  "accountId": null,
                  "apiKey": null,
                  "caller": null,
                  "cognitoAuthenticationProvider": null,
                  "cognitoAuthenticationType": null,
                  "cognitoIdentityId": null,
                  "cognitoIdentityPoolId": null,
                  "sourceIp": "192.168.1.1",
                  "user": null,
                  "userAgent": "HTTPie/0.9.6",
                  "userArn": null
              },
              "requestId": "efa6f5eb-f9d7-11e6-909b-d529e6ccf443",
              "resourceId": "zq3bi0",
              "resourcePath": "/hello",
              "stage": "dev"
          },
          "resource": "/hello",
          "stageVariables": null
      },
      "context": {
               ...
      },
      "message": "HI THERE HELLO",
      "messageId": "efe165f0-f9d7-11e6-bed7-8b35c850babe"
  }
```

#### Retrieve

Retrieve the message.

```
$ http --verbose --json GET https://something.execute-api.us-east-1.amazonaws.com/dev/hellos/efe165f0-f9d7-11e6-bed7-8b35c850babe
GET /dev/hellos/efe165f0-f9d7-11e6-bed7-8b35c850babe HTTP/1.1
Accept: application/json, */*
Accept-Encoding: gzip, deflate
Connection: keep-alive
Content-Type: application/json
Host: something.execute-api.us-east-1.amazonaws.com
User-Agent: HTTPie/0.9.6



HTTP/1.1 200 OK
Connection: keep-alive
Content-Length: 1683
Content-Type: application/json
Date: Thu, 23 Feb 2017 14:55:44 GMT

{
    "event": {
        "body": null,
        "headers": {
            "Accept": "application/json, */*",
            "Accept-Encoding": "gzip, deflate",
            "CloudFront-Forwarded-Proto": "https",
            "CloudFront-Is-Desktop-Viewer": "true",
            "CloudFront-Is-Mobile-Viewer": "false",
            "CloudFront-Is-SmartTV-Viewer": "false",
            "CloudFront-Is-Tablet-Viewer": "false",
            "CloudFront-Viewer-Country": "US",
            "Content-Type": "application/json",
            "Host": "something.execute-api.us-east-1.amazonaws.com",
            "User-Agent": "HTTPie/0.9.6",
            "X-Forwarded-For": "192.168.1.1, 54.240.149.63",
            "X-Forwarded-Port": "443",
            "X-Forwarded-Proto": "https",
            ...
        },
        "httpMethod": "GET",
        "isBase64Encoded": false,
        "path": "/hellos/efe165f0-f9d7-11e6-bed7-8b35c850babe",
        "pathParameters": {
            "messageId": "efe165f0-f9d7-11e6-bed7-8b35c850babe"
        },
        "queryStringParameters": null,
        "requestContext": {
            "accountId": "527771544151",
            "apiId": "something",
            "httpMethod": "GET",
            "identity": {
                "accessKey": null,
                "accountId": null,
                "apiKey": null,
                "caller": null,
                "cognitoAuthenticationProvider": null,
                "cognitoAuthenticationType": null,
                "cognitoIdentityId": null,
                "cognitoIdentityPoolId": null,
                "sourceIp": "192.168.1.1",
                "user": null,
                "userAgent": "HTTPie/0.9.6",
                "userArn": null
            },
            "requestId": "272273ac-f9d8-11e6-b08a-a7d140099333",
            "resourceId": "s17l9x",
            "resourcePath": "/hellos/{messageId}",
            "stage": "dev"
        },
        "resource": "/hellos/{messageId}",
        "stageVariables": null
    },
    "context": {
         ...
    },
    "message": "HI THERE HELLO",
    "messageId": "efe165f0-f9d7-11e6-bed7-8b35c850babe"
}
```