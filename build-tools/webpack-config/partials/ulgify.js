import webpack from 'webpack';

export default () => {
  return new webpack.optimize.UglifyJsPlugin({
    mangle: true,
    minimize: true,
    compress: {
      warnings: false, // Suppress uglification warnings
      pure_getters: true,
      unsafe: true,
      unsafe_comps: true,
      screw_ie8: true,
    },
    output: {
      // prevent version info to be removed from bundle.js
      comments: /\[Software\]/,
    },
    exclude: [/\.min\.js$/gi],
  });
};
