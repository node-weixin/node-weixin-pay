/* eslint camelcase: [2, {properties: "never"}] */
module.exports = {
  trade_type: {
    type: 'string',
    maxLength: 16,
    required: true
  },
  prepay_id: {
    type: 'string',
    maxLength: 64,
    required: true
  },
  code_url: {
    type: 'string',
    maxLength: 64
  }
};
