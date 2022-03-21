const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  mode: 'development',
  entry: {
    main: './src/assets/js/main.js',
    login: './src/assets/js/login.js',
    register: './src/assets/js/register.js',
    photoAdd: './src/assets/js/photoAdd.js',
    photoDetail: './src/assets/js/photoDetail.js',
    photoEdit: './src/assets/js/photoEdit.js',
  },
  output: {
    path: path.resolve(__dirname, 'build'), // create folder
    publicPath: '/',
    filename: '[name].bundle.js',
    chunkFilename: '[id].bundle_[chunkhash].js',
  },
  module: {
    rules: [
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.css$/i,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: { publicPath: '' },
          },
          'css-loader',
        ],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin(),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './src/index.html',
      chunks: ['main'],
    }),
    new HtmlWebpackPlugin({
      filename: 'login.html',
      template: './src/login.html',
      chunks: ['login'],
    }),
    new HtmlWebpackPlugin({
      filename: 'register.html',
      template: './src/register.html',
      chunks: ['register'],
    }),
    new HtmlWebpackPlugin({
      filename: 'photo-add.html',
      template: './src/photo-add.html',
      chunks: ['photoAdd'],
    }),
    new HtmlWebpackPlugin({
      filename: 'photo-detail.html',
      template: './src/photo-detail.html',
      chunks: ['photoDetail'],
    }),
    new HtmlWebpackPlugin({
      filename: 'photo-edit.html',
      template: './src/photo-edit.html',
      chunks: ['photoEdit'],
    }),
  ],
  devtool: 'source-map',
  devServer: {
    static: {
      // static = folder tĩnh
      directory: path.join(__dirname, 'build'),
    },
    compress: true, // nén file
    port: 9000,
  },
};
