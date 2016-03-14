# node-weixin-pay [![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Dependency Status][daviddm-image]][daviddm-url] [![Coverage percentage][coveralls-image]][coveralls-url]

> Weixin Pay functions for node

支持QQ群：39287176

## Install

```sh
$ npm install --save node-weixin-pay
```


## Usage


> 通用功能

1、初始化对象与基本数据

```js
var nodeWeixinPay = require('node-weixin-pay');
var nodeWeixinConfig = require('node-weixin-config');


var merchant = {
  id: process.env.MERCHANT_ID || 'id',
  key: process.env.MERCHANT_KEY || 'key'
};
var app = {
  id: process.env.APP_ID || 'appid',
  secret: process.env.APP_SECRET || 'appsecret',
  token: process.env.APP_TOKEN || 'apptoken'
};

var certificate = {
  pkcs12: path.resolve(certPKCS12File),             //格式是文件名
  key: String(certKey)
};

//或者

var certificate = {
  pfx: new Buffer(conf.merchant_pfx, 'base64'),     //格式是文件二进制内容
  pfxKey: conf.merchant_id
};

//对于大部分的支付接口来说是需要config的
var config = {
  app: app,
  merchant: merchant,
  certificate: certificate
};

//校验数据的正确性
nodeWeixinConfig.app.init(app);
nodeWeixinConfig.merchant.init(merchant);

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

```

2、签名一个请求

```js

var sign = nodeWeixinPay.sign(merchant, params);
```


3、准备一个支付配置

```js
var id = 'id';
var config = nodeWeixinPay.prepay(app, merchant, id);
```


> 具体的API请求部分

4、发送统一支付请求

```js
nodeWeixinPay.api.order.unified(config, params, function(error, data) {
});
```

5、发送订单查询请求

```js
var config = nodeWeixinPay.api.query(config, params, function(error, data) {
});
```

6、发送订单关闭请求

```js
var config = nodeWeixinPay.api.close(config, params, function(error, data) {
});
```

7、发送创建退款请求

```js
var config = nodeWeixinPay.refund.create(config, params, function(error, data) {
});
```

8、发送退款查询请求

```js
var config = nodeWeixinPay.refund.query(config, params, function(error, data) {
});
```

9、发送下载对账单请求

```js
var config = nodeWeixinPay.statements(config, params, function(error, data) {
});
```

10、发送测速报告请求

```js
var config = nodeWeixinPay.report(config, params, function(error, data) {
});
```

> 处理微信回调

10、外理回调数据

```js
//req.rawBody should be enabled
var req = {rawBody: xml};
var res = {
  json: function() {

  }
};
nodeWeixinPay.callback.notify(app, merchant, req, res, function(error, data) {
});
```

## License

Apache-2.0 © [calidion](calidion.github.io)


[npm-image]: https://badge.fury.io/js/node-weixin-pay.svg
[npm-url]: https://npmjs.org/package/node-weixin-pay
[travis-image]: https://travis-ci.org/node-weixin/node-weixin-pay.svg?branch=master
[travis-url]: https://travis-ci.org/node-weixin/node-weixin-pay
[daviddm-image]: https://david-dm.org/node-weixin/node-weixin-pay.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/node-weixin/node-weixin-pay
[coveralls-image]: https://coveralls.io/repos/node-weixin/node-weixin-pay/badge.svg
[coveralls-url]: https://coveralls.io/r/node-weixin/node-weixin-pay
