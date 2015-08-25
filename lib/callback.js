var xml2json = require('node-xml2json');
var validation = require('../conf/validation');


module.exports = {
  notify: function (app, merchant, req, cb) {
    var xml = req.body;
    var json = xml2json.toJSON(xml);

    pay.handle(app, merchant, json, validation.notify, function (error) {
      if (!error) {
        cb(false, json);
      } else {
        cb(true);
      }
    });
  }
};
