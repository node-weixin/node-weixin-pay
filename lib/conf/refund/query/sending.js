/* eslint camelcase: [2, {properties: "never"}] */
module.exports = {
  appid: {
    type: 'string',
    maxLength: 32,
    required: true
  },
  mch_id: {
    type: 'string',
    maxLength: 32,
    required: true
  },
  device_info: {
    type: 'string',
    maxLength: 32
  },
  nonce_str: {
    type: 'string',
    maxLength: 32,
    required: true
  },
  transaction_id: {
    type: 'string',
    maxLength: 28,
    required: true
  },
  out_trade_no: {
    type: 'string',
    maxLength: 32,
    required: true
  },
  out_refund_no: {
    type: 'string',
    maxLength: 32,
    required: true
  },
  refund_id: {
    type: 'string',
    maxLength: 28,
    required: true
  }
};
