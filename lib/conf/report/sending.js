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
  interface_url: {
    type: 'string',
    maxLength: 127,
    required: true
  },
  execute_time_: {
    type: 'string',
    maxLength: 8
  },
  return_code: {
    type: 'string',
    maxLength: 16,
    required: true
  },
  return_msg: {
    type: 'string',
    maxLength: 128
  },
  result_code: {
    type: 'string',
    maxLength: 16,
    required: true
  },
  err_code: {
    type: 'string',
    maxLength: 32
  },
  err_code_des: {
    type: 'string',
    maxLength: 32,
    required: true
  },
  out_trade_no: {
    type: 'string',
    maxLength: 32
  },
  user_ip: {
    type: 'string',
    maxLength: 16,
    required: true
  },
  time: {
    type: 'string',
    maxLength: 14
  }
};
