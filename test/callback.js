'use strict';

/* eslint camelcase: [2, {properties: "never"}] */

// Included Packages
var assert = require('assert');
//
var nodeWeixinPay = require('../');
var nodeWeixinConfig = require('node-weixin-config');
var merchant = require('./config/merchant');

var app = require('./config/app');

nodeWeixinConfig.merchant.init(merchant);
nodeWeixinConfig.app.init(app);

describe('lib/callback', function () {
  describe('#notify', function () {
    it('shoud be able to notify', function (done) {
      var request = require('supertest');
      var express = require('express');
      var server = express();
      var onNotify = function (req, res) {
        req.rawBody = '<xml><appid><![CDATA[' +
          app.id + ']]></appid> <bank_type><![CDATA[CMB_CREDIT]]></bank_type> <cash_fee><![CDATA[1]]></cash_fee> <fee_type><![CDATA[CNY]]></fee_type> <is_subscribe><![CDATA[Y]]></is_subscribe> <mch_id><![CDATA[' +
          merchant.id + ']]></mch_id> <nonce_str><![CDATA[3UvYKTNeBfugpPC1wnIjAfl3NuG2Y0qD]]></nonce_str> <openid><![CDATA[oonTrs-hfXi6lZU2RbHMyXZJZqgk]]></openid> <out_trade_no><![CDATA[1440529715283]]></out_trade_no> <result_code><![CDATA[SUCCESS]]></result_code> <return_code><![CDATA[SUCCESS]]></return_code> <sign><![CDATA[73106901DDB8622648FFD4B67F1F7EDD]]></sign> <time_end><![CDATA[20150826030843]]></time_end> <total_fee>1</total_fee> <trade_type><![CDATA[JSAPI]]></trade_type> <transaction_id><![CDATA[1010080207201508260709669960]]></transaction_id> </xml>';
        nodeWeixinPay.callback.notify(app, merchant, req, res, function (error, result) {
          console.log(error, result);
          assert.equal(true, error !== true);
          assert.equal(true, result.is_subscribe === 'Y');
          assert.equal(true, result.trade_type === 'JSAPI');
          assert.equal(true, result.bank_type === 'CMB_CREDIT');
          assert.equal(true, result.total_fee === '1');
          assert.equal(true, result.fee_type === 'CNY');
          assert.equal(true, result.transaction_id === '1010080207201508260709669960');
          assert.equal(true, result.out_trade_no === '1440529715283');
          assert.equal(true, result.time_end === '20150826030843');
          done();
        });
      };
      server.post('/notify', onNotify);
      request(server)
        .post('/notify')
        .set('Content-Type', 'text/xml')
        .expect(200)
        .end(function () {});
    });

    it('shoud be able to notify when error', function (done) {
      var request = require('supertest');
      var express = require('express');
      var app = express();
      var onNotify = function (req, res) {
        req.rawBody = '<xml><appid><![CDATA[0000]]></appid> <bank_type><![CDATA[CMB_CREDIT]]></bank_type> <cash_fee><![CDATA[1]]></cash_fee> <fee_type><![CDATA[CNY]]></fee_type> <is_subscribe><![CDATA[Y]]></is_subscribe> <mch_id><![CDATA[' +
          merchant.id + ']]></mch_id> <nonce_str><![CDATA[3UvYKTNeBfugpPC1wnIjAfl3NuG2Y0qD]]></nonce_str> <openid><![CDATA[oonTrs-hfXi6lZU2RbHMyXZJZqgk]]></openid> <out_trade_no><![CDATA[1440529715283]]></out_trade_no> <result_code><![CDATA[SUCCESS]]></result_code> <return_code><![CDATA[SUCCESS]]></return_code> <sign><![CDATA[73106901DDB8622648FFD4B67F1F7EDD]]></sign> <time_end><![CDATA[20150826030843]]></time_end> <total_fee>1</total_fee> <trade_type><![CDATA[JSAPI]]></trade_type> <transaction_id><![CDATA[1010080207201508260709669960]]></transaction_id> </xml>';
        nodeWeixinPay.callback.notify(app, merchant, req, res, function (error) {
          assert.equal(true, error === true);
          done();
        });
      };
      app.post('/notify', onNotify);

      request(app)
        .post('/notify')
        .set('Content-Type', 'text/xml')
        .expect(200)
        .end(function () {});
    });

    it('shoud be able to notify when error 2', function (done) {
      var request = require('supertest');
      var express = require('express');
      var app = express();
      var onNotify = function (req, res) {
        req.rawBody = '<xmlappid![CDATA[0000]]></appid> <bank_type><![CDATA[CMB_CREDIT]]></bank_type> <cash_fee><![CDATA[1]]></cash_fee> <fee_type><![CDATA[CNY]]></fee_type> <is_subscribe><![CDATA[Y]]></is_subscribe> <mch_id><![CDATA[' +
          merchant.id + ']]></mch_id> <nonce_str><![CDATA[3UvYKTNeBfugpPC1wnIjAfl3NuG2Y0qD]]></nonce_str> <openid><![CDATA[oonTrs-hfXi6lZU2RbHMyXZJZqgk]]></openid> <out_trade_no><![CDATA[1440529715283]]></out_trade_no> <result_code><![CDATA[SUCCESS]]></result_code> <return_code><![CDATA[SUCCESS]]></return_code> <sign><![CDATA[73106901DDB8622648FFD4B67F1F7EDD]]></sign> <time_end><![CDATA[20150826030843]]></time_end> <total_fee>1</total_fee> <trade_type><![CDATA[JSAPI]]></trade_type> <transaction_id><![CDATA[1010080207201508260709669960]]></transaction_id> </xml>';
        nodeWeixinPay.callback.notify(app, merchant, req, res, function (error) {
          assert.equal(true, error === true);
          done();
        });
      };
      app.post('/notify', onNotify);

      request(app)
        .post('/notify')
        .set('Content-Type', 'text/xml')
        .expect(200)
        .end(function () {});
    });
  });
});
