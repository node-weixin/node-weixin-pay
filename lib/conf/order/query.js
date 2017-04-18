/* eslint camelcase: [2, {properties: "never"}] */
module.export = {
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
  transaction_id: {
    type: 'string',
    maxLength: 32
  },
  out_trade_no: {
    type: 'string',
    maxLength: 32,
    required: true
  },
  nonce_str: {
    type: 'string',
    maxLength: 32,
    required: true
  }
};
