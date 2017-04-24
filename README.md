# node-weixin-pay [![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Dependency Status][daviddm-image]][daviddm-url] [![Coverage percentage][coveralls-image]][coveralls-url]

> Weixin 支付 API

支持QQ群：39287176

## Install

```sh
$ npm install --save-exact node-weixin-pay
```

## Usage


### 通用功能

1、初始化对象与基本数据

```js

var nodeWeixinPay = require('node-weixin-pay');
var nodeWeixinConfig = require('node-weixin-config');

// 必须
var merchant = {
  id: process.env.MERCHANT_ID || 'id',
  key: process.env.MERCHANT_KEY || 'key'
};
var app = {
  id: process.env.APP_ID || 'appid',
  secret: process.env.APP_SECRET || 'appsecret',
  token: process.env.APP_TOKEN || 'apptoken'
};

// 证书是可选的，但在退款，红包，企业支付时需要

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
  // 可选（除了退款外接口，可以不用添加）
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

### 处理微信回调接口API

1、处理回调数据，所有的请求的处理结果回调

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

### 基础API

1、发送统一支付请求

```js
nodeWeixinPay.api.order.unified(config, params, function(error, data) {
});
```

2、发送订单查询请求

```js
var config = nodeWeixinPay.api.query(config, params, function(error, data) {
});
```

3、发送订单关闭请求

```js
var config = nodeWeixinPay.api.close(config, params, function(error, data) {
});
```

4、发送创建退款请求

```js
var config = nodeWeixinPay.api.refund.create(config, params, function(error, data) {
});
```

5、发送退款查询请求

```js
var config = nodeWeixinPay.api.refund.query(config, params, function(error, data) {
});
```

6、发送下载对账单请求

```js
var config = nodeWeixinPay.api.statements(config, params, function(error, data) {
});
```

7、发送测速报告请求

```js
var config = nodeWeixinPay.api.report(config, params, function(error, data) {
});
```

### 微信红包接口

1、发起普通微信红包

```js
var config = nodeWeixinPay.api.redenvelope.create(config, params, function(error, data) {
});
```
2、发起裂变微信红包

```js
var config = nodeWeixinPay.api.redenvelope.distribute(config, params, function(error, data) {
});
```
3、发起红包查询

```js
var config = nodeWeixinPay.api.redenvelope.query(config, params, function(error, data) {
});
```

### 企业付款接口

1、发起企业支付

```js
var config = nodeWeixinPay.api.enterprise.create(config, params, function(error, data) {
});
```

2、查询企业支付

```js
var config = nodeWeixinPay.api.enterprise.query(config, params, function(error, data) {
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
