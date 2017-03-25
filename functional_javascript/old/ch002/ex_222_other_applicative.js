/**
 * Created by YB on 2016-10-10.
 */
function allOf(/*funcs*/) {
    return Array.prototype.reduceRight.call(arguments, function (truth, f) {
        return truth && f();
    }, true);
}

function anyOf(/*funcs*/) {
    return Array.prototype.reduceRight.call(arguments, function (truth, f) {
        return truth || f();
    }, false);
}

function T() {
    return true;
}

function F() {
    return false;
}

console.log(allOf());
console.log(allOf(T, T));
console.log(allOf(T, T, T, T, F));
console.log(anyOf(T, T, F));
console.log(anyOf(F, F, F, F));
console.log(anyOf());