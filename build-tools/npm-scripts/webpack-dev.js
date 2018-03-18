/* eslint-disable global-require, promise/prefer-await-to-callbacks */
import webpack from 'webpack';
import { createCompiler, prepareUrls } from 'react-dev-utils/WebpackDevServerUtils';

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
  devServerConfig = require('../config/modules/dev-server').default;
  WebpackDevServer = require('../modules/webpack/dev-server').default;

  /**
   * Prepare dev configuration
   * - prepare config
   * - create dev server
   */
  constructor() {

    // extract from devServerConfig
    const { port, host, protocol, appName } = this.devServerConfig;

    // prepare urls
    const urls = prepareUrls(protocol, host, port);

    // prepare webpack compiler & webpack dev server
    const compiler = createCompiler(webpack, this.webpackConfig, appName, urls);

    this.createDevServer(compiler, host);
  }

  /**
   * Create dev server
   * @param compiler
   * @param host
   */
  createDevServer(compiler, host) {
    // create web-dev server
    const customWebpackDevServer = new this.WebpackDevServer({
      compiler,
      devServerConfig: this.devServerConfig,
      publicPath: this.webpackConfig.output.publicPath,
      host,
    });

    // start webpack dev server
    customWebpackDevServer.launch();
  }
};

