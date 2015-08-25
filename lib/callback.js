var xml2json = require('xml2json');
var validation = require('../conf/validation');
var pay = require('../');
console.log(pay);

module.exports = {
  notify: function (app, merchant, req, cb) {
    var xml = req.body || req.rawBody;
    console.log(req);
    console.log(String(xml));
    var json = xml2json.toJson(xml, {coerce: false});
    console.log(json);

    pay.handle(app, merchant, json, validation.notify, function (error, result) {
      if (!error) {
        cb(false, result, json);
      } else {
        cb(true, result, json);
      }
    });
  }
};
