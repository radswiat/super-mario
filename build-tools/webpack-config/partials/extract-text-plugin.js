import ExtractTextPlugin from 'extract-text-webpack-plugin';

export default () => {
  return new ExtractTextPlugin({
    filename: 'style.css?v=[contenthash]',
    allChunks: true,
    ignoreOrder: true,
  });
};
