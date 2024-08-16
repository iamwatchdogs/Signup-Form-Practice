const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

let configs = {
  entry: {
    index: ["./scripts/index.js", "./public/style.css"],
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].[contenthash].bundle.js",
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          "postcss-loader", // Added postcss-loader
        ],
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/,
        type: "asset",
        generator: {
          filename: "images/[name].[hash][ext]",
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
    new MiniCssExtractPlugin({
      filename: "[name].[contenthash].css",
    }),
    new CleanWebpackPlugin(),
  ],
  resolve: {
    alias: {
      "@validation": path.resolve(__dirname, "./scripts/form/validation"),
      "@form": path.resolve(__dirname, "./scripts/form"),
      "@storage": path.resolve(__dirname, "./scripts/storage"),
      "@external": path.resolve(__dirname, "./scripts/external"),
    },
  },
};

module.exports = (env, argv) => {
  if (argv.mode === "development") {
    configs = {
      ...configs,
      devServer: {
        static: {
          directory: path.resolve(__dirname, "public"),
          watch: true,
        },
        client: {
          logging: "info",
          overlay: {
            errors: true,
            warnings: false,
            runtimeErrors: true,
          },
          progress: true,
        },
        compress: true,
        open: true,
        port: 3000,
        hot: true,
        historyApiFallback: true,
      },
      devtool: "source-map",
    };
  } else if (argv.mode === "production") {
    configs = {
      ...configs,
      output: {
        ...configs.output,
        clean: true,
      },
      plugins: [
        ...configs.plugins,
        new MiniCssExtractPlugin({
          filename: "[name].[contenthash].css",
        }),
        new CleanWebpackPlugin(),
      ],
      optimization: {
        minimize: true,
        minimizer: [
          new TerserPlugin({
            test: /\.js(\?.*)?$/i,
            exclude: /node_modules/,
            parallel: true,
          }),
          new CssMinimizerPlugin({
            minimizerOptions: {
              preset: [
                "default",
                {
                  discardComments: { removeAll: true },
                },
              ],
            },
          }),
        ],
        splitChunks: {
          chunks: "all",
        },
        runtimeChunk: {
          name: "runtime",
        },
      },
    };
  }
  return configs;
};
