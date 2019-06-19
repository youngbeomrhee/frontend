"use strict";
function permutation(str, prefix, result) {
    if (prefix === void 0) { prefix = ''; }
    // 종단점 설정
    if (str.length === 0) {
        result.push(prefix);
    }
    else {
        for (var i = 0; i < str.length; i++) {
            var pickedChar = str[i], rest = str.substr(0, i) + str.substr(i + 1), addedPrefix = prefix + pickedChar;
            permutation(rest, addedPrefix, result);
        }
    }
}
var result = [];
permutation('abc', '', result);
console.debug('\nabc의 순열', result);
var StringPermutation = /** @class */ (function () {
    function StringPermutation(str) {
        this._result = [];
        this._callCount = 0;
        this._str = str;
        this._permutation(str);
    }
    StringPermutation.prototype.reset = function (str) {
        this._str = str;
        this._result = [];
        this._callCount = 0;
        this._permutation(str);
    };
    StringPermutation.prototype.printResult = function () {
        console.log("* " + this._str + "\uC758 \uC21C\uC5F4 : ");
        console.log(this._result);
        console.log("call count: " + this._callCount);
    };
    StringPermutation.prototype._permutation = function (str, prefix) {
        if (prefix === void 0) { prefix = ''; }
        this._callCount++;
        // 종단점 설정
        if (str.length === 0) {
            this._result.push(prefix);
        }
        else {
            for (var i = 0; i < str.length; i++) {
                var pickedChar = str[i], rest = str.substr(0, i) + str.substr(i + 1), addedPrefix = prefix + pickedChar;
                this._permutation(rest, addedPrefix);
            }
        }
    };
    return StringPermutation;
}());
var strPermutation = new StringPermutation('abc');
strPermutation.printResult();
strPermutation.reset('abcd');
strPermutation.printResult();
// ;
//
// console.debug('\nabcd의 순열');
// permutation('abcd');
