/**
 * Created by YB on 2016-10-22.
 */
var fjs = require('../lib/functional_js.js');

function checker (/* 검증자 */) {
    var validators = Array.from(arguments);
    return function (obj) {
        return Array.prototype.reduce.call(validators, function (errs, check) {
            if (check(obj)) {
                return errs;
            } else {
                return errs.push(check.message).toString();
            }
        }, []);
    };
}

var alwaysPasses = checker(fjs.always(true));

