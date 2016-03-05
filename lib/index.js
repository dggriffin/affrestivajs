'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.processImage = processImage;

var _jquery = require('jquery');

var _jquery2 = _interopRequireDefault(_jquery);

var _config = require('../config/config.json');

var _config2 = _interopRequireDefault(_config);

var _post2 = require('http://posttestserver.com/post.php');

var _post3 = _interopRequireDefault(_post2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var TEST_EMOTION_OBJECT = {
  anger: false,
  attention: false,
  browFurrow: false,
  browRaise: false,
  chinRaise: false,
  contempt: false,
  disgust: false,
  engagement: false,
  eyeClosure: false,
  fear: false,
  gender: false,
  glasses: false,
  innerBrowRaise: false,
  joy: false,
  lipCornerDepressor: false,
  lipPress: false,
  lipPucker: false,
  lipSuck: false,
  mouthOpen: false,
  noseWrinkle: false,
  sadness: false,
  smile: false,
  surprise: false,
  upperLipRaise: false,
  valence: false
};

/**
 * Takes an imageURI and callback, processes image with affrestiva API
 */
function processImage(imageURI, callback, _ref) {
  var _ref$debug = _ref.debug;
  var debug = _ref$debug === undefined ? false : _ref$debug;

  if (!debug) {
    _post(imageFile, callback);
  } else {
    _testPost(imageFile, callback);
  }
};

/**
  * PRIVATE HELPER FUNCTIONS
  */
function _post(file, callback) {
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

function _testPost(file, callback) {
  var formData = new FormData();
  formData.append("image", _dataURItoBlob(file), "imagefile.png");

  _jquery2.default.ajax({
    url: _post3.default,
    data: formData,
    processData: false,
    contentType: false,
    type: 'POST',
    success: function success(data) {
      if (callback) {
        callback({ success: true, data: TEST_EMOTION_OBJECT });
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