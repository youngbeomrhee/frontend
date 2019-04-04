declare function require(moduleNames: string[], onLoad: (...args: any[]) => void): void;

import * as Zip from "../ZipCodeValidator";

let needZipValidation = true;   // 외부에 의존한다고 가정

if (needZipValidation) {
    require(["../ZipCodeValidator"], (ZipCodeValidator: typeof Zip) => {
        let validator = new ZipCodeValidator.ZipCodeValidator();
        if (validator.isAcceptable("...")) { /* ... */ }
    });
}