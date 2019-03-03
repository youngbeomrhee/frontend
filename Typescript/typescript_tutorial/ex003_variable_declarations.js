"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var o = {
    a: 1,
    b: 2
};
var new1 = o.a, new2 = o.b;
function keepWholeObject(wholeObject) {
    var a = wholeObject.a, _a = wholeObject.b, b = _a === void 0 ? 1001 : _a;
}
var defaults = { food: "spicy", price: "$$", ambiance: "noisy" };
var search = __assign({}, defaults, { food: "rich" });
console.log(__assign({}, search)); // { food: 'rich', price: '$$', ambiance: 'noisy' }
var search2 = __assign({ food: "rich" }, defaults);
console.log(__assign({}, search2)); // { food: 'spicy', price: '$$', ambiance: 'noisy' }
