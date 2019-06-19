"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
/// <reference path="node.d.ts"/>
var URL = __importStar(require("url"));
var myUrl = URL.parse("http://www.typescriptlang.org");
console.log(myUrl);
