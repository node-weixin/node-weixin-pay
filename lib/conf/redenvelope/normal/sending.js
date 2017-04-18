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
  send_name: {
    type: 'string',
    maxLength: 32,
    required: true
  },
  re_openid: {
    type: 'string',
    maxLength: 32
  },
  total_amount: {
    type: 'int',
    required: true
  },
  total_num: {
    type: 'int',
    required: true
  },
  wishing: {
    type: 'string',
    required: true
  },
  client_ip: {
    type: 'string',
    required: true
  },
  act_name: {
    type: 'string',
    required: true
  },
  remark: {
    type: 'string',
    required: true
  },
  scene_id: {
    type: 'string'
  },
  risk_info: {
    type: 'string'
  },
  consume_mch_id: {
    type: 'string'
  }
};
