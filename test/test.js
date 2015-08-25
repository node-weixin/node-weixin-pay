'use strict';
var assert = require('assert');
var nodeWeixinPay = require('../');

var nodeWeixinConfig = require('node-weixin-config');
var validator = require('validator');

var merchant = {
  id: process.env.MERCHANT_ID  + '' || 'id',
  key: process.env.MERCHANT_KEY || 'key'
};

var app = {
  id: process.env.APP_ID || 'appid',
  secret: process.env.APP_SECRET || 'appsecret',
  token: process.env.APP_TOKEN || 'apptoken'
};

describe('node-weixin-pay node module', function () {

  it('should be able to prepay', function () {
    var id = 'id';
    nodeWeixinConfig.merchant.init(merchant);
    var config = nodeWeixinPay.prepay(id, app, merchant);
    assert.equal(true, config.appId === app.id);
    assert.equal(true, validator.isNumeric(config.timeStamp));
    assert.equal(true, config.package === 'prepay_id=' + id);
    assert.equal(true, config.signType === 'MD5');
    assert.equal(true, typeof config.paySign === 'string');
    assert.equal(true, typeof config.nonceStr === 'string');
  });

  it('should be able to sign a request', function () {
    var params = { openid: process.env.OPENID,
      spbill_create_ip: '1.202.241.25',
      notify_url: 'http://wx.domain.com/weixin/pay/main',
      body: '测试支付',
      out_trade_no: '111',
      total_fee: '1',
      trade_type: 'JSAPI',
      appid: app.id,
      mch_id: merchant.id,
      nonce_str: 'XjUw56N8MjeCUqHCwqgiKwr2CJVgYUpe' };
    nodeWeixinConfig.merchant.init(merchant);
    var sign = nodeWeixinPay.sign(merchant, params);
    assert.equal(true, sign === '87CF15EEACE2EC8BAE266380B02B0CE9');
  });
});
