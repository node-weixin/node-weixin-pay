var validation = require('../conf/');
module.exports = {
  create: function (config, data, cb) {
    var request = require('../').request;
    var url = 'https://api.mch.weixin.qq.com/mmpaymkttransfers/sendredpack';
    config.ssl = true;
    request(config, url, data,
      validation.redenvelope.normal.sending,
      validation.redenvelope.normal.receiving,
      cb);
  },

  distribute: function (config, data, cb) {
    var request = require('../').request;
    var url = 'https://api.mch.weixin.qq.com/mmpaymkttransfers/sendgroupredpack';
    config.ssl = true;
    request(config, url, data,
      validation.redenvelope.distribute.sending,
      validation.redenvelope.distribute.receiving,
      cb);
  },

  query: function (config, data, cb) {
    var request = require('../').request;
    var url = 'https://api.mch.weixin.qq.com/mmpaymkttransfers/gethbinfo';
    config.ssl = true;
    request(config, url, data,
      validation.redenvelope.query.sending,
      validation.redenvelope.query.receiving,
      cb);
  }
};
