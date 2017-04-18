/* eslint camelcase: [2, {properties: "never"}] */
module.exports = {
  partner_trade_no: {
    type: 'string',
    maxLength: 28,
    required: true
  },
  payment_no: {
    type: 'string',
    required: true
  },
  payment_time: {
    type: 'string',
    required: true
  }
};
