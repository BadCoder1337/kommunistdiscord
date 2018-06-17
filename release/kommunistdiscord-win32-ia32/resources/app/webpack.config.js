//var webpack = require('webpack');
var path = require('path');

module.exports = {
  entry: [
    './src/index.js'
  ],
  node: {
    fs: 'empty',
    dns: 'mock',
    tls: 'mock',
    child_process: 'empty',
    dgram: 'empty',
    __dirname: true,
    process: false,
    path: 'empty',
    Buffer: false,
    zlib: 'empty',
  },
  module: {
    rules: [{
        test: /\.js?$/,
        exclude: /node_modules/,
        use: ['cache-loader', 'babel-loader']
      },
      {
        test: /\.s?css$/,
        use: ['cache-loader', 'style-loader', 'css-loader', 'sass-loader']
      },
      {
        test: /\.md$/,
        use: ['cache-loader', 'ignore-loader']
      },
      {
        test: /\.json$/,
        type: 'javascript/auto',
        use: ['cache-loader', 'json-loader']
      }
    ]
  },
  resolve: {
    extensions: ['.json', '.js']
  },
  output: {
    path: path.join(__dirname, '/app'),
    publicPath: '/',
    filename: 'bundle.js'
  },
  devServer: {
    contentBase: './app',
    hot: true
  },
  // plugins: [
  //   new webpack.optimize.OccurrenceOrderPlugin(),
  //   new webpack.HotModuleReplacementPlugin(),
  //   new webpack.NoEmitOnErrorsPlugin()
  // ]
};