const deepMerge = require('deepmerge');
const { invade } = require('./utils');
const cdnDependencies = [
  {
    name: 'react',
    var: 'React',
    path:
      'https://cdnjs.cloudflare.com/ajax/libs/react/18.0.0-alpha-9eb2aaaf8-20210818/umd/react.production.min.js',
  },
];

exports.addCdn = () => config => {
  invade(config.plugins, 'HtmlWebpackPlugin', e => {
    e.options = deepMerge(e.options, {
      cdns: cdnDependencies,
    });
  });
  return config;
};

exports.externals = cdnDependencies.map(pkg => ({
  [pkg.name]: pkg.var,
}));
