/* eslint-disable global-require, promise/prefer-await-to-callbacks */
import webpack from 'webpack';
import chalk from 'chalk';

// set env variables
const environment = 'development';
process.env.BABEL_ENV = environment;
process.env.NODE_ENV = environment;

/**
 * Webpack debug build runner
 * - run webpack in debug mode,
 * - no dev server
 * - will give you the webpack output in /build
 */
export default new class WebpackDebug {

  // require webpack config
  webpackConfig = require('../webpack-config/webpack.dev');

  constructor() {

    // create webpack compiler
    const compiler = webpack(this.webpackConfig);

    console.log(chalk.bgYellow.black(' webpack debug starting ... '));

    compiler.run((err, stats) => {
      console.log('[webpack:build]', stats.toString({
        colors: true,
      }));
    });
  }
};

