import path from 'path';

export default {
  context: path.resolve(process.cwd(), 'src/'),
  generateScopedName: '[name]__[local]___[hash:base64:5]',
  webpackHotModuleReloading: true,
  filetypes: {
    '.scss': {
      syntax: 'postcss-scss',
      plugins: ['postcss-nested'],
    },
  },
};
