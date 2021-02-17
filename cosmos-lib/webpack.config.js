const path = require('path');

/*
 * Base Webpack config from which ES5 (CommonJS), ES5 (ESModule), and UMD
 * configs will inherit.
 */
const webpackConfigBase = {
  mode: 'production',
  entry: {
    'cosmos': './src/index.ts',
  },
  output: {
    filename: '[name].min.js',
    library: 'cosmosLib',
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  target: 'node',
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
    alias: {
      '@lib': path.resolve(__dirname, 'src'),
    },
  },
};

/*
 * Exports lib for UMD.
 */
const webpackConfigUmd = {
  ...webpackConfigBase,
  output: {
    ...webpackConfigBase.output,
    path: path.resolve(__dirname, '_bundles'),
    libraryTarget: 'umd',
    umdNamedDefine: true,
  },
};

/*
 * Compiles lib for CommonJS2.
 */
const webpackConfigCommonJs = {
  ...webpackConfigBase,
  output: {
    ...webpackConfigBase.output,
    path: path.resolve(__dirname, 'lib'),
    libraryTarget: 'commonjs2',
  },
};

// TODO Output to ES Modules when Webpack 5.x provides better support.

module.exports = [webpackConfigUmd, webpackConfigCommonJs];
