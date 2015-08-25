var xml2json = require('node-xml2json');


module.exports = {
  notify: function (app, merchant, req, url, conf, cb) {
    var xml = req.body;

    var json = xml2json.toJSON(xml);
    pay.handle(app, merchant, json, conf, function (error) {
      if (error === errors.SUCCESS) {
        res.json({
          return_code: 'SUCCESS',
          return_msg: errors.message
        });
      } else {
        res.json({
          return_code: 'FAIL',
          return_msg: errors.message
        });
      }
    });
  }
};
