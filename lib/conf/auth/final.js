/* eslint camelcase: [2, {properties: "never"}] */
module.export = {
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
    maxLength: 128
  }
};
