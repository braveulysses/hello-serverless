var path = require('path');
var FlowStatusWebpackPlugin = require('flow-status-webpack-plugin');

module.exports = {
  entry: './handler.js',
  target: 'node',
  plugins: [
      new FlowStatusWebpackPlugin({
        onError: function(stdout) {
          console.warn(stdout);
        },
        binaryPath: require('flow-bin')
      })
  ],
  module: {
    loaders: [
      {
        test: /\.js$/,
        loaders: ['babel-loader', 'eslint-loader'],
        include: __dirname,
        exclude: [/node_modules/, /src\/tests/]
      },
      {
        test: /\.json$/,
        loaders: ['json-loader']
      }
    ]
  }
};