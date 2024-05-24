const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");

module.exports = {
  entry: path.join(__dirname, "src", "main.jsx"),
  output: {
    path: path.join(__dirname, "dist"),
    filename: "index.bundle.js",
  },
  resolve: {
    extensions: ['*', '.js', '.jsx'],
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/preset-react"],
          },
        },
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
      {
        test: /\.(jpg|jpeg|png|woff|woff2|eot|ttf|svg)$/,
        loader: "url-loader",
        options: { limit: false },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./index.html",
    }),
  ],
  optimization: {
    usedExports: true,
    minimize: true,
    minimizer: [
      new TerserPlugin({
        test: /\.js|jsx(\?.*)?$/i,
        exclude: /\/node_modules/,
        parallel: true,
        terserOptions: {
          compress: true,
        },
      }),
    ],
  },
  devServer: {
    port: 3000,
    compress: true,
    static: {
      publicPath: "./dist/",
      watch: true
    },
    open: true
  },
};
