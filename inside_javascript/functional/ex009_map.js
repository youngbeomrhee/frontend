/**
 * Created by YB on 2016-06-18.
 */

Array.prototype.map = function (callback) {
    var obj = this;
    var value, mapped_value;
    var A = new Array(obj.length);

    for (var i = 0; i < obj.length; i++) {
        value = obj[i];
        mapped_value = callback.call(null, value);
        A[i] = mapped_value;
    }
    return A;
};

var arr = [1, 2, 3];
var new_arr = arr.map(function (value) {
    return value * value;
});

console.log(new_arr);


