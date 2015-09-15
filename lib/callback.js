var xml2json = require('xml2json');
var validation = require('../conf/validation');
module.exports = {
  notify: function (app, merchant, req, res, cb) {
    var xml = req.body || req.rawBody;
    var json = xml2json.toJson(xml, {coerce: false});
    json = JSON.parse(json);
    var pay = require('../');

    function onRes(error, result) {
      if (!error) {
        res.json({
          return_code: 'SUCCESS',
          return_msg: 'OK'
        });
      } else {
        res.json({
          return_code: 'FAIL',
          return_msg: 'FAILED'
        });
      }
    };
    pay.handle(app, merchant, json.xml, validation.notify, function (error, result) {
      if (cb) {
        return cb(error, result, json, function() {
          onRes(error, result);
        });
      }
      onRes(error, result);
    });
  }
};
