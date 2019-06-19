"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var needZipValidation = true; // 외부에 의존한다고 가정
if (needZipValidation) {
    require(["../ZipCodeValidator"], function (ZipCodeValidator) {
        var validator = new ZipCodeValidator.ZipCodeValidator();
        if (validator.isAcceptable("...")) { /* ... */ }
    });
}
