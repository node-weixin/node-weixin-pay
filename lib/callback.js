var xml2json = require('xml2json');
var validation = require('../conf/validation');
var pay = require('../');
module.exports = {
  notify: function (app, merchant, req, cb) {
    var xml = req.body || req.rawBody;
    var json = xml2json.toJson(xml, {coerce: false});
    json = JSON.parse(json);
    pay.handle(app, merchant, json.xml, validation.notify, function (error, result) {
      if (!error) {
        cb(false, result, json);
      } else {
        cb(true, result, json);
      }
    });
  }
};
