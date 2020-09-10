const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const path = require("path");

module.exports = (env, argv) => {
  const mode = argv.mode;
  const DEVELOPMENT = mode === "development";
  const PRODUCTION = mode === "production";

  return {
    devtool: PRODUCTION ? "source-map" : "eval-source-map",
    entry: "./source/index.js",
    module: {
      rules: [
        {
          test: /\.(jsx?)$/,
          exclude: /node_modules/,
          use: ["babel-loader"],
        },
        {
          test: /\.css$/,
          use: [
            MiniCssExtractPlugin.loader,
            {
              loader: "css-loader",
              options: {
                importLoaders: 1,
                modules: {
                  localIdentName: PRODUCTION
                    ? "[hash:base64:5]"
                    : "[name]__[local]___[hash:base64:5]",
                },
                sourceMap: PRODUCTION,
              },
            },
          ],
        },
        {
          test: /\.(woff(2)?|ttf|eot)(\?v=\d+\.\d+\.\d+)?$/,
          use: ["file-loader"],
        },
        {
          test: /\.svg$/,
          use: ["@svgr/webpack"],
        },
      ],
    },
    optimization: {
      minimize: PRODUCTION,
      minimizer: [
        new TerserPlugin({
          sourceMap: true,
        }),
        new OptimizeCSSAssetsPlugin({
          cssProcessorOptions: { map: { annotation: true, inline: false } },
        }),
      ],
    },
    output: {
      path: path.resolve(__dirname, "./build"),
      filename: "[name].bundle.js",
    },
    plugins: [
      new HtmlWebpackPlugin({
        meta: {
          viewport:
            "width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no",
        },
      }),
      new MiniCssExtractPlugin(),
    ],
    resolve: {
      extensions: [".js", ".jsx"],
    },
  };
};
