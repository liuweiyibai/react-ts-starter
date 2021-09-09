const deepMerge = require('deepmerge');
const { invade } = require('./utils');
const cdnDependencies = [
  {
    name: 'react',
    var: 'React',
    path: 'https://cdn.bootcdn.net/ajax/libs/react/17.0.2/umd/react.production.min.js',
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
