import cssModulesConfig from './css-modules';
import aliases from './aliases';

/**
 * Config: babel.js
 * - configuration of babel for webpack compiler
 * - it has to be given from this file as .babelrc
 *   can't be used due to webpack instance running as es6 code,
 *   which interfere with webpack compiler babel rc config.
 */
export default {
  // disable babelrc file
  babelrc: false,
  // cache directory
  cacheDirectory: true,
  // presets
  presets: [
    'react-app',
    'stage-2',
  ],
  plugins: [
    'transform-runtime',
    'transform-react-jsx',
    // jsx control statements
    // @library: https://www.npmjs.com/package/jsx-control-statements
    // @example: <If condition={condition()}>Hello World!</If>
    'jsx-control-statements',
    'transform-decorators-legacy',
    // support immutable const
    // @library: https://www.npmjs.com/package/babel-plugin-immutable-const
    //
    // it make sure const won't be reassigned,
    'immutable-const',
    'transform-export-extensions',
    // support aliases
    // @library: https://github.com/tleunen/babel-plugin-module-resolver
    //
    // allow for importing by absolute path instead relative paths
    // fix messy code import issue,
    // @example:
    //  import config from 'config'; instead of import config from '../../../../config';
    ['module-resolver', {
      root: ['./src/'],
      alias: aliases,
      extensions: ['.js', '.jsx', '.scss', '.json'],
    }],
    // support react css modules
    // wrap and limited css, as it can only be used by component it belongs to
    ['react-css-modules',
      cssModulesConfig,
    ],
  ],
};
