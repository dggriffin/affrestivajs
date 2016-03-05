'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.processImage = processImage;

var _jquery = require('jquery');

var _jquery2 = _interopRequireDefault(_jquery);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var AFFRESTIVA_API = 'http://vistatodolistapi.azurewebsites.net/';


/**
 * Find JSON configuration given a filename
 * Applies .mitto constraints if your package has a .mitto package present
 * @return {json converted to Object}
 */
function processImage(imageFile, callback) {
  _POST(imageFile, callback);
};

/**
  * PRIVATE HELPER FUNCTIONS
  */

var _POST = function _POST(file, callback) {
  if (!file || !file.type.match(/image.*/)) return;

  //Creates the FormData object and attach to a key name "file"
  var fd = new FormData();
  fd.append("image", file);

  _jquery2.default.ajax({
    url: AFFRESTIVA_API,
    data: fd,
    processData: false,
    contentType: false,
    type: 'POST',
    success: function success(data) {
      if (callback) {
        callback({ success: true, data: data });
      }
    }
  });
};