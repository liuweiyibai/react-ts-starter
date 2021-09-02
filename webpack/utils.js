exports.invade = function (target, name, callback) {
  target.forEach((item, i) => {
    if (item.constructor.name === name) {
      callback(item, i);
    }
  });
};

// !此配置只针对开发环境
exports.devServerProxyOrMock = function () {
  // 如果是 https 则需要，进行反代，如果非https则进行mock
  if (process.env?.REACT_APP_BASE_API?.startsWith('https://')) {
    return {
      proxy: {
        '/api': {
          target: process.env.REACT_APP_BASE_API,
          changeOrigin: true,
          pathRewrite: {
            '^/api': '',
          },
        },
      },
    };
  }
  return {
    before: require('../mock/server'),
  };
};
