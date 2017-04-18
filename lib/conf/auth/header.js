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
  }
};
