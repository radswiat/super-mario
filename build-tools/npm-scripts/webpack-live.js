/* eslint-disable global-require, promise/prefer-await-to-callbacks */
import webpack from 'webpack';
import chalk from 'chalk';

// set env variables
const environment = 'production';
process.env.BABEL_ENV = environment;
process.env.NODE_ENV = environment;

/**
 * Webpack live build runner
 * - generate output in /build
 */
export default new class WebpackDebug {

  // require webpack config
  webpackConfig = require('../webpack-config/webpack.live');

  constructor() {

    // create webpack compiler
    const compiler = webpack(this.webpackConfig);

    console.log(chalk.bgGreenBright.black(' webpack LIVE starting ... '));

    compiler.run((err, stats) => {
      console.log('[webpack:build]', stats.toString({
        colors: true,
      }));
    });
  }
};

