/* eslint camelcase: [2, {properties: "never"}] */
module.exports = {
  mch_billno: {
    type: 'string',
    required: true
  },
  mchid: {
    type: 'string',
    maxLength: 32,
    required: true
  },
  device_info: {
    type: 'string',
    maxLength: 32
  },
  partner_trade_no: {
    type: 'string',
    required: true
  },
  openid: {
    type: 'string',
    required: true
  },
  check_name: {
    type: 'string',
    required: true
  },
  re_user_name: {
    type: 'string'
  },
  amount: {
    type: 'int',
    required: true
  },
  desc: {
    type: 'string',
    required: true
  },
  spbill_create_ip: {
    type: 'string',
    required: true
  }
};
