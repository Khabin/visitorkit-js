const path = require("path");
const UglifyJSPlugin = require("uglifyjs-webpack-plugin");
const webpack = require("webpack");
const env = process.env.WEBPACK_ENV;

// Simply configure those 4 variables:
const OUTPUT_FILENAME = "sdk.v1";
const DEST_FOLDER = "dist";
const COPYRIGHT = `2021 Kabin LLC`;

const OUTPUT_FILE = `${OUTPUT_FILENAME}.js`;
const OUTPUT_FILE_MIN = `${OUTPUT_FILENAME}.min.js`;

const { plugins, outputfile, mode } =
  env == "build"
    ? {
        plugins: [new UglifyJSPlugin(), new webpack.BannerPlugin(COPYRIGHT)],
        outputfile: OUTPUT_FILE_MIN,
        mode: "production",
      }
    : {
        plugins: [new webpack.BannerPlugin(COPYRIGHT)],
        outputfile: OUTPUT_FILE,
        mode: "development",
      };

module.exports = {
  mode: mode,
  entry: "./src/index.ts",
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
      {
        // Only run `.js` files through Babel
        test: /\.m?js$/,
        exclude: /(node_modules)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
    ],
  },
  devtool: "source-map",
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  output: {
    filename: outputfile,
    path: path.resolve(__dirname, DEST_FOLDER),
  },
  plugins: plugins,
};
