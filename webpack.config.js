var path = require('path');

module.exports = {
  entry: './handler.js',
  target: 'node',
  // output: {
  //   path: path.join(__dirname, 'dist'),
  //   library: 'commonjs2'
  // },
  // externals: {
  //   'aws-sdk': 'aws-sdk'
  // },
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