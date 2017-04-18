/* eslint camelcase: [2, {properties: "never"}] */
module.exports = {
  auth: require('./auth'),
  unified: require('./unified'),
  notify: require('./notify'),
  order: require('./order'),
  refund: {
    create: require('./refund/create'),
    query: require('./refund/query')
  },
  statements: {
    sending: require('./statements/sending')
  },
  report: {
    sending: require('./report/sending')
  },
  redenvelope: {
    normal: require('./redenvelope/normal/'),
    distribute: require('./redenvelope/distribute/'),
    query: require('./redenvelope/query/')
  },
  enterprise: {
    create: require('./enterprise/create/'),
    query: require('./enterprise/query/')
  }
};
