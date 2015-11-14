'use strict';

/**
 * For Weixin Pay ver 3.3.7
 * @type {*|exports|module.exports}
 */

var _ = require('lodash');
var request = require("node-weixin-request");
var util = require("node-weixin-util");
var v = require('node-form-validator');
var errors = require('web-errors').errors;
var crypto = require('crypto');
var buffer = require('buffer');

var pay = {
  callback: require('./lib/callback'),
  api:require('./lib/api'),
  /**
   * Handler for weixin server response
   *
   * @param app
   * @param merchant
   * @param json                    Validation for data received
   * @param resultValidator         Validation for data result
   * @param cb
   * @returns {*}
   */
  handle: function (app, merchant, json, resultValidator, cb) {
    var returnCode = json.return_code;
    var returnMsg = json.return_msg;
    var error = {};

    if (returnCode === 'SUCCESS') {
      var vError = this.validate(app, merchant, json);
      if (true !== vError) {
        return cb(true, vError, json);
      }

      //是否还要验证数据
      if (resultValidator === null) {
        return cb(false, null, json);
      }
      var resultCode = json.result_code;
      if (resultCode === 'SUCCESS') {
        if (!v.validate(json, resultValidator, error)) {
          cb(true, error, json);
          return;
        }
        var result = v.json.extract(json, resultValidator);
        cb(false, result, json);
        return;
      }
    }
    cb(true, returnMsg, json);
  },

  /**
   * Basic http request wrapper for pay apis, which need to be encrypted and verified for their data format
   *
   * @param url                 Requesting url
   * @param data                Data to be sent
   * @param sendConfig          Sending data validation configuration
   * @param receiveConfig       Receiving data validation configuration
   * @param certificate         Certificate from Tencent Pay
   * @param cb                  Callback Function
   */
  request: function (config, url, data, sendConfig, receiveConfig, cb) {
    var error = {};

    //Validate Sending Data
    if (!v.validate(data, sendConfig, error)) {
      cb(true, error);
      return;
    }

    var params = _.clone(data);
    params = pay.prepare(config.app, config.merchant, params);
    var sign = pay.sign(config.merchant, params);

    params.sign = sign;
    var xml = util.toXml(params);
    request.xmlssl(url, xml, config.certificate, function (error, json) {
      pay.handle(config.app, config.merchant, json, receiveConfig, cb);
    });
  },

  /**
   * Prepare data with normal fields
   *
   * @param data
   * @param app
   * @param merchant
   * @param device
   * @returns {*}
   */
  prepare: function (app, merchant, data, device) {
    data.appid = app.id;
    data.mch_id = merchant.id;
    if (device) {
      data.device_info = device.info;
    }
    data.nonce_str = util.getNonce();
    return data;
  },

  /**
   * Sign all data with merchant key
   *
   * @param merchant
   * @param params
   * @returns {string}
   */
  sign: function (merchant, params) {
    var temp = util.marshall(params);
    temp += '&key=' + String(merchant.key);
    temp = new buffer.Buffer(temp);
    temp = temp.toString("binary");
    var crypt = crypto.createHash('MD5');
    crypt.update(temp);
    return crypt.digest('hex').toUpperCase();
  },

  /**
   *  Validate header for data received
   *
   * @param data
   * @param app
   * @param merchant
   * @returns {*}
   */
  validate: function (app, merchant, data, error) {
    var config = require('./conf/validation');
    var conf = config.auth.header;
    error = error || {};

    if (!v.validate(data, conf, error)) {
      return errors.ERROR;
    }
    if (String(data.appid) !== String(app.id)) {
      return errors.APP_ID_ERROR;
    }
    if (String(data.mch_id) !== String(merchant.id)) {
      return errors.MERCHANT_ID_ERROR;
    }
    return true;
  },

  /**
   *  Make prepay data for jssdk
   *
   * @param app
   * @param merchant
   * @param prepayId
   * @returns {{appId: *, timeStamp: string, nonceStr, package: string, signType: string}}
   */
  prepay: function (app, merchant, prepayId) {
    var crypto = require('crypto');
    var md5 = crypto.createHash('md5');
    var timeStamp = String(new Date().getTime());

    md5.update(timeStamp);
    timeStamp = Math.floor(timeStamp / 1000);

    var nonceStr = md5.digest('hex');
    var data = {
      appId: app.id,
      timeStamp: String(timeStamp),
      nonceStr: nonceStr,
      package: 'prepay_id=' + prepayId,
      signType: 'MD5'
    };
    data.paySign = this.sign(merchant, data);
    return data;
  }
};

module.exports = pay;

