const path = require("path");

function rootPath(dir = "") {
  return path.resolve(__dirname, dir);
}

module.exports = [
  {
    test: /\.node$/,
    use: "node-loader",
  },
  {
    test: /\.(m?js|node)$/,
    parser: { amd: false },
    use: {
      loader: "@marshallofsound/webpack-asset-relocator-loader",
      options: {
        outputAssetBase: "native_modules",
      },
    },
  },
  {
    test: /\.tsx?$/,
    exclude: /(node_modules|\.webpack)/,
    use: {
      loader: "ts-loader",
      options: {
        transpileOnly: true,
      },
    },
  },
  {
    test: /(\.?)global\.(s?)css/,
    use: [
      {
        loader: "style-loader",
      },
      {
        loader: "css-loader",
        options: {
          importLoaders: 1,
          sourceMap: true,
          modules: false,
        },
      },
      {
        loader: "sass-loader",
        options: {
          sourceMap: true,
          sassOptions: {
            includePaths: [rootPath("node_modules")],
          },
        },
      },
    ],
  },
  {
    test: /\.(s?)css$/,
    exclude: /(\.?)global\.(s?)css/,
    use: [
      {
        loader: "style-loader",
      },
      {
        loader: "css-loader",
        options: {
          localsConvention: "camelCase",
          sourceMap: true,
          importLoaders: 2,
          modules: {
            localIdentName: "[local]--[hash:base64:8]",
          },
        },
      },
      {
        loader: "postcss-loader",
        options: {
          sourceMap: true,
          config: {
            path: rootPath("postcss.config.js"),
          },
        },
      },
      {
        loader: "sass-loader",
        options: {
          sourceMap: true,
        },
      },
    ],
  },
  {
    enforce: "pre",
    test: /\.jsx?$/,
    use: [
      {
        loader: "source-map-loader",
      },
    ],
  },
  {
    test: /\.(ttf|woff|woff2|svg|eot)$/,
    use: [
      {
        loader: "file-loader",
      },
    ],
  },
];
