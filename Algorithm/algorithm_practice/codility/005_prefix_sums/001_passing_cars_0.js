const isErrorDebugging = false,
    isFunctionDebugging = false,
    isSolutionDebugging = false;


/* Util 함수 */
const Util = (_ => {

    function missParam() {
        throw Error('You missed param!');
    }

    function validType(p=missParam(), typeAssertionFunc=missParam())  {
        if (!typeAssertionFunc(p)) throw Error(`${p}이 ${typeAssertionFunc} 함수체크를 통과하지 못했습니다.`);
    }

    function validIntRange(p=missParam(), min=missParam(), max=missParam()) {
        validType(p, Number.isInteger);
        if((p < min) || (p > max)) throw Error(`${p}는 ${min} 이상이고 ${max} 이하여야 합니다.`);
    }

    function mustThrow(func) {
        let hasBeenThrown = false;
        try {
            func();
        } catch(e) {
            console.error(e.message);
            hasBeenThrown = true;
            return hasBeenThrown;
        } finally {
            if(!hasBeenThrown) throw `${func}는 에러가 발생해야 합니다.`;
        }
    }

    function mustNotThrow(func) {
        let hasNotBeenThrown = true;
        try {
            func();
        } catch(e) {
            console.error(e.message);
            hasNotBeenThrown = false;
            return hasNotBeenThrown;
        }
        return hasNotBeenThrown;
    }

    function compose(...fns) {
        return function(arg) {
            return fns.reduce((arg, f) => f(arg));
        };
    }

    function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    function fillIntArray(arr, min, max) {
        for (let i = 0; i < arr.length; i++) {
            arr[i] = getRandomInt(min, max);
        }
        return arr;
    }

    return {
        missParam,
        validType,
        validIntRange,
        mustThrow,
        mustNotThrow,
        compose,
        getRandomInt,
        fillIntArray
    };
})();

function findFirstBiggerIdx(arr, smallerEle, startIdx) {
    const arrLength = arr.length;
    for (let i = startIdx; i < arrLength; i++) {
        const ele = arr[i];
        if(ele > smallerEle) return i;
    }
    // return {
    //     matchedEle: -1,
    //     matchedIdx: -1
    // };
    return -1;
}

function sumArr(A) {
    const aLength = A.length,
        sumArr = Array(aLength);

    A.reduceRight((sum, ele, i) => {
        sum += ele;
        sumArr[i] = sum;
        return sum;
    }, 0);
    return sumArr;
}

function solution(A=Util.missParam()) {
    Util.validType(A, Array.isArray);

    const N = A.length;
    Util.validType(N, Number.isInteger);
    Util.validIntRange(N, 1, 100000);

    // const sumArr = Array(N);
    let pairsCount = 0,
        sum = 0;

    for (let i = N-1; i >= 0; i--) {
        const ele = A[i];

        Util.validType(ele, Number.isInteger);
        Util.validIntRange(ele, 0, 1);
        if(ele === 0) {
            pairsCount += sum;
            if(pairsCount > 1000000000) return -1;
        } else {
            sum += ele;
        }
    }

    return pairsCount;
}

isErrorDebugging && (_ => {
    console.assert(Util.mustThrow(solution));
    console.assert(Util.mustThrow(solution.bind(null, [])));
    console.assert(Util.mustNotThrow(solution.bind(null, [1])));
    console.assert(Util.mustThrow(solution.bind(null, [2])));
})();

isFunctionDebugging && (_ => {
    // [0, 3]
    console.assert(findFirstBiggerIdx([1, 3, 4], 0, 0) === 0);
    console.assert(findFirstBiggerIdx([1, 3, 4], 2, 1) === 1);
    // console.assert(findFirstBiggerIdx([2, 4, 5], 1, 2) === 4);
    // console.assert(findFirstBiggerIdx([2, 4, 5], 4, 0) === 4);
    // console.log(sumArr([1, 0, 1, 0, 1, 0, 1, 0, 1]));
})();

isSolutionDebugging && (_ => {
    console.assert(solution([0, 1, 0, 1, 1]) === 5);
    console.assert(solution([1, 1, 1, 1, 1]) === 0);
    console.assert(solution([0, 0, 0, 0, 0]) === 0);
    console.assert(solution([0, 1, 1, 1, 1]) === 4);
    console.assert(solution([1, 1, 1, 1, 0]) === 0);
    console.assert(solution([1, 0, 1, 1, 0]) === 2);
    console.assert(solution([1, 0, 1, 1, 1]) === 3);
    console.assert(solution([1, 0, 1, 0, 1]) === 3);
    console.assert(solution([1, 0, 1, 0, 1, 0, 1, 0, 1]) === 10);
    console.assert(solution([1, 0, 1, 0, 1, 0, 1, 0, 0]) === 6);
    console.assert(solution([1, 0, 1, 0, 1, 0, 1, 0, 0]) === 6);
})();
