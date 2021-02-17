const fs = require('fs');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { getAliases } = require('./util/alias-utils');
const { getRenderers } = require('./util/renderer-utils.js');

// Absolute path to main entrypoint directory.
const MAIN_PATH = path.resolve(__dirname, 'src', 'main');

// Absolute path to root renderer entrypoints directory.
const RENDERER_PATH = path.resolve(__dirname, 'src', 'renderers');

const mainConfig = {
  mode: 'development',
  entry: path.join(MAIN_PATH, 'index.ts'),
  target: 'electron-main',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'index.bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.json', '.wasm'],
    alias: getAliases(__dirname),
  },
};

const rendererConfigs = getRenderers(RENDERER_PATH).map((renderer) => {
  return {
    // Use environment variable to determine build mode.
    mode: 'development',
    entry: renderer.entrypoint,
    target: 'electron-renderer',
    output: {
      path: path.resolve(__dirname, 'dist', 'renderers', renderer.name),
      filename: 'index.js',
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: 'ts-loader',
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
        template: path.resolve(__dirname, 'src', 'core', 'templates', 'index.html.ejs'),
      }),
    ],
    resolve: {
      extensions: ['.ts', '.tsx', '.js', '.jsx', '.json', '.wasm'],
      alias: getAliases(__dirname, { renderer: true, rendererName: renderer.name }),
    },
  };
});

module.exports = [mainConfig, ...rendererConfigs];
