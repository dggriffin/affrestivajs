const AFFRESTIVA_API = 'http://vistatodolistapi.azurewebsites.net/';
import $ from 'jquery';

/**
 * Find JSON configuration given a filename
 * Applies .mitto constraints if your package has a .mitto package present
 * @return {json converted to Object}
 */
export function processImage(imageFile, callback) {
  _POST(imageFile, callback);
};


/**
  * PRIVATE HELPER FUNCTIONS
  */


let _POST = (file, callback) => {
    if (!file || !file.type.match(/image.*/)) return;

    //Creates the FormData object and attach to a key name "file"
    var fd = new FormData();
    fd.append("image", file);

    $.ajax({
        url: AFFRESTIVA_API,
        data: fd,
        processData: false,
        contentType: false,
        type: 'POST',
        success: function(data) {
          if(callback){
            callback({success: true, data: data});
          }
        }
    });
}