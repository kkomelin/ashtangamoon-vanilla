const path = require('path');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const distDir = path.resolve(__dirname, 'dist');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');

const isDevEnv = () => process.env.NODE_ENV === 'development';

module.exports = {
  entry: {
    app: './src/index.js',
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash].css',
      chunkFilename: '[id].[contenthash].css',
    }),
    new CleanWebpackPlugin({
      dry: isDevEnv()
    }),
    new HtmlWebpackPlugin({
      title: 'Ashtanga Yoga Holidays',
      template: 'template.html'
    }),
    new CopyPlugin({
      patterns: [
        { from: 'src/img/apple-touch-icon.png'},
        { from: 'src/img/favicon.ico' },
        { from: 'src/img/favicon-16x16.png' },
        { from: 'src/img/favicon-32x32.png' },
      ],
      options: {
        concurrency: 100,
      },
    }),
  ],
  output: {
    filename: '[name].bundle.js',
    path: distDir,
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              // only enable hot in development
              hmr: isDevEnv(),
              // if hmr does not work, this is a forceful method.
              // reloadAll: true,
            },
          },
          'css-loader',
        ]
      },
    ],
  }
};
