/**
 * Created by KOSTI on 2017-08-30.
 */
// ECMA-262 5판, 15.4.4.21항의 작성 과정
// 참고: http://es5.github.io/#x15.4.4.21
if (!Array.prototype.reduce) {
    Array.prototype.reduce = function(callback /*, initialValue*/) {
        'use strict';
        if (this == null) {
            throw new TypeError('Array.prototype.reduce called on null or undefined');
        }
        if (typeof callback !== 'function') {
            throw new TypeError(callback + ' is not a function');
        }
        var t = Object(this), len = t.length >>> 0, k = 0, value;
        if (arguments.length == 2) {
            value = arguments[1];
        } else {
            while (k < len && !(k in t)) {
                k++;
            }
            if (k >= len) {
                throw new TypeError('Reduce of empty array with no initial value');
            }
            value = t[k++];
        }
        for (; k < len; k++) {
            if (k in t) {
                value = callback(value, t[k], k, t);
            }
        }
        return value;
    };
}

// ECMA-262, 제 5 판, 15.4.4.14의 생산 단계
// 참조 : http://es5.github.io/#x15.4.4.14
if (!Array.prototype.indexOf) {
    Array.prototype.indexOf = function(searchElement, fromIndex) {

        var k;

        // 1. 이 값을 인수로 전달하는 ToObject를 호출 한 결과를
        // o라고합니다.
        if (this == null) {
            throw new TypeError('"this" is null or not defined');
        }

        var o = Object(this);

        // 2. lenValue를 Get 함수를 호출 한 결과로 둡니다.
        // 인수가 "length"인 o의 내부 메소드.
        // 3. len을 ToUint32 (lenValue)로 지정합니다.
        var len = o.length >>> 0;

        // 4. len이 0이면 -1을 반환합니다.
        if (len === 0) {
            return -1;
        }

        // 5.Index에서 인수가 전달 된 경우 n을
        // ToInteger (fromIndex); 그렇지 않으면 n은 0이됩니다.
        var n = fromIndex | 0;

        // 6. If n >= len, return -1.
        if (n >= len) {
            return -1;
        }

        // 7. n> = 0 인 경우 k를 n이라고 합니다.
        // 8. 그렇지 않으면 n <0, k는 len - abs (n)이됩니다.
        // k가 0보다 작은 경우 k를 0으로 만듭니다.
        k = Math.max(n >= 0 ? n : len - Math.abs(n), 0);

        // 9. k <len 인 동안 반복한다.
        while (k < len) {
            // a. Pk를 ToString (k)이라고합시다.
            // 이것은 in 연산자의 LHS 피연산자에 대해 암시 적입니다.
            // b. kPresent를 호출 한 결과라고합시다.
            // Hasproperty 인수에 Pk가있는 o의 내부 메소드.
            //이 단계는 c와 결합 될 수 있습니다.
            // c. kPresent가 참이면
            // i. elementK를 Get을 호출 한 결과로합시다.
            // ToString (k) 인수를 가진 o의 내부 메쏘드.
            // ii. 적용한 결과와 동일하게 봅시다.
            // 엄격한 평등 비교 알고리즘
            // searchElement 및 elementK.
            // iii. 동일하면 k를 반환합니다.
            if (k in o && o[k] === searchElement) {
                return k;
            }
            k++;
        }
        return -1;
    };
}