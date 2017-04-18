/* eslint camelcase: [2, {properties: "never"}] */
module.exports = {
  body: {
    type: 'string',
    maxLength: 127,
    required: true
  },
  attach: {
    type: 'string',
    maxLength: 127
  },
  out_trade_no: {
    type: 'string',
    maxLength: 32,
    required: true
  },
  total_fee: {
    type: 'int',
    required: true
  },
  spbill_create_ip: {
    type: 'string',
    maxLength: 16,
    required: true
  },
  time_start: {
    type: 'string',
    maxLength: 14
  },
  time_expire: {
    type: 'string',
    maxLength: 14
  },
  goods_tag: {
    type: 'string',
    maxLength: 32
  },
  notify_url: {
    type: 'string',
    maxLength: 256,
    required: true
  },
  trade_type: {
    type: 'string',
    maxLength: 16,
    required: true
  },
  openid: {
    type: 'string',
    maxLength: 128
  },
  product_id: {
    type: 'string',
    maxLength: 128
  }
};
