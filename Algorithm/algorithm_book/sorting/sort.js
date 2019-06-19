"use strict";
/*

*/
Object.defineProperty(exports, "__esModule", { value: true });
function isBiggerThan(a, b) {
    var paramType = typeof a;
    if (paramType !== 'number' && paramType !== 'string')
        throw Error('비교연산 가능한 타입은 Number와 String만을 대상으로 합니다.');
    return paramType === 'number' ? a > b : String.prototype.charCodeAt.call(a) > String.prototype.charCodeAt.call(b);
}
function bubbleSort(originArr) {
    var arr = originArr.slice();
    function compareReplace(arr, left, right) {
        var leftIdx = left - 1, rightIdx = right - 1, leftEle = arr[leftIdx], rightEle = arr[rightIdx];
        // 왼쪽에 있는 요소와 오른쪽에 있는 요소를 비교해서 왼쪽이 더 크면 두 개를 바꾼다
        if (isBiggerThan(leftEle, rightEle)) {
            arr[leftIdx] = rightEle;
            arr[rightIdx] = leftEle;
        }
    }
    var n = arr.length;
    // O(n)
    for (var j = 1; j <= n; j++) {
        for (var i = n; i > j; i--) {
            compareReplace(arr, i - 1, i);
        }
    }
    return arr;
}
exports.bubbleSort = bubbleSort;
function selectionSort(originArr) {
    var arr = originArr.slice();
    function findMinimumIndex(arr, startIdx) {
        var minimum = arr[startIdx], minIdx = 0;
        for (var i = startIdx + 1; i < arr.length; i++) {
            var temp = arr[i];
            if (minimum > temp) {
                minimum = temp;
                minIdx = i;
            }
        }
        return minIdx;
    }
    // 수열을 선행 탐색하며 최솟값을 찾아서 행의 시작점과 교환
    // 시작점의 위치를 하나 늘린 후 같은 일을 반복
    for (var startIdx = 0; startIdx < arr.length; startIdx++) {
        var minIdx = findMinimumIndex(arr, startIdx), startVal = arr[startIdx], minVal = arr[minIdx];
        // 시작점보다 오른쪽에 최솟값이 있으면 시작점의 값과 최솟값을 교체
        if (minIdx > startIdx) {
            arr[startIdx] = minVal;
            arr[minIdx] = startVal;
        }
    }
    return arr;
}
exports.selectionSort = selectionSort;
// export function insertionSort(arr: number[], )
