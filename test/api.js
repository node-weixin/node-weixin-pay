'use strict';
/* eslint camelcase: [2, {properties: "never"}] */
// Included Packages
var assert = require('assert');
var nock = require('nock');
// var errors = require('web-errors').errors;
// var validator = require('validator');
var xml = require('xml');

var _ = require('lodash');

var nodeWeixinPay = require('../');
var nodeWeixinConfig = require('node-weixin-config');
// var validation = require('../conf/validation');

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

describe('lib/apis', function () {
  var header = {
    appid: app.id,
    mch_id: merchant.id,
    nonce_str: 'asdfosofd'
  };
  var data = {};
  var reply = _.extend(header, {});
  describe('.order', function () {
    it('order.untified', function (done) {
      var url = 'https://api.mch.weixin.qq.com/pay/unifiedorder';
      nock(url)
        .post(data)
        .reply(200, xml(reply));
      nodeWeixinPay.api.order.unified(config, data, function () {
        assert.equal(true, true);
        done();
      });
    });
    it('order.query', function (done) {
      var url = 'https://api.mch.weixin.qq.com/pay/orderquery';
      nock(url)
        .post(data)
        .reply(200, xml(reply));
      nodeWeixinPay.api.order.query(config, data, function () {
        assert.equal(true, true);
        done();
      });
    });
    it('order.close', function (done) {
      var url = 'https://api.mch.weixin.qq.com/pay/closeorder';
      nock(url)
        .post(data)
        .reply(200, xml(reply));
      nodeWeixinPay.api.order.close(config, data, function () {
        assert.equal(true, true);
        done();
      });
    });
  });
  describe('.refund', function () {
    it('refund.create', function (done) {
      var url = 'https://api.mch.weixin.qq.com/secapi/pay/refund';
      nock(url)
        .post(data)
        .reply(200, xml(reply));
      nodeWeixinPay.api.refund.create(config, data, function () {
        assert.equal(true, true);
        done();
      });
    });

    it('refund.query', function (done) {
      var url = 'https://api.mch.weixin.qq.com/pay/refundquery';
      nock(url)
        .post(data)
        .reply(200, xml(reply));
      nodeWeixinPay.api.refund.query(config, data, function () {
        assert.equal(true, true);
        done();
      });
    });
  });
  it('statements', function (done) {
    var url = 'https://api.mch.weixin.qq.com/pay/downloadbill';
    nock(url)
      .post(data)
      .reply(200, xml(reply));
    nodeWeixinPay.api.statements(config, data, function () {
      assert.equal(true, true);
      done();
    });
  });

  it('report', function (done) {
    var url = 'https://api.mch.weixin.qq.com/payitil/report';
    nock(url)
      .post(data)
      .reply(200, xml(reply));
    nodeWeixinPay.api.report(config, data, function () {
      assert.equal(true, true);
      done();
    });
  });

  it('redenvelope.create', function (done) {
    var url = 'https://api.mch.weixin.qq.com/mmpaymkttransfers/sendredpack';
    nock(url)
      .post(data)
      .reply(200, xml(reply));
    nodeWeixinPay.api.redenvelope.create(config, data, function () {
      assert.equal(true, true);
      done();
    });
  });

  it('redenvelope.distribute', function (done) {
    var url = 'https://api.mch.weixin.qq.com/mmpaymkttransfers/sendgroupredpack';
    nock(url)
      .post(data)
      .reply(200, xml(reply));
    nodeWeixinPay.api.redenvelope.distribute(config, data, function () {
      assert.equal(true, true);
      done();
    });
  });

  it('redenvelope.query', function (done) {
    var url = 'https://api.mch.weixin.qq.com/mmpaymkttransfers/gethbinfo';
    nock(url)
      .post(data)
      .reply(200, xml(reply));
    nodeWeixinPay.api.redenvelope.query(config, data, function () {
      assert.equal(true, true);
      done();
    });
  });

  it('enterprise.create', function (done) {
    var url = 'https://api.mch.weixin.qq.com/mmpaymkttransfers/promotion/transfers';
    nock(url)
      .post(data)
      .reply(200, xml(reply));
    nodeWeixinPay.api.enterprise.create(config, data, function () {
      assert.equal(true, true);
      done();
    });
  });

  it('enterprise.query', function (done) {
    var url = 'https://api.mch.weixin.qq.com/mmpaymkttransfers/gettransferinfo';
    nock(url)
      .post(data)
      .reply(200, xml(reply));
    nodeWeixinPay.api.enterprise.query(config, data, function () {
      assert.equal(true, true);
      done();
    });
  });
});
