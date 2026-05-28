const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const isProd = process.env.NODE_ENV === 'production';

module.exports = {
  mode: isProd ? 'production' : 'development',
  entry: path.resolve(__dirname, 'src/index.jsx'),
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: isProd ? 'js/[name].[contenthash].js' : 'js/bundle.js',
    publicPath: '/',
    clean: true,
  },
  // ← key fix: no eval in devtool
  devtool: isProd ? 'source-map' : 'cheap-module-source-map',
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  devServer: {
    static: path.resolve(__dirname, 'public'),
    historyApiFallback: true,
    hot: true,
    port: 5173,
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
      // ← CSS MODULES rule MUST come first, before plain CSS
      {
        test: /\.module\.css$/,
        use: [
          // ← always style-loader in dev, never MiniCssExtractPlugin in dev
          isProd ? MiniCssExtractPlugin.loader : 'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: {
                // named exports so `import styles from` works correctly
                namedExport: false,
                localIdentName: isProd ? '[hash:base64:8]' : '[name]__[local]--[hash:base64:5]',
              },
              importLoaders: 1,
            },
          },
          'postcss-loader',
        ],
      },
      // ← plain CSS: explicitly exclude .module.css
      {
        test: /\.css$/,
        exclude: /\.module\.css$/,
        use: [
          isProd ? MiniCssExtractPlugin.loader : 'style-loader',
          'css-loader',
          'postcss-loader',
        ],
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        type: 'asset',
        parser: { dataUrlCondition: { maxSize: 8 * 1024 } },
        generator: { filename: 'images/[name].[hash][ext]' },
      },
      {
        test: /\.(woff2?|ttf|otf|eot)$/i,
        type: 'asset/resource',
        generator: { filename: 'fonts/[name].[hash][ext]' },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'public/index.html'),
    }),
    // ← only instantiate MiniCssExtractPlugin in prod
    ...(isProd
      ? [
          new MiniCssExtractPlugin({
            filename: 'css/[name].[contenthash].css',
          }),
        ]
      : []),
  ],
};
