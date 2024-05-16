const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

let configs = {
  entry: {
    index: "./scripts/index.js",
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "index.bundle.js",
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
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
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
    // do nothing for now
  }
  return configs;
};
