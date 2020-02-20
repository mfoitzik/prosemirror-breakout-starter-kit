const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
    entry: './src/js/index.js',
    // Path and filename of your result bundle.
    // Webpack will bundle all JavaScript into this file
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
            // Apply rule for .sass, .scss or .css files
            test: /\.(sa|sc|c)ss$/,

            // Set loaders to transform files.
            // Loaders are applying from right to left(!)
            // The first loader will be applied after others
            use: 
            [
                {
                    // After all CSS loaders we use plugin to do his work.
                    // It gets all transformed CSS and extracts it into separate
                    // single bundled file
                    loader: MiniCssExtractPlugin.loader
                },
                {
                    // This loader resolves url() and @imports inside CSS
                    loader: "css-loader",
                },
                {
                    // Then we apply postCSS fixes like autoprefixer and minifying
                    loader: "postcss-loader"
                },
                {
                    // First we transform SASS to standard CSS
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