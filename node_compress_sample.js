/**
 * Created by YB on 2016-09-24.
 */
var compressor = require('node-minify');
/*

new compressor.minify({
    type: 'uglifyjs',
    fileIn: 'javascript_pattern/ch_002/ex_007_eval.js',
    fileOut: 'javascript_pattern/ch_002/ex_007_eval.min.js',
    callback: function(err, min){
        console.log(err);
        //console.log(min);
    }
});

new compressor.minify({
    type: 'uglifyjs',
    fileIn: 'jquery-3.1.1.js',
    fileOut: 'jquery-3.1.1.min.js',
    callback: function(err, min){
        console.log(err);
        //console.log(min);
    }
});
*/

new compressor.minify({
    type: 'uglifyjs',
    fileIn: 'lab/bookmarklet_modify_elements.js',
    fileOut: 'lab/bookmarklet_modify_elements.min.js',
    callback: function(err, min){
        console.log(err);
        //console.log(min);
    }
});