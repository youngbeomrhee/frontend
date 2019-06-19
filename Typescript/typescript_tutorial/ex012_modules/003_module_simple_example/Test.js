"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ZipCodeValidator_1 = require("./ZipCodeValidator");
var LettersOnlyValidator_1 = require("./LettersOnlyValidator");
// 시험용 샘플
var strings = ["Hello", "98052", "101"];
// 사용할 Validators
var validators = {};
validators["ZIP code"] = new ZipCodeValidator_1.ZipCodeValidator();
validators["Letters only"] = new LettersOnlyValidator_1.LettersOnlyValidator();
// 각 문자열이 각 Validator를 통과했는지 여부를 보여줍니다.
strings.forEach(function (s) {
    for (var name_1 in validators) {
        console.log("\"" + s + "\" - " + (validators[name_1].isAcceptable(s) ? "matches" : "does not match") + " " + name_1);
    }
});
