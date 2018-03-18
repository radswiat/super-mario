import HtmlWebpackPlugin from 'html-webpack-plugin';

export default (config, minifyOptions) => {
  const tpl = [];
  for (const template of config) {
    template.minify = minifyOptions;
    tpl.push(new HtmlWebpackPlugin(template));
  }
  return tpl;
};
