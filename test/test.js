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
  /*
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
  */

  it('should be able to prepay', function () {
    var id = 'id';
    var app = {
      id: 'dddo'
    };
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
    var params = { openid: 'oonTrs-hfXi6lZU2RbHMyXZJZqgk',
      spbill_create_ip: '1.202.241.205',
      notify_url: 'http://wx.t1bao.com/weixin/pay/main',
      body: '测试支付',
      out_trade_no: '1439918372216',
      total_fee: '1',
      trade_type: 'JSAPI',
      appid: 'wx0cf777e00460d938',
      mch_id: '1243556002',
      nonce_str: 'XjUw56N8MjeCUqHCwqgiKwr2CJVgYUpe' };
    var merchant = {
      id: '1243556002',
      key: '11111111111111111111111111111111'
    };
    nodeWeixinConfig.merchant.init(merchant);
    var sign = nodeWeixinPay.sign(merchant, params);
    assert.equal(true, sign === '1D732D3A56A1E4213A50F3B298CF51D4');
  });

  it('should be able to sign a request', function () {
    var params = { openid: 'oonTrs-hfXi6lZU2RbHMyXZJZqgk',
      spbill_create_ip: '1.202.241.9',
      notify_url: 'http://wx.t1bao.com/weixin/pay/main',
      body: '测试支付',
      out_trade_no: '1439920476617',
      total_fee: '1',
      trade_type: 'JSAPI',
      appid: 'wx0cf777e00460d938',
      mch_id: '1243556002',
      nonce_str: 'huySmuPeLtOknYkmj0YK9NG1zNndix6A' };
    var merchant = {
      id: '1243556002',
      key: '11111111111111111111111111111111'
    };
    nodeWeixinConfig.merchant.init(merchant);
    var sign = nodeWeixinPay.sign(merchant, params);
    assert.equal(true, sign === '84AA882864D2C632AB9CDC58B577556F');
  });
});
