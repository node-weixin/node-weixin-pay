var xml2js = require('xml2js');
var validation = require('./conf/validation');

function onRes(res, error, cb) {
  cb();
  res.set('Content-Type', 'text/xml');
  var xml = '';
  if (error) {
    xml = '<xml><return_code><![CDATA[FAIL]]></return_code><return_msg><![CDATA[' + error + ']]></return_msg></xml>';
  } else {
    xml = '<xml><return_code><![CDATA[SUCCESS]]></return_code><return_msg><![CDATA[OK]]></return_msg></xml>';
  }
  res.send(xml);
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
