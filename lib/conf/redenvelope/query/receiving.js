/* eslint camelcase: [2, {properties: "never"}] */
module.exports = {
  mch_billno: {
    type: 'string',
    maxLength: 28,
    required: true
  },
  mch_id: {
    type: 'string',
    maxLength: 32,
    required: true
  },
  wxappid: {
    type: 'string',
    maxLength: 32,
    required: true
  },
  re_openid: {
    type: 'string',
    maxLength: 32,
    required: true

  },
  total_amount: {
    type: 'int',
    required: true
  },
  send_listid: {
    type: 'string',
    maxLength: 32,
    required: true
  }
};
