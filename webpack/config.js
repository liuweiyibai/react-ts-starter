const path = require('path');
const {
  override,
  addDecoratorsLegacy,
  addLessLoader,
  addWebpackAlias,
  overrideDevServer,
  addBundleVisualizer,
  addWebpackPlugin,
  // addWebpackModuleRule
  adjustStyleLoaders,
  fixBabelImports,
  useBabelRc,
} = require('customize-cra');
const WebpackBar = require('webpackbar');
const DashboardPlugin = require('webpack-dashboard/plugin');
const CircularDependencyPlugin = require('circular-dependency-plugin');
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const webpack = require('webpack');
const { externals, addCdn } = require('./cdn');
const { invade, devServerProxyOrMock } = require('./utils');

const pathResolve = dir => path.resolve(__dirname, dir);
const pathJoin = dir => path.join(__dirname, dir);
const isProduction = process.env.NODE_ENV === 'production';
const publicPath = process.env.APP_PUBLIC_PATH || '/';

const addCustomizeConfig = () => config => {
  config.output.publicPath = publicPath;
  if (isProduction) {
    invade(config.optimization.minimizer, 'TerserPlugin', e => {
      // 去除 LICENSE.txt
      e.options.extractComments = false;
      // 去除生产环境 console.log
      e.options.terserOptions.compress.drop_console = true;
    });

    // 美化打包后 js 文件名
    config.output.chunkFilename = config.output.chunkFilename.replace(
      '.chunk',
      '',
    );

    // 美化打包后 css 文件名
    invade(config.plugins, 'MiniCssExtractPlugin', e => {
      e.options.chunkFilename = e.options.chunkFilename.replace('.chunk', '');
    });

    invade(config.plugins, 'ManifestPlugin', (e, i) => {
      config.plugins.splice(i, 1);
    });

    config.optimization.splitChunks = {
      chunks: 'all',
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          minSize: 50000,
          minChunks: 1,
          chunks: 'initial',
          priority: 1, // 该配置项是设置处理的优先级，数值越大越优先处理，处理后优先级低的如果包含相同模块则不再处理
        },
        commons: {
          test: /[\\/]src[\\/]/,
          name: 'commons',
          minSize: 50000,
          minChunks: 2,
          chunks: 'initial',
          priority: -1,
          reuseExistingChunk: true, // 这个配置允许我们使用已经存在的代码块
        },
      },
    };

    // 默认文件名 runtime.[hash].js
    config.optimization.runtimeChunk = 'single';

    config.plugins.push(
      // !注意一定要在HtmlWebpackPlugin之后引用
      // 作用是将 config.optimization.runtimeChunk 生成的文件注入到 index.html 中，不受缓存控制
      new ScriptExtHtmlWebpackPlugin({
        // `runtime` must same as runtimeChunk name. default is `runtime`
        inline: /runtime\..*\.js$/,
      }),
    );
    config.externals = externals;
  }
  return config;
};

exports.webpackOveride = override(
  // 使用 babel 配置文件
  useBabelRc(),
  // 增加别名
  addWebpackAlias({
    '@': pathResolve('src'),
  }),

  fixBabelImports('import', {
    libraryName: 'antd',
    libraryDirectory: 'es',
    style: true,
  }),

  // 增加装饰器
  addDecoratorsLegacy(),

  // 添加 less 的使用
  addLessLoader({
    // 也可以在下面 loader 中添加
    /**
     * 会添加到每一个 less 文件之前，所以不能添加全局样式文件，和cssreset等
     */
    additionalData: `@import "${pathJoin('../src/styles/variable.less')}";`,
    lessOptions: {
      modifyVars: { '@primary-color': '#FF8800' },
      javascriptEnabled: true,
      strictMath: false,
      cssLoaderOptions: {},
      cssModules: {
        localIdentName: '[path][name]__[local]--[hash:base64:5]',
      },
    },
  }),

  process.env.REACT_APP_BUNDLE_VISUALIZE === 'true' &&
    addBundleVisualizer({
      analyzerMode: 'server',
    }),

  addCustomizeConfig(),

  isProduction && addCdn(),

  addWebpackPlugin(
    // 进度条
    new WebpackBar({ profile: true }),

    // 本地日志输出
    new DashboardPlugin(),

    // 检测模块编译情况
    new CircularDependencyPlugin({
      exclude: /node_modules/,
      include: /src/,
      failOnError: true,
      allowAsyncCycles: false,
      cwd: process.cwd(),
    }),

    // 热更新
    !isProduction && new webpack.HotModuleReplacementPlugin(),
    !isProduction && new ReactRefreshWebpackPlugin(),
  ),

  // 开发模式下生成 css souceMap
  !isProduction &&
    adjustStyleLoaders(({ use }) => {
      // use [] 包括所有的 style 系列 loader
      const [, css, postcss, resolve, processor] = use;
      css.options.sourceMap = true; // css-loader
      postcss.options.sourceMap = true; // postcss-loader
      if (resolve) {
        resolve.options.sourceMap = true; // resolve-url-loader
      }

      if (processor && processor.loader.includes('less-loader')) {
        processor.options.sourceMap = true; // less-loader
      }
    }),
);

exports.devServerConfig = overrideDevServer(config => {
  return {
    ...config,
    compress: true,
    disableHostCheck: true,
    hot: true,
    overlay: {
      warnings: false,
      errors: true,
    },
    ...devServerProxyOrMock(),
  };
});
