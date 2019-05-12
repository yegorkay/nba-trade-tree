const path = require('path');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');

const PORT = 3000;

module.exports = {
  mode: 'development',
  entry: path.resolve(__dirname, 'src', 'index.tsx'),
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.json']
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        loader: 'awesome-typescript-loader'
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
