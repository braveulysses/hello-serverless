var path = require('path');

module.exports = {
  entry: './handler.js',
  target: 'node',
  module: {
    loaders: [
      {
        test: /\.js$/,
        loaders: ['babel'],
        include: __dirname,
        exclude: [/node_modules/, /tests/]
      },
      {
        test: /\.json$/,
        loaders: ['json']
      }
    ]
  }
};