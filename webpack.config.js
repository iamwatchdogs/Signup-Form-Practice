const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = (env, argv) => {
  const isProduction = argv.mode === "production";

  return {
    entry: path.join(__dirname, "src", "main.jsx"),
    output: {
      path: path.join(__dirname, "dist"),
      filename: isProduction
        ? "[name].[contenthash].bundle.js"
        : "index.bundle.js",
      clean: true, // clean the output directory before every build
    },
    resolve: {
      extensions: ["*", ".js", ".jsx"],
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
          use: [
            isProduction ? MiniCssExtractPlugin.loader : "style-loader",
            "css-loader",
            "sass-loader",
          ],
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
        minify: isProduction
          ? {
              removeComments: true,
              collapseWhitespace: true,
              removeRedundantAttributes: true,
              useShortDoctype: true,
              removeEmptyAttributes: true,
              removeStyleLinkTypeAttributes: true,
              keepClosingSlash: true,
              minifyJS: true,
              minifyCSS: true,
              minifyURLs: true,
            }
          : false,
      }),
      ...(isProduction
        ? [
            new MiniCssExtractPlugin({
              filename: "[name].[contenthash].css",
            }),
            new CleanWebpackPlugin(),
          ]
        : []),
    ],
    optimization: {
      usedExports: true,
      minimize: isProduction,
      minimizer: [
        new TerserPlugin({
          exclude: /\/node_modules/,
          parallel: true,
          terserOptions: {
            compress: true,
          },
        }),
        ...(isProduction ? [new CssMinimizerPlugin()] : []),
      ],
      splitChunks: isProduction
        ? {
            chunks: "all",
          }
        : undefined,
      runtimeChunk: isProduction ? { name: "runtime" } : undefined,
    },
    devServer: {
      port: 3000,
      compress: true,
      open: true,
      hot: true,
      static: {
        publicPath: "./dist/",
        watch: true,
      },
    },
  };
};
