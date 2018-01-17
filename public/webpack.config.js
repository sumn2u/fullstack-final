const path = require('path')
// const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
module.exports = {
  entry: {
    app: './app.js',
    awesomeApp: [
      './styles.css'
    ]
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[chunkhash].[name].js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.(ico|jpg|png|gif|eot|otf|webp|svg|ttf|woff|woff2)(\?.*)?$/,
        exclude: /\/favicon.ico$/,
        loader: 'file-loader',
        options: {
          name: '[path][name].[ext]'
          // publicPath: "assets/sass/fonts"
        }
      },
      {
        test: /\.css$/,
        exclude: [/node_modules/, /dist/],
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use:
          {
            loader: 'css-loader'
          }
        })
      }
    ]
  },
  // For development https://webpack.js.org/configuration/devtool/#for-development
  devtool: 'inline-source-map',
  devServer: {
    port: 8081
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html', // Name of file in ./dist/
      template: 'index.html', // Name of template in ./src
      hash: true
    }),
    new ExtractTextPlugin({
      filename: '[chunkhash].[name].css',
      disable: false,
      allChunks: true
    })
  ]
}
