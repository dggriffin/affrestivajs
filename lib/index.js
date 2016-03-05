'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.processImage = processImage;

var _jquery = require('jquery');

var _jquery2 = _interopRequireDefault(_jquery);

var _config = require('../config/config.json');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Takes an imageURI and callback, processes image with affrestiva API
 */
function processImage(imageURI, callback) {
    _POST(imageFile, callback);
};

/**
  * PRIVATE HELPER FUNCTIONS
  */
function _POST(file, callback) {
    var formData = new FormData();
    formData.append("image", _dataURItoBlob(file), "imagefile.png");

    _jquery2.default.ajax({
        url: _config2.default,
        data: formData,
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

function _dataURItoBlob(dataURI) {
    // convert base64/URLEncoded data component to raw binary data held in a string
    var byteString = void 0;
    if (dataURI.split(',')[0].indexOf('base64') >= 0) byteString = atob(dataURI.split(',')[1]);else byteString = unescape(dataURI.split(',')[1]);

    // separate out the mime component
    var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

    // write the bytes of the string to a typed array
    var ia = new Uint8Array(byteString.length);
    for (var i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ia], {
        type: mimeString
    });
};