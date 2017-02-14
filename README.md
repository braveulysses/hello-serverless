## hello-serverless

A 'hello world' project for the [Serverless framework](https://serverless.com/). This exists so that I'll have a simple point of reference for configuring the [serverless-webpack plugin](https://github.com/elastic-coders/serverless-webpack).

Deploy:

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
functions:
  hello-serverless-dev-hello
✨  Done in 29.08s.
```

Test:

```
$ http --verbose --json POST https://something.execute-api.us-east-1.amazonaws.com/dev/hello message=Hi
  POST /dev/hello HTTP/1.1
  Accept: application/json, */*
  Accept-Encoding: gzip, deflate
  Connection: keep-alive
  Content-Length: 17
  Content-Type: application/json
  Host: something.execute-api.us-east-1.amazonaws.com
  User-Agent: HTTPie/0.9.6
  
  {
      "message": "Hi"
  }
  
  HTTP/1.1 200 OK
  Connection: keep-alive
  Content-Length: 1418
  Content-Type: application/json
  Date: Tue, 14 Feb 2017 16:06:41 GMT
  
  {
      "input": {
          "body": "{\"message\": \"Hi\"}",
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
              "X-Forwarded-For": "192.168.1.1",
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
              "resourcePath": "/hello",
              "stage": "dev",
              ...
          },
          "resource": "/hello",
          "stageVariables": null
      },
      "message": "Hi"
  }
```