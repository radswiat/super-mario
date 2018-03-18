import path from 'path';

import webpack from 'webpack';

export default () => {
  // rewire react-core/component into react
  return [
    new webpack.NormalModuleReplacementPlugin(
      /core(\/|\\)system(\/|\\)react-core(\/|\\)component\.js/,
      path.resolve(process.cwd(), 'node_modules/react/index.js'),
    ),
    // replace all ".dev.jsx" or ".dev.js" file names into ".js" or ".jsx"
    // useful when you want to load different file on dev, and different on live/aws
    // example:
    // we load data-present.dev.jsx on dev env,
    // but on live/aws this component should render empty
    // to do this, we have to import a ".dev.jsx" or ".dev.js" in the code
    // and create a second one without ".dev" suffix, and it will be automatically used for live/aws
    new webpack.NormalModuleReplacementPlugin(
      /\.dev\.(jsx|js)$/,
      (resource) => {
        resource.request = resource.request.replace(/\.dev\.js/, '.js');
        resource.request = resource.request.replace(/\.dev\.jsx/, '.jsx');
      },
    ),
  ];
};
