/* eslint camelcase: [2, {properties: "never"}] */
module.exports = {
  transaction_id: {
    type: 'string',
    maxLength: 28,
    required: true
  },
  out_refund_no: {
    type: 'string',
    maxLength: 32,
    required: true
  },
  refund_count: {
    type: 'int'
  }
};
