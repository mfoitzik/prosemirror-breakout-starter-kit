const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
    entry: './src/js/index.js',
    plugins: [
      
        new MiniCssExtractPlugin({
          filename: "css/bundle.css"
        }),
        new HtmlWebpackPlugin({
            filename: "index.html",
            template: "src/index.html"
        }),
        new CopyPlugin([
            { from: 'src/images', to: 'images' }
        ]),
        new CleanWebpackPlugin()
      
      ],
      devServer: {
        contentBase: path.join(__dirname, 'dist'),
        compress: true,
        writeToDisk:true,
        historyApiFallback: {
          index: 'index.html',
        },
        port: 9000
      },
      output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'js/bundle.js'
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader"
          }
        },
        {
            test: /\.(sa|sc|c)ss$/,

            use: 
            [
                {
                    loader: MiniCssExtractPlugin.loader
                },
                {
                    loader: "css-loader",
                },
                {
                    loader: "postcss-loader"
                },
                {
                    loader: "sass-loader",
                    options: {
                        implementation: require("sass")
                    }
                }
            ]
          }
      ]
    }
      
  };