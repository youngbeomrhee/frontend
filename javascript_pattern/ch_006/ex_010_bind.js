/**
 * Created by YB on 2016-10-22.
 */
// Function.prototype.bind()

if(typeof Function.prototype.bind === "undefined") {
    Function.prototype.bind = function (thisArg) {
        var fn = this,
            slice = Array.prototype.slice,
            args = slice.call(arguments, 1);

        return function () {
            return fn.apply(thisArg, args.concat(slice.call(arguments)));
        };
    };
}

var towsay2 = one.sa.bind(two)
