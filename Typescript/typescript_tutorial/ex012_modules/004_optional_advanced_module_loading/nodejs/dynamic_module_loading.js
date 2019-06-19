"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var needZipValidation = true; // 외부에서 받아온다고 가정
if (needZipValidation) {
    var ZipCodeValidator = require("../ZipCodeValidator");
    var validator = new ZipCodeValidator();
    if (validator.isAcceptable("...")) { /* ... */ }
    console.log('module loading has succeded');
}
