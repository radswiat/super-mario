import path from 'path';

import webpack from 'webpack';
import CaseSensitivePathsPlugin from 'case-sensitive-paths-webpack-plugin';
import InterpolateHtmlPlugin from 'react-dev-utils/InterpolateHtmlPlugin';
import WatchMissingNodeModulesPlugin from 'react-dev-utils/WatchMissingNodeModulesPlugin';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import CleanWebpackPlugin from 'clean-webpack-plugin';

import vars from './webpack.dev-vars';

// import partials
// partials are webpack plugins that should be unified across all builds
// partial should be a function that returns instance of the webpack plugin
import resolve from './partials/resolve';
import nodeParams from './partials/node-params';
import ExtractTextPluginPartial from './partials/extract-text-plugin';
import CopyWebpackPlugin from './partials/copy-webpack-plugin';
import HtmlWebpackPlugin from './partials/html-webpack-plugin';
import Visualizer from './partials/webpack-visualizer';

import paths from '../config/webpack/paths';
import babelrc from '../config/webpack/babel';
import getClientEnvironment from '../config/webpack/env';
import cssModulesConfig from '../config/webpack/css-modules';
import packageInfo from '../modules/webpack/package-info';

const env = getClientEnvironment(vars.publicUrl);

module.exports = {
  context: cssModulesConfig.context,
  devtool: 'cheap-module-source-map',
  entry: [
    // allow to exclude some console logs in client app
    // disabled: issue with stack trace showing trace from console-excludes
    // require.resolve('../modules/webpack/console-excludes'),
    // Include an alternative client for WebpackDevServer
    require.resolve('react-dev-utils/webpackHotDevClient'),
    // Include babel-polyfills
    'babel-polyfill',
    // Errors should be considered fatal in development
    require.resolve('react-error-overlay'),
    // Finally, this is your app's code:
    paths.appIndexJs,
  ],
  output: {
    // Next line is not used in dev but WebpackDevServer crashes without it:
    path: paths.appBuild,
    // Add /* filename */ comments to generated require()s in the output.
    pathinfo: true,
    // virtual path to file that is served by WebpackDevServer in development.
    filename: 'static/js/bundle.js',
    // There are also additional JS chunk files if you use code splitting.
    chunkFilename: 'static/js/[name].chunk.js',
    // This is the URL that app is served from. We use "/" in development.
    publicPath: vars.publicPath,
    // Point sourcemap entries to original disk location (format as URL on Windows)
    devtoolModuleFilenameTemplate: (info) => path.resolve(info.absoluteResourcePath).replace(/\\/g, '/'),
  },
  // resolve
  // @partial
  resolve,
  // An array of Rules which are matched to requests when modules are created.
  // These rules can modify how the module is created.
  // They can apply loaders to the module, or modify the parser.
  module: {
    strictExportPresence: true,
    rules: [
      {
        // "oneOf" will traverse all following loaders until one will match
        oneOf: [
          // "url" loader works like "file" loader except that it embeds assets
          // Process JS with Babel.
          {
            test: /\.(js|jsx)$/,
            include: paths.appSrc,
            loader: require.resolve('babel-loader'),
            options: babelrc,
          },
          // "scss/css" loader for src/ ONLY!
          // node_modules loader won't be handled here due to localModules
          {
            test: /\.(scss|css)$/,
            include: paths.appSrc,
            exclude: /node_modules/,
            use: ['css-hot-loader'].concat(ExtractTextPlugin.extract({
              fallback: 'style-loader',
              use: [
                {
                  loader: 'css-loader',
                  options: {
                    importLoaders: 2,
                    sourceMap: true,
                    modules: true,
                    localIdentName: cssModulesConfig.generateScopedName,
                  },
                },
                {
                  loader: 'sass-loader',
                  options: {
                    sourceMap: true,
                  },
                },
              ],
            })),
          },
          // "scss/css" loader for nodue_modules/ ONLY!
          // localModules are disabled, import as global css rules
          {
            test: /\.(scss|css)$/,
            exclude: paths.appSrc,
            include: /node_modules/,
            use: ['css-hot-loader'].concat(ExtractTextPlugin.extract({
              fallback: 'style-loader',
              use: [
                {
                  loader: 'css-loader',
                  options: {
                    importLoaders: 2,
                    sourceMap: true,
                    modules: false,
                  },
                },
                {
                  loader: 'sass-loader',
                  options: {
                    sourceMap: true,
                  },
                },
              ],
            })),
          },
          {
            test: /\.svg$/,
            loader: 'svg-inline-loader',
          },
          {
            // Fallback file loader
            // it will match all not matched files!
            // ANY loader below this point WILL BE IGNORED!
            exclude: [/\.js$/, /\.html$/, /\.json$/],
            loader: require.resolve('file-loader'),
            options: {
              name: 'static/media/[name].[ext]',
            },
          },
        ],
      },
      // ** STOP ** Are you adding a new loader?
      // Make sure to add the new loader(s) before the "Fallback file loader" loader.
    ],
  },
  plugins: [
    // clean build folder
    // we can't clean due to src/content/api running simultaneously
    new CleanWebpackPlugin(paths.appBuild, { allowExternal: true }),
    // define plugin
    new webpack.DefinePlugin(vars.globals),
    // include some stuff at the top of the bundle file
    new webpack.BannerPlugin(`${packageInfo.name}: ${packageInfo.version}`),
    // clean build folder
    // we can't clean due to src/content/api running simultaneously
    new CleanWebpackPlugin(paths.appBuild, { allowExternal: true }),
    // Makes some environment variables available in index.html.
    // The public URL is available as %PUBLIC_URL% in index.html, e.g.:
    // <link rel="shortcut icon" href="%PUBLIC_URL%/favicon.ico">
    // In development, this will be an empty string.
    new InterpolateHtmlPlugin(env.raw),
    // Add module names to factory functions so they appear in browser profiler.
    new webpack.NamedModulesPlugin(),
    // This is necessary to emit hot updates (currently CSS only):
    new webpack.HotModuleReplacementPlugin(),
    // Watcher doesn't work well if you mistype casing in a path so we use
    // a plugin that prints an error when you attempt to do this.
    // See https://github.com/facebookincubator/create-react-app/issues/240
    new CaseSensitivePathsPlugin(),
    // If you require a missing module and then `npm install` it, you still have
    // to restart the development server for Webpack to discover it. This plugin
    // makes the discovery automatic so you don't have to restart.
    // See https://github.com/facebookincubator/create-react-app/issues/186
    new WatchMissingNodeModulesPlugin(paths.appNodeModules),
    // Moment.js is an extremely popular library that bundles large locale files
    // by default due to how Webpack interprets its code. This is a practical
    // solution that requires the user to opt into importing specific locales.
    // https://github.com/jmblog/how-to-optimize-momentjs-with-webpack
    // You can remove this if you don't use Moment.js:
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    // Visualize webpack bundle stats
    // - exports html file with stats for every build type
    // @partial
    Visualizer('dev'),
    // extract text plugin
    // css will not be included into js bundle
    // it will be standalone style.css file
    // @partial
    ExtractTextPluginPartial(),
    // Copy over public folder
    // it will expose all resources that are not included
    // into webpack bundle
    CopyWebpackPlugin(vars.assetsCopy),
    // Generates an `index.html` files with the <script> injected.
    ...HtmlWebpackPlugin(vars.htmlTemplates, vars.htmlMinifyOpts),
  ],
  // Some libraries import Node modules but don't use them in the browser.
  // Tell Webpack to provide empty mocks for them so importing them works.
  node: nodeParams,
  // Turn off performance hints during development because we don't do any
  // splitting or minification in interest of speed.
  performance: {
    hints: false,
  },
};
