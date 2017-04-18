/* eslint camelcase: [2, {properties: "never"}] */
module.export = {
  trade_state: {
    type: 'string',
    maxLength: 32,
    required: true
  },
  device_info: {
    type: 'string',
    maxLength: 32
  },
  openid: {
    type: 'string',
    maxLength: 128,
    required: true
  },
  is_subscribe: {
    type: 'string',
    maxLength: 1,
    required: true
  },
  trade_type: {
    type: 'string',
    maxLength: 16,
    required: true
  },
  bank_type: {
    type: 'string',
    maxLength: 16,
    required: true
  },
  total_fee: {
    type: 'int',
    required: true
  },
  coupon_fee: {
    type: 'int'
  },
  fee_type: {
    type: 'string',
    maxLength: 8
  },
  transaction_id: {
    type: 'string',
    maxLength: 32
  },
  out_trade_no: {
    type: 'string',
    maxLength: 32
  },
  attach: {
    type: 'string',
    maxLength: 128
  },
  time_end: {
    type: 'string',
    maxLength: 128
  }
};
