var request = require('../').request;
var validation = require('../conf/validation');

module.exports = {
  order: {
    unified: function (certificate, data, cb) {
      var url = 'https://api.mch.weixin.qq.com/pay/unifiedorder';
      request(certificate, url, data,
        validation.unified.sending,
        validation.unified.receiving,
        cb);
    },
    query: function (certificate, data, cb) {
      var url = 'https://api.mch.weixin.qq.com/pay/orderquery';
      request(certificate, url, data,
        validation.order.query,
        validation.order.trade,
        cb);
    },
    close: function (certificate, data, cb) {
      var url = 'https://api.mch.weixin.qq.com/pay/closeorder';
      request(certificate, url, data,
        validation.order.query,
        validation.order.trade,
        cb);
    }
  },
  refund: {
    create: function (certificate, data, cb) {
      var url = 'https://api.mch.weixin.qq.com/secapi/pay/refund';
      request(certificate, url, data,
        validation.refund.create.sending,
        validation.refund.create.receiving,
        cb);
    },
    query: function (certificate, data, cb) {
      var url = 'https://api.mch.weixin.qq.com/pay/refundquery';
      request(certificate, url, data,
        validation.refund.query.sending,
        validation.refund.query.receiving,
        cb);
    }
  },
  statements: function (certificate, data, cb) {
    var url = 'https://api.mch.weixin.qq.com/pay/downloadbill';
    request(certificate, url, data,
      validation.statements.sending,
      null,
      cb);
  },
  report: function (certificate, data, cb) {
    var url = 'https://api.mch.weixin.qq.com/payitil/report';
    request(certificate, url, data,
      validation.report.sending,
      null,
      cb);
  }
};
