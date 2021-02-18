const fs = require('fs');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const tsconfig = require('./tsconfig.json');
const { getAliases } = require('./util/alias-utils.js');
const { getRenderers } = require('./util/renderer-utils.js');

// Absolute path to main entrypoint directory.
const MAIN_PATH = path.resolve(__dirname, 'src', 'main');

// Absolute path to root renderer entrypoints directory.
const RENDERER_PATH = path.resolve(__dirname, 'src', 'renderers');

// Configuration for main Electron process.
const mainConfig = {
  // TODO Make main build `mode` dependent on NODE_ENV environment variable.
  mode: 'development',
  entry: {
    main: path.join(MAIN_PATH, 'index.ts'),
  },
  target: 'electron-main',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'index.bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: 'ts-loader',
            options: {
              onlyCompileBundledFiles: true,
            },
          },
        ],
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.json'],
    alias: getAliases(__dirname),
  },
};

// Configuration for Electron renderer processes.
const rendererConfigs = getRenderers(RENDERER_PATH).map((rendererInfo) => {
  return {
    // TODO Make render build `mode` dependent on NODE_ENV environment variable.
    mode: 'development',
    entry: {
      [rendererInfo.name]: rendererInfo.entrypoint,
    },
    target: 'electron-renderer',
    output: {
      path: path.resolve(__dirname, 'dist', 'renderers', rendererInfo.name),
      filename: 'index.js',
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: [
            {
              loader: 'ts-loader',
              options: {
                onlyCompileBundledFiles: true,
              },
            },
          ],
          exclude: /node_modules/,
        },
        {
          test: /\.s[ac]ss$/,
          use: [
            'style-loader',
            'css-loader',
            'sass-loader',
          ],
        },
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: rendererInfo.template,
        title: rendererInfo.title,
      }),
    ],
    resolve: {
      extensions: ['.ts', '.tsx', '.js', '.json'],
      alias: getAliases(__dirname, { renderer: true, rendererName: rendererInfo.name }),
    },
  };
});

module.exports = [mainConfig, ...rendererConfigs];
