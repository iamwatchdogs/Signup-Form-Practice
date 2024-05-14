const path = require("path");

module.exports = {
  entry: {
    index: "./index.js",
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "index.bundle.js",
  },
  resolve: {
    alias: {
      "@scripts": path.resolve(__dirname, "./scripts"),
    },
  },
};
