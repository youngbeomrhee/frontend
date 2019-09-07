/*
A binary gap within a positive integer N is any maximal sequence of consecutive zeros that is surrounded by ones at both ends in the binary representation of N.

For example, number 9 has binary representation 1001 and contains a binary gap of length 2. The number 529 has binary representation 1000010001 and contains two binary gaps: one of length 4 and one of length 3. The number 20 has binary representation 10100 and contains one binary gap of length 1. The number 15 has binary representation 1111 and has no binary gaps. The number 32 has binary representation 100000 and has no binary gaps.

Write a function:

function solution(N);

that, given a positive integer N, returns the length of its longest binary gap. The function should return 0 if N doesn't contain a binary gap.

For example, given N = 1041 the function should return 5, because N has binary representation 10000010001 and so its longest binary gap is of length 5. Given N = 32 the function should return 0, because N has binary representation '100000' and thus no binary gaps.

Write an efficient algorithm for the following assumptions:

N is an integer within the range [1..2,147,483,647].

Copyright 2009–2019 by Codility Limited. All Rights Reserved. Unauthorized copying, publication or disclosure prohibited.
 */

// you can write to stdout for debugging purposes, e.g.
// console.log('this is a debug message');
const isDebugging = true;

const ybUtil = (() => {

    function isSameType(a, b) {
        // null과 undefined에 대한 처리
        if(a === null || b === null || a === undefined || b === undefined) {
            return a === b;
        } else {    // Null과 Undefined를 제외한 나머지 type은 constructor로 비교
            return a.constructor === b.constructor;
        }
    }

    function mustThrowError(func, ...args) {
        let testErr;
        try {
            func.apply(null, args);
        } catch(e) {
            testErr = e;
        } finally {
            if(testErr) {
                return testErr;
            } else {
                throw Error('mustThrowError 함수가 Error를 발생시키지 않았습니다');
            }
        }
    }

    function shouldError(func, ...args) {
        console.assert(isSameType(Error, mustThrowError(func, ...args)));
    }

    return {
        isSameType,
        mustThrowError,
        shouldError
    };
})();

const ybUtilTest = ((ybUtil, isDebugging) => {
    // 각각의 테스트 함수는 Error 객체의 리스트를 리턴하도록 설계
    const funcs = [
        function isSameTypeTest () {
            const data = [true, null, undefined, Math.random(), 'str1', {a: 1}, [1, 2, 3]],
                data2 = [false, null, undefined, -Math.random(), 'str2', {b: 2}, [{}, [], false]],
                errors = [];

            if(Symbol) {
                data.push(Symbol('v'));
                data2.push(Symbol('x'));
            }
            if(Map) {
                data.push(new Map([['k', 'v'], ['k2', 'v2'], ['k3', 'v3']]));
                data2.push(new Map([[], ['k', 'v']]));
            }
            if(Set) {
                data.push(new Set([1, 6, 9]));
                data2.push(new Set([2, {}, []]));
            }

            data.forEach((d1, idx1) => {
                data2.forEach((d2, idx2) => {
                    const isSameTypeFlag = idx1 === idx2;
                    try {
                        console.assert(ybUtil.isSameType(d1, d2) === isSameTypeFlag);
                    } catch(e) {
                        errors.push(e);
                    }
                });
            });

            if(errors.length > 0) {
                return errors;
            }
        },
        function mustThrowErrorTest () {   // 에러가 나는지 테스트
            const mustBeError = ybUtil.mustThrowError((() => { throw Error('must throw error'); }));
            if(!ybUtil.isSameType(Error(), mustBeError)) { return [ Error('mustThrowError 함수가 Error를 발생시키지 않았습니다.') ]; }
        }
    ];

    if(isDebugging) {
        const errors = funcs.reduce((errs, func) => {
            const results = func();
            if(Array.isArray(results)) {
                errs = errs.concat(results);
            }
            return errs;
        }, []);
        if(Array.isArray(errors) && errors.length > 0) {
            console.error(errors);
        }
    }

})(ybUtil, isDebugging);

function solution(N) {
    if(!Number.isInteger(N) || N < 1 || N > 2147483647) throw Error('입력값은 1..2,147,483,647의 정수만 가능합니다');

}


((ybUtil, isDebugging) => {
    const funcs = [
        function rangeTest() {
            const outOfRangeParams = ['str', true, {}, [5, 2, 4]];
            // outOfRangeParams.push(3);
            outOfRangeParams.forEach((ele) => {
                ybUtil.mustThrowError(solution, ele);
            });
            // ybUtil.mustThrowError(solution, 1);
        }
    ];
    if(isDebugging) {
        const errors = funcs.reduce((errs, func) => {
            return errs.concat(func());
        }, []);
        if(Array.isArray(errors) && errors.length > 0) {
            console.error(errors);
        }
    }
})(ybUtil, isDebugging);
