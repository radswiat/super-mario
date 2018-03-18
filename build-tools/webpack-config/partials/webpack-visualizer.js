import Visualizer from 'webpack-visualizer-plugin';

export default (env) => {
  return new Visualizer({
    filename: `../.build-info/${env}.stats.html`,
  });
};
