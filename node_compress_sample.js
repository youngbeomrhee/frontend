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
*/


compressor.minify({
    compressor: 'uglifyjs',
    input: 'jquery-3.1.1.js',
    output: './lib/jquery-3.1.1.min.js',
    callback: function(err, min){
        console.log(err);
        //console.log(min);
    }
});

/*
compressor.minify({
    compressor: 'uglifyjs',
    input: 'lab/bookmarklet_modify_elements.js',
    output: 'lab/bookmarklet_modify_elements.min.js',
    callback: function(err, min){
        console.log(err);
        //console.log(min);
    }
});
*/
