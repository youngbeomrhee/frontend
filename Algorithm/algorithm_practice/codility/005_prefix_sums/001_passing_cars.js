const isErrorDebugging = false,
    isFunctionDebugging = false,
    isSolutionDebugging = true;


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

function solution(A=Util.missParam()) {
    Util.validType(A, Array.isArray);

    const N = A.length;
    Util.validType(N, Number.isInteger);
    Util.validIntRange(N, 1, 100000);

    // should return −1 if the number of pairs of passing cars exceeds .
    const Ps = [],
        Qs = [];

    // 전체 순회는 피할 수 없으므로 전체를 순회하면서 유용한 배열로 분리한다
    // P와 Q 각각이 발생한 index를 담고 있는 새로운 배열을 만든다
    A.forEach((ele, i) => {
        Util.validType(ele, Number.isInteger);
        Util.validIntRange(ele, 0, 1);
        if(ele === 0) {
            Ps.push(i);
        } else {
            Qs.push(i);
        }
    });

    /*
        A   [0, 1, 0, 1, 1]
        Ps  [0, 2]
        Qs  [1, 3, 4]
     */
    // Q의 인덱스보다 큰 N의 첫 번째 인덱스를 찾고 전체 길이에서 해당 인덱스를 뺀다
    // 0 ≤ P < Q < N 라는 성질을 이용해서 검색을 시작하는 start index를 직전에 찾은 값을 캐싱한다
    const pLength = Ps.length,
        qLength = Qs.length;

    if(pLength === 0 || qLength === 0) return 0;

    let startIdx = 0,
        pairsCount = 0;
    for (let i = 0; i < pLength; i++) {
        const P = Ps[i],
            firstBiggerIdx = findFirstBiggerIdx(Qs, P, startIdx);

        if(firstBiggerIdx === -1) break;

        pairsCount += qLength - firstBiggerIdx;
        startIdx = firstBiggerIdx + 1;

        if(pairsCount > 1000000000) return -1;
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
    console.assert(solution([1, 0, 1 , 0, 1, 0, 1, 0, 0]) === 6);
    console.assert(solution([1, 0, 1 , 0, 1, 0, 1, 0, 0]) === 6);
})();
