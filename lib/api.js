var request = require('../').request;
var validation = require('../conf/validation');

module.exports = {
  order: {
    unified: function (data, cb) {
      var url = 'https://api.mch.weixin.qq.com/pay/unifiedorder';
      request(url, data,
        validation.unified.sending,
        validation.unified.receiving,
        cb);
    },
    query: function (data, cb) {
      var url = 'https://api.mch.weixin.qq.com/pay/orderquery';
      request(url, data,
        validation.order.query,
        validation.order.trade,
        cb);
    },
    close: function (data, cb) {
      var url = 'https://api.mch.weixin.qq.com/pay/closeorder';
      request(url, data,
        validation.order.query,
        validation.order.trade,
        cb);
    }
  },
  refund: {
    create: function (data, cb) {
      var url = 'https://api.mch.weixin.qq.com/secapi/pay/refund';
      request(url, data,
        validation.refund.create.sending,
        validation.refund.create.receiving,
        cb);
    },
    query: function (data, cb) {
      var url = 'https://api.mch.weixin.qq.com/pay/refundquery';
      request(url, data,
        validation.refund.query.sending,
        validation.refund.query.receiving,
        cb);
    }
  },
  statements: function (data, cb) {
    var url = 'https://api.mch.weixin.qq.com/pay/downloadbill';
    request(url, data,
      validation.statements.sending,
      null,
      cb);
  },
  report: function (data, cb) {
    var url = 'https://api.mch.weixin.qq.com/payitil/report';
    request(url, data,
      validation.report.sending,
      null,
      cb);
  }
};
