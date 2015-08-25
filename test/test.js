'use strict';
var assert = require('assert');
var nodeWeixinPay = require('../');

var nodeWeixinConfig = require('node-weixin-config');
var validator = require('validator');

var merchant = {
  id: process.env.MERCHANT_ID + '' || 'id',
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
    var params = {
      openid: process.env.OPENID,
      spbill_create_ip: '1.202.241.25',
      notify_url: 'http://wx.domain.com/weixin/pay/main',
      body: '测试支付',
      out_trade_no: '111',
      total_fee: '1',
      trade_type: 'JSAPI',
      appid: app.id,
      mch_id: merchant.id,
      nonce_str: 'XjUw56N8MjeCUqHCwqgiKwr2CJVgYUpe'
    };
    nodeWeixinConfig.merchant.init(merchant);
    var sign = nodeWeixinPay.sign(merchant, params);
    assert.equal(true, sign === '87CF15EEACE2EC8BAE266380B02B0CE9');
  });


  it('should be abel to handle callback', function () {
    var xml = ' <xml><appid><![CDATA[' +
      app.id + ']]></appid> <bank_type><![CDATA[CMB_CREDIT]]></bank_type> <cash_fee><![CDATA[1]]></cash_fee> <fee_type><![CDATA[CNY]]></fee_type> <is_subscribe><![CDATA[Y]]></is_subscribe> <mch_id><![CDATA[' +
      merchant.id + ']]></mch_id> <nonce_str><![CDATA[3UvYKTNeBfugpPC1wnIjAfl3NuG2Y0qD]]></nonce_str> <openid><![CDATA[oonTrs-hfXi6lZU2RbHMyXZJZqgk]]></openid> <out_trade_no><![CDATA[1440529715283]]></out_trade_no> <result_code><![CDATA[SUCCESS]]></result_code> <return_code><![CDATA[SUCCESS]]></return_code> <sign><![CDATA[73106901DDB8622648FFD4B67F1F7EDD]]></sign> <time_end><![CDATA[20150826030843]]></time_end> <total_fee>1</total_fee> <trade_type><![CDATA[JSAPI]]></trade_type> <transaction_id><![CDATA[1010080207201508260709669960]]></transaction_id> </xml>';
    var req = {rawBody: xml};
    nodeWeixinPay.callback.notify(app, merchant, req, function(error, result) {
      assert.equal(true, error !== true);
      assert.equal(true, result.is_subscribe === 'Y');
      assert.equal(true, result.trade_type === 'JSAPI');
      assert.equal(true, result.bank_type === 'CMB_CREDIT');
      assert.equal(true, result.total_fee === '1');
      assert.equal(true, result.fee_type === 'CNY');
      assert.equal(true, result.transaction_id === '1010080207201508260709669960');
      assert.equal(true, result.out_trade_no === '1440529715283');
      assert.equal(true, result.time_end === '20150826030843');
    });
  });
});
