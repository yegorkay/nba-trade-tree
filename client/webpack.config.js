const path = require('path');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');

const PORT = 3000;

module.exports = {
  mode: 'development',
  entry: path.resolve(__dirname, 'src', 'index.js'),
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      }
    ]
  },
  plugins: [
    new FriendlyErrorsWebpackPlugin({
      compilationSuccessInfo: {
        messages: [`Local: http://localhost:${PORT}`]
      },
      clearConsole: true
    })
  ],
  devServer: {
    contentBase: path.join(__dirname, 'public'),
    historyApiFallback: true,
    clientLogLevel: 'error',
    quiet: true,
    port: PORT,
    overlay: {
      warnings: false,
      errors: true
    }
  }
};
