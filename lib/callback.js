var xml2js = require('xml2js');
var validation = require('./conf/validation');
var xml = require('xml');

function onRes(res, error, cb) {
  cb();
  res.set('Content-Type', 'text/xml');

  if (error) {
    res.send(xml({
      /* eslint camelcase: [2, {properties: "never"}] */
      return_code: 'FAIL',
      return_msg: 'FAILED'
    }));
  } else {
    res.send(xml({
      /* eslint camelcase: [2, {properties: "never"}] */
      return_code: 'SUCCESS',
      return_msg: 'OK'
    }));
  }
}

module.exports = {
  /**
   * Weixin Server Notification Handler
   *
   * @param app           app configuration
   * @param merchant      merchant configuration
   * @param req           http.req object
   * @param res           http.res object
   * @param cb            Callback function
   */
  notify: function (app, merchant, req, res, cb) {
    var xmlIn = req.body || req.rawBody;

    xml2js.parseString(xmlIn, {
      explicitArray: false,
      ignoreAttrs: true
    }, function (error, json) {
      if (error) {
        return cb(true, new Error(xmlIn));
      }

      // Should not be moved out side of this function
      var pay = require('../');

      pay.handle(app, merchant, json.xml, validation.notify, function (error, result) {
        onRes(res, error, function () {
          if (cb) {
            cb(error, result, json);
          }
        });
      });
    });
  }
};
