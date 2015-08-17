'use strict';
var assert = require('assert');
var nodeWeixinPay = require('../');

var nodeWeixinConfig = require('node-weixin-config');

var merchant = {
  id: '1243556002',
  key: '02acaa43396517621e54a2bd63ec9d9d'
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
    assert.equal(true, sign === '764F3CE4680F26B21CE05D193246FCD5');
  });
});
