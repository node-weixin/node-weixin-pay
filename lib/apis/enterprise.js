var validation = require('../conf/');
module.exports = {
  create: function (config, data, cb) {
    var request = require('../').request;
    var url = 'https://api.mch.weixin.qq.com/mmpaymkttransfers/promotion/transfers';
    config.ssl = true;
    request(config, url, data,
      validation.enterprise.create.sending,
      validation.enterprise.create.receiving,
      cb);
  },
  query: function (config, data, cb) {
    var request = require('../').request;
    var url = 'https://api.mch.weixin.qq.com/mmpaymkttransfers/gettransferinfo';
    config.ssl = true;
    request(config, url, data,
      validation.enterprise.query.sending,
      validation.enterprise.query.receiving,
      cb);
  }
};
