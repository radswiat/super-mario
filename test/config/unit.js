module.exports = {
  // verbose output
  // @default: true
  // @overwrite
  verbose: true,
  // collect coverage from
  // specify what has impact on coverage stats
  // @extends
  collectCoverageFrom: [

  ],
  // collect threshold
  // specify minimum and maximum coverage
  // that is required in the project
  // @overwrite
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: -10,
    },
  },
  // rewrite some js modules for testing
  // works similar to normal module replacement in webpack
  // @extends
  moduleNameMapper: {
    // Example of how to re-mail testing data
    // you can keep it, it won't harm your jest config
    'data/broadband/root.json': '<rootDir>/data/test/root.json',
  },
};
