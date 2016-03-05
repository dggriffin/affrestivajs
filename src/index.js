import $ from 'jquery';
import AFFRESTIVA_API from '../config/config.json';

/**
 * Takes an imageURI and callback, processes image with affrestiva API
 */
export function processImage(imageURI, callback) {
  _POST(imageFile, callback);
};


/**
  * PRIVATE HELPER FUNCTIONS
  */
function _POST (file, callback){
    let formData = new FormData();
    formData.append("image", _dataURItoBlob(file), "imagefile.png");

    $.ajax({
        url: AFFRESTIVA_API,
        data: formData,
        processData: false,
        contentType: false,
        type: 'POST',
        success: function(data) {
          if(callback){
            callback({success: true, data: data});
          }
        }
    });
};


function _dataURItoBlob(dataURI) {
    // convert base64/URLEncoded data component to raw binary data held in a string
    let byteString;
    if (dataURI.split(',')[0].indexOf('base64') >= 0)
        byteString = atob(dataURI.split(',')[1]);
    else
        byteString = unescape(dataURI.split(',')[1]);

    // separate out the mime component
    let mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

    // write the bytes of the string to a typed array
    let ia = new Uint8Array(byteString.length);
    for (let i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ia], {
        type: mimeString
    });
};