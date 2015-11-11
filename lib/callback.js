var xml2json = require('xml2json');
var validation = require('../conf/validation');
var xml = require('xml');


function onRes(res, error, result) {
  res.set('Content-Type', 'text/xml');

  if (!error) {
    res.send(xml({
      return_code: 'SUCCESS',
      return_msg: 'OK'
    }));
  } else {
    res.send(xml({
      return_code: 'FAIL',
      return_msg: 'FAILED'
    }));
  }
}

module.exports = {
  notify: function (app, merchant, req, res, cb) {
    var xmlIn = req.body || req.rawBody;
    var json = xml2json.toJson(xmlIn, {coerce: false});
    json = JSON.parse(json);
    var pay = require('../');

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
