const path = require('path');

const paths = require('../config/webpack/paths');

module.exports = {
  // public path defines root path for all resources like .js,.css
  // this usually is the same for dev and aws but could be different for live
  publicPath: '/',
  // html templates
  // @using HtmlWebpackPlugin
  // html templates defines from where your index.html will be created and how
  // - support for multiple index.html files
  htmlTemplates: [{
    inject: true,
    cache: false,
    template: `${paths.appHtmlDir}/index.html`,
    filename: 'index.html',
  }],
  // html minification
  // @using HtmlWebpackPlugin
  // specifies if and how your html will be minified
  // used by HtmlWebpackPlugin
  htmlMinifyOpts: {},
  // copy assets
  // @using CopyWebpackPlugin
  // use webpack to copy some assets for you
  // this usually should not be different across build environments
  assetsCopy: [{
    context: path.resolve('./', 'src/assets'),
    from: '**/*.{ico,json,png,jpg,jpeg,svg,js}',
    to: 'assets',
  }],
  // globals
  // @using webpackDefinePlugin
  // global variables that you can access in react application
  // those are set as global JS variables
  // naming convention of CONSTANT_VARIABLE should be used ( capitalized )
  globals: {
    DEV: true,
  },
};
