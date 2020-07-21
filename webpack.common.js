const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const distDir = path.resolve(__dirname, 'dist');

module.exports = {
  entry: {
    app: './src/index.js',
  },
  plugins: [
    // new CleanWebpackPlugin(['dist/*']) for < v2 versions of CleanWebpackPlugin
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: 'Next Moon Phase',
      template: 'template.html'
    }),
  ],
  output: {
    filename: '[name].bundle.js',
    path: distDir,
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
    ],
  }
};
