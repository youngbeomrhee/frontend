/**
 * Created by YB on 2016-06-18.
 */

function myEach(obj, fn) {
    if(obj.length == undefined) {
        for (var i in obj) {
            fn.apply(obj[i], [i, obj[i]]);
        }
    } else {
        for (var i = 0; i < obj.length; i++) {
            fn.apply(obj[i], [i, obj[i]]);
        }
    }
    return obj;
}

myEach([1, 2, 3], function (idx, num) {
    console.log(idx + " : " + num);
});

myEach({a:1, b:2}, function (idx, num) {
    console.log(idx + " : " + num);
});
