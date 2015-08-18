'use strict';
var assert = require('assert');
var nodeWeixinPay = require('../');

var nodeWeixinConfig = require('node-weixin-config');
var validator = require('validator');

var merchant = {
  id: process.env.MERCHANT_ID || 'id',
  key: process.env.MERCHANT_KEY || 'key'
};


describe('node-weixin-pay node module', function () {
  it('should be able to sign a request', function () {
    var params = {
      a:'d',
      b:'c',
      a1:'dd'
    };
    nodeWeixinConfig.merchant.init(merchant);
    var sign = nodeWeixinPay.sign(merchant, params);
    assert.equal(true, sign === '2940FE7A7091D5BEE622669A0F800908');
  });

  it('should be able to prepay', function () {
    var id = 'id';
    var app = {
      id: 'dddo'
    };
    nodeWeixinConfig.merchant.init(merchant);
    var config = nodeWeixinPay.prepay(id, merchant, app);
    assert.equal(true, config.appId === app.id);
    assert.equal(true, validator.isNumeric(config.timeStamp));
    assert.equal(true, config.package === 'prepay_id=' + id);
    assert.equal(true, config.signType === 'MD5');
    assert.equal(true, typeof config.paySign === 'string');
    assert.equal(true, typeof config.nonceStr === 'string');

  });
});
