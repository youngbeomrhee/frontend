declare function require(moduleName: string): any;

import { ZipCodeValidator as Zip } from "../ZipCodeValidator";

let needZipValidation = true;   // 외부에서 받아온다고 가정

if (needZipValidation) {
    let ZipCodeValidator: typeof Zip = require("../ZipCodeValidator");
    let validator = new ZipCodeValidator();
    if (validator.isAcceptable("...")) { /* ... */ }
    console.log('module loading has succeded');
}