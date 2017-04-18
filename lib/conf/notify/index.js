/* eslint camelcase: [2, {properties: "never"}] */
module.exports = {
  // Successfully
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
    maxLength: 32,
    required: true
  },
  out_trade_no: {
    type: 'string',
    maxLength: 32,
    required: true
  },
  attach: {
    type: 'string',
    maxLength: 128
  },
  time_end: {
    type: 'string',
    maxLength: 14,
    required: true
  }
};
