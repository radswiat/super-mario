const path = require('path');
const merge = require('lodash').merge;

const webpackVars = require(path.resolve(process.cwd(), 'build-tools/webpack-config/webpack.dev-vars.js'));

const config = require('../config/unit');
const configUtils = require('./utils/config-utils');

module.exports = {
  // root dir
  // this is from all paths will be calculated,
  // it also specify location of your .spec files!!
  // @default '../src/'
  rootDir: '../../src/',
  // should stop after error ?
  // keep it off, or you won't see any console.logs!!
  // @default: false
  bail: false,
  // verbose output
  // @default: true
  verbose: config.verbose,
  // ignored paths
  modulePathIgnorePatterns: [
    '<rootDir>/tests-e2e/',
  ],
  // collect coverage
  // @default: true
  collectCoverage: true,
  // collect coverage from
  // specify what has impact on coverage stats
  // @default: true
  collectCoverageFrom: [
    '!**/**/index.js',
    'app/components/**/*.{js,jsx}',
    'app/core/components/**/*.{js,jsx}',
    '!app/components/_demos/**/*.{js,jsx}',
    '!app/core/components/system/**/*.{js,jsx}',
    '!app/core/components/_samples/**/*.{js,jsx}',
    'app/core/utils/**/*.{js,jsx}',
    'app/utils/**/*.{js,jsx}',
  ].concat(config.collectCoverageFrom),
  // include globals from webpack dev
  globals: webpackVars.globals,
  reporters: [
    'default',
    [
      '<rootDir>../test/unit/reporters/json.js',
      {
        output: 'coverage/report.json',
      },
    ],
  ],
  // coverage reporter
  // generate html as output
  // @default: html
  coverageReporters: [
    'html', 'json',
  ],
  // where to store coverage output
  coverageDirectory: '../coverage',
  // collect threshold
  coverageThreshold: configUtils.applyCoverageThreshold(config.coverageThreshold),
  moduleNameMapper: merge(config.moduleNameMapper, {
    // re-wire our custom react-core/component back into react component during tests
    'react-core/component': '<rootDir>../node_modules/react/cjs/react.development.js',
  }),
  // test environment
  // @default: 'jsdom'
  testEnvironment: 'jsdom',
  // framework file
  // this is pre-test execution file
  // it can modify execution env
  // @default: '../test/framework-config.js'
  setupTestFrameworkScriptFile: '../test/unit/framework-config.js',
  // transform
  // transformers to help jest understand es6, skip on css/scss files and others
  transform: {
    '^.+.(js|jsx)$': '<rootDir>../test/unit/jest-compilers/babel-transform.js',
    '^.+.(css|scss)': '<rootDir>../test/unit/jest-compilers/css-transform.js',
    '^(?!.*.(js|jsx|css|scss|json)$)': '<rootDir>../test/unit/jest-compilers/file-transform.js',
  },
};
