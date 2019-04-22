"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function binarySearch(arr, searchNum) {
    var newArr = arr.slice(), length = newArr.length, halfIndex = Math.ceil(length / 2) - 1, halfNum = newArr[halfIndex];
    // 종단점 지정
    if (halfIndex < 1) {
        return halfNum === searchNum ? true : false;
    }
    if (halfNum === searchNum) {
        return true;
    }
    else if (searchNum < halfNum) {
        newArr = newArr.slice(0, halfIndex + 1);
    }
    else {
        newArr = newArr.slice(halfIndex + 1);
    }
    return binarySearch(newArr, searchNum);
}
exports.binarySearch = binarySearch;
