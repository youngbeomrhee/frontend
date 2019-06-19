"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var search_1 = require("./search");
// 종단점 테스트 (값이 없는 경우)
(function () {
    console.debug('\n종단점 테스트 1: 값이 없는 경우');
    var arr = [1, 2, 3, 4, 5];
    var endFlag = false;
    if (search_1.binarySearch(arr, 7) === true || search_1.binarySearch(arr, 7) === false) {
        endFlag = true;
    }
    ;
    setTimeout(function () {
        if (!endFlag) {
            throw Error('종단점이 제대로 설정되지 않았습니다');
        }
        else {
            console.debug('종단점이 제대로 설정됐습니다.');
        }
    }, 1000);
})();
// 종단점 테스트 (값이 없는 경우2)
(function () {
    console.debug('\n종단점 테스트 2: 값이 없는 경우');
    var arr = [1, 2, 3, 4, 5];
    var endFlag = false;
    if (search_1.binarySearch(arr, 7) === true || search_1.binarySearch(arr, 7) === false) {
        endFlag = true;
    }
    ;
    setTimeout(function () {
        if (!endFlag) {
            throw Error('종단점이 제대로 설정되지 않았습니다');
        }
        else {
            console.debug('종단점이 제대로 설정됐습니다.');
        }
    }, 1000);
})();
// 종단점 테스트 (값이 있는 경우1)
(function () {
    console.debug('\n종단점 테스트 1: 값이 있는 경우');
    var arr = [1, 2, 3, 4, 5];
    var endFlag = false;
    if (search_1.binarySearch(arr, 7) === true || search_1.binarySearch(arr, 7) === false) {
        endFlag = true;
    }
    ;
    setTimeout(function () {
        if (!endFlag) {
            throw Error('종단점이 제대로 설정되지 않았습니다');
        }
        else {
            console.debug('종단점이 제대로 설정됐습니다.');
        }
    }, 1000);
})();
// 종단점 테스트 (값이 있는 경우2)
(function () {
    console.debug('\n종단점 테스트 2: 값이 있는 경우');
    var arr = [1, 2, 3, 4, 5];
    var endFlag = false;
    if (search_1.binarySearch(arr, 7) === true || search_1.binarySearch(arr, 7) === false) {
        endFlag = true;
    }
    ;
    setTimeout(function () {
        if (!endFlag) {
            throw Error('종단점이 제대로 설정되지 않았습니다');
        }
        else {
            console.debug('종단점이 제대로 설정됐습니다.');
        }
    }, 1000);
})();
var arr = [1, 5, 8, 9, 11, 13, 15, 19, 21];
// 값이 있는 경우에 대한 테스트
console.assert(search_1.binarySearch(arr, 9) === true);
console.assert(search_1.binarySearch([1, 2, 3, 4, 5], 2) === true);
// 값이 없는 경우에 대한 테스트
console.assert(search_1.binarySearch([1, 2, 3, 4, 5], -1) === false);
console.assert(search_1.binarySearch([1, 2, 3, 4, 5], 100) === false);
