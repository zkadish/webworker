const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

// console.log(process.env.NODE_ENV);
const NODE_ENV = process.env.NODE_ENV;
const environment = NODE_ENV === 'production' ? 'production' : 'development';

module.exports = {
  mode: environment,
  entry: './src/index.js',
  output: {
    filename: 'webworker.js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /.js$/,
        use: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\worker\.js$/,
        use: { loader: 'worker-loader' }
      },
      {
        test: /.scss$/,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'sass-loader',
            options: {
              includePaths: ['node_modules']
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/index.html',
    }),
  ]
}
