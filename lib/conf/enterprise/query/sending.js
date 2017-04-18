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
  appid: {
    type: 'string',
    maxLength: 32,
    required: true
  },
  bill_type: {
    type: 'string',
    maxLength: 32,
    required: true
  }
};
