import path from 'path';

import CopyWebpackPlugin from 'copy-webpack-plugin';

export default (config) => {
  return new CopyWebpackPlugin(config);
};
