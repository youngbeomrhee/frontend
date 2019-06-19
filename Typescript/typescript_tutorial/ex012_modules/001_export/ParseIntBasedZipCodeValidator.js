"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ParseIntBasedZipCodeValidator = /** @class */ (function () {
    function ParseIntBasedZipCodeValidator() {
    }
    ParseIntBasedZipCodeValidator.prototype.isAcceptable = function (s) {
        return s.length === 5 && parseInt(s).toString() === s;
    };
    return ParseIntBasedZipCodeValidator;
}());
exports.ParseIntBasedZipCodeValidator = ParseIntBasedZipCodeValidator;
// Export original validator but rename it
var ZipCodeValidator_1 = require("./ZipCodeValidator");
exports.RegExpBasedZipCodeValidator = ZipCodeValidator_1.ZipCodeValidator;
