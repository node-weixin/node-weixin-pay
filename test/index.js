'use strict';
/* eslint camelcase: [2, {properties: "never"}] */

// Included Packages
var assert = require('assert');
var nock = require('nock');
var validator = require('validator');
var xml = require('xml');

//
var nodeWeixinPay = require('../');
var nodeWeixinConfig = require('node-weixin-config');
var validation = require('../lib/conf/validation');

var merchant = require('./config/merchant');

var app = require('./config/app');

var certificate = require('./config/certificate');

nodeWeixinConfig.merchant.init(merchant);
nodeWeixinConfig.app.init(app);

var config = {
  app: app,
  merchant: merchant,
  certificate: certificate
};

describe('node-weixin-pay index', function () {
  it('should have these properties', function () {
    var fucList = ['sign', 'validate', 'prepay', 'prepare', 'request', 'handle'];
    for (var i = 0; i < fucList.length; i++) {
      assert.equal(true, nodeWeixinPay[fucList[i]] instanceof Function);
    }
    assert.equal(true, nodeWeixinPay.callback.notify instanceof Function);
    assert.equal(true, nodeWeixinPay.api.order.unified instanceof Function);
    assert.equal(true, nodeWeixinPay.api.order.query instanceof Function);
    assert.equal(true, nodeWeixinPay.api.order.close instanceof Function);
    assert.equal(true, nodeWeixinPay.api.refund.create instanceof Function);
    assert.equal(true, nodeWeixinPay.api.refund.query instanceof Function);
    assert.equal(true, nodeWeixinPay.api.statements instanceof Function);
    assert.equal(true, nodeWeixinPay.api.report instanceof Function);
  });

  describe('#sign', function () {
    it('should be able to sign a request', function () {
      var params = {
        openid: process.env.APP_OPENID,
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
      var sign = nodeWeixinPay.sign(merchant, params);
      assert.equal(true, sign.length === 32);
    });
  });

  describe('#validate', function () {
    it('should get an error ', function () {
      var result = nodeWeixinPay.validate(app, merchant, {});
      assert.equal(true, result instanceof Error);
      assert.equal('Validation Failed!', result.message);
    });

    it('should get an error for appid', function () {
      var error = {};
      var result = nodeWeixinPay.validate(app, merchant, {
        appid: 'aaa',
        mch_id: 'bb',
        nonce_str: 'ccc'
      }, error);
      assert.equal(true, result instanceof Error);
      assert.equal('AppId Invalid!', result.message);
    });

    // it('should get an error for merchant id', function () {
    //   var error = {};
    //   var result = nodeWeixinPay.validate(app, merchant, {
    //     appid: app.id,
    //     mch_id: 'SODFSOFS',
    //     nonce_str: 'ccc'
    //   }, error);
    //   assert.equal(true, result instanceof Error);
    // });

    it('should validate ok', function () {
      var error = {};
      var result = nodeWeixinPay.validate(app, merchant, {
        appid: app.id,
        mch_id: merchant.id,
        nonce_str: 'ccc'
      }, error);
      assert.equal(true, result);
    });

    it('should be true if wxappid present', function () {
      var result = nodeWeixinPay.validate(app, merchant, {
        wxappid: 'sdfsdf'
      });
      assert.equal(true, result);
    });
  });

  describe('#qrcode', function () {
    it('should be able to generate qrcode string', function () {
      var id = 'product_id';
      var qrcode = nodeWeixinPay.qrcode(app, merchant, id);
      assert(qrcode);
    });
  });

  describe('#prepay', function () {
    it('should be able to prepay', function () {
      var id = 'id';
      var config = nodeWeixinPay.prepay(app, merchant, id);
      assert.equal(true, config.appId === app.id);
      assert.equal(true, validator.isNumeric(config.timeStamp));
      assert.equal(true, config.package === 'prepay_id=' + id);
      assert.equal(true, config.signType === 'MD5');
      assert.equal(true, typeof config.paySign === 'string');
      assert.equal(true, typeof config.nonceStr === 'string');
    });
  });

  describe('#prepare', function () {
    it('should be able to prepare', function () {
      var data = {};
      var config = nodeWeixinPay.prepare(app, merchant, data);
      assert.equal(true, config.appid === app.id);
      assert.equal(true, config.mch_id === merchant.id);
      assert.equal(true, typeof config.nonce_str === 'string');
      assert.equal(true, config.nonce_str.length >= 1);
      assert.equal(true, nodeWeixinPay.validate(app, merchant, config));
    });

    it('should be able to prepare', function () {
      var data = {};
      var config = nodeWeixinPay.prepare(app, merchant, data, {
        device_info: 'sfdsfd'
      });
      assert.equal(true, config.appid === app.id);
      assert.equal(true, config.mch_id === merchant.id);
      assert.equal(true, typeof config.nonce_str === 'string');
      assert.equal(true, config.nonce_str.length >= 1);
      assert.equal(true, nodeWeixinPay.validate(app, merchant, config, {
        device_info: 'sfdsfd'
      }));
    });
  });

  describe('#handle', function () {
    it('should be able to handle response FAILED', function (done) {
      var data = {
        return_code: 'FAILED',
        return_msg: '失败!',
        appid: app.id,
        mch_id: merchant.id,
        nonce_str: 'sodsfd'
      };
      nodeWeixinPay.handle(app, merchant, data, validation.auth.unified, function (error) {
        assert.equal(true, error);
        done();
      });
    });

    it('should be able to handle response SUCCESS without data', function (done) {
      var data = {
        return_code: 'SUCCESS',
        return_msg: '成功!',
        appid: app.id,
        mch_id: merchant.id,
        nonce_str: 'sodsfd'
      };
      nodeWeixinPay.handle(app, merchant, data, null, function (error) {
        assert.equal(true, !error);
        done();
      });
    });

    it('should fail to handle response SUCCESS without data when validator specified', function (done) {
      var data = {
        return_code: 'SUCCESS',
        return_msg: '成功!',
        appid: 'asfdssfsfd',
        mch_id: merchant.id,
        nonce_str: 'sodsfd'
      };
      nodeWeixinPay.handle(app, merchant, data, validation.unified.receiving, function (error) {
        assert.equal(true, error);
        done();
      });
    });

    it('should fail to handle response SUCCESS without data when validator specified', function (done) {
      var data = {
        return_code: 'SUCCESS',
        return_msg: '成功!',
        appid: app.id,
        mch_id: merchant.id,
        nonce_str: 'sodsfd'
      };
      nodeWeixinPay.handle(app, merchant, data, validation.unified.receiving, function (error) {
        assert.equal(true, error);
        done();
      });
    });

    it('should fail to handle response SUCCESS with data', function (done) {
      var data = {
        return_code: 'SUCCESS',
        return_msg: '成功!',
        appid: app.id,
        mch_id: merchant.id,
        nonce_str: 'sodsfd',
        result_code: 'SUCCESS'
      };
      nodeWeixinPay.handle(app, merchant, data, validation.unified.receiving, function (error) {
        assert.equal(true, error);
        done();
      });
    });

    it('should be able to handle response SUCCESS with data', function (done) {
      var data = {
        return_code: 'SUCCESS',
        return_msg: '成功!',
        appid: app.id,
        mch_id: merchant.id,
        nonce_str: 'sodsfd',
        result_code: 'SUCCESS',
        trade_type: 'dodo',
        prepay_id: '18383'
      };
      nodeWeixinPay.handle(app, merchant, data, validation.unified.receiving, function (error) {
        assert.equal(true, !error);
        done();
      });
    });
  });
  describe('#request', function () {
    it('should fail to sending data without matching config', function (done) {
      var url = 'https://helloworld.com';
      var data = {
        body: 'sdofsofd'
      };
      nock(url)
        .post('/')
        .reply(200, xml({
          return_code: 'sdfsdf',
          appid: 'sdfosofd'
        }));
      nodeWeixinPay.request(config, url, data, validation.unified.sending, validation.unified.receiving, function (error) {
        assert.equal(true, error);
        done();
      });
    });

    it('should be able to sending data with matching config', function (done) {
      var url = 'https://post.helloworld.com/';
      var data = {
        body: 'sdofsofd',
        out_trade_no: '8283232323',
        total_fee: 1,
        spbill_create_ip: '127.0.0.1',
        time_start: '19001212',
        time_expire: '19001212',
        notify_url: 'https://helloworld.com',
        trade_type: 'JSSDK'
      };
      var xmlStr = xml({
        xml: [{
          return_code: 'SUCCESS'
        }, {
          return_msg: '成功!'
        }, {
          appid: app.id
        }, {
          mch_id: merchant.id
        }, {
          nonce_str: 'sodsfd'
        }, {
          result_code: 'SUCCESS'
        }, {
          trade_type: 'dodo'
        }, {
          prepay_id: '18383'
        }]
      });
      nock(url)
        .post('/')
        .reply(200, xmlStr);
      nodeWeixinPay.request(config, url, data, validation.unified.sending, validation.unified.receiving, function (error) {
        assert.equal(true, !error);
        done();
      });
    });

    it('should be able to sending data with ssl', function (done) {
      var url = 'https://post.helloworld.com/';
      var data = {
        body: 'sdofsofd',
        out_trade_no: '8283232323',
        total_fee: 1,
        spbill_create_ip: '127.0.0.1',
        time_start: '19001212',
        time_expire: '19001212',
        notify_url: 'https://helloworld.com',
        trade_type: 'JSSDK'
      };
      var xmlStr = xml({
        xml: [{
          return_code: 'SUCCESS'
        }, {
          return_msg: '成功!'
        }, {
          appid: app.id
        }, {
          mch_id: merchant.id
        }, {
          nonce_str: 'sodsfd'
        }, {
          result_code: 'SUCCESS'
        }, {
          trade_type: 'dodo'
        }, {
          prepay_id: '18383'
        }]
      });
      nock(url)
        .post('/')
        .reply(200, xmlStr);
      config.ssl = true;
      nodeWeixinPay.request(config, url, data, validation.unified.sending, validation.unified.receiving, function (error) {
        assert.equal(true, !error);
        done();
      });
    });
  });
});

require('./callback');
