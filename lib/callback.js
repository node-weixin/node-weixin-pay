var xml2json = require('xml2json');
var validation = require('../conf/validation');
var pay = require('../');
module.exports = {
  notify: function (app, merchant, req, res, cb) {
    var xml = req.body || req.rawBody;
    var json = xml2json.toJson(xml, {coerce: false});
    json = JSON.parse(json);
    pay.handle(app, merchant, json.xml, validation.notify, function (error, result) {
      if (!error) {
        res.json({
          return_code: 'SUCCESS',
          return_msg: 'OK'
        });
        cb(false, result, json);
      } else {
        res.json({
          return_code: 'FAIL',
          return_msg: 'FAILED'
        });
        cb(true, result, json);
      }
    });
  }
};
