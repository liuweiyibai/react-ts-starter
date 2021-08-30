exports.invade = function (target, name, callback) {
  target.forEach((item, i) => {
    if (item.constructor.name === name) {
      callback(item, i);
    }
  });
};
