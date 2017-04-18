/* eslint camelcase: [2, {properties: "never"}] */
module.exports = {
  result_code: {
    type: 'string',
    maxLength: 16,
    required: true
  },
  result_msg: {
    type: 'string',
    maxLength: 128
  }
};
