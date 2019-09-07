const isErrorDebugging = true,
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

    function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    function fillIntArray(length, min, max) {
        const arr = Array(length);
        for (let i = 0; i < length; i++) {
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
        getRandomInt,
        fillIntArray
    };
})();


function findIndices(arr, ele) {
    Util.validType(arr, Array.isArray);
    const indices = [];
    let idx = arr.indexOf(ele);
    while (idx > -1) {
        indices.push(idx);
        idx = arr.indexOf(ele, idx + 1);
    }
    return indices;
}

function sliceArrWith(arr, separator) {
    const indices = findIndices(arr, separator),
        indicesLength = indices.length,
        splitedArr = [];

    // 구분할 값이 없는 경우
    if(indicesLength === 0) {
        return [arr];
    }

    splitedArr.push(arr.slice(0, indices[0]));
    splitedArr.push(arr[indices[0]]);

    for (let i = 1; i < indicesLength; i++) {
        splitedArr.push(arr.slice(indices[i-1], indices[i]));
        splitedArr.push(arr[indices[i]]);
    }

    // 마지막 index 이후를 배열에 담기
    splitedArr.push(arr.slice(indices[indicesLength-1]+1));

    return splitedArr;
}

function getMaxCounter(count) {
    Util.validType(count, Array.isArray);
    return count.reduce((p, n) => n > p ? n : p);
}

function fillCounter(arr, counter) {
    const n = arr.length;
    for (let i = 0; i < n; i++) {
        const ele = arr[i];
        Util.validType(ele, Number.isInteger);

        counter[ele - 1] = counter[ele - 1] + 1;
    }
    return counter;
}

function solution(N=Util.missParam(), A=Util.missParam()) {
    Util.validType(N, Number.isInteger);
    Util.validIntRange(N, 1, 100000);

    Util.validType(A, Array.isArray);
    const M = A.length;
    Util.validType(M, Number.isInteger);
    Util.validIntRange(M, 1, 100000);

    const maxCount = N+1,
        slicedArr = sliceArrWith(A, maxCount),
        splitedArrLength = slicedArr.length;

    let counter = Array(N).fill(0);

    for (let i = 0; i < splitedArrLength; i++) {
        const ele = slicedArr[i];

        if(ele === maxCount) {
            const max = getMaxCounter(counter);
            counter = Array(N).fill(max);
        } else {
            fillCounter(ele, counter);
        }
    }

    return counter;
}

isErrorDebugging && (_ => {
    console.assert(Util.mustThrow(solution));
    console.assert(Util.mustThrow(solution.bind(null, 1)));
    console.assert(Util.mustThrow(solution.bind(null, 1, [])));
    console.assert(Util.mustNotThrow(solution.bind(null, 1, [1])));
})();

isSolutionDebugging && (_ => {
    console.assert(JSON.stringify(solution(5, [3, 4, 4, 1, 4, 4])) === JSON.stringify([1, 0, 1, 4, 0]));
    console.assert(JSON.stringify(solution(5, [3, 4, 4, 6, 1, 4, 4])) === JSON.stringify([3, 2, 2, 4, 2]));
    console.assert(JSON.stringify(solution(5, [3, 4, 4, 6, 1, 4, 4, 6, 1, 4, 4])) === JSON.stringify([5, 4, 4, 6, 4]));
    console.assert(JSON.stringify(solution(5, [3, 4, 4, 1, 4, 4, 1, 4, 4])) === JSON.stringify([2, 0, 1, 6, 0]));
    console.assert(JSON.stringify(solution(5, [6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6])) === JSON.stringify([0, 0, 0, 0, 0]));

    let N = Util.getRandomInt(1, 100000), // 카운터의 갯수
        M = Util.getRandomInt(1, 100000),   // 배열의 크기
        A = Util.fillIntArray(Array(M), 1, N+1);

    // TODO : 오류 확인 후 수정 필요
    // N = 10;
    // M = 100;
    // A = Util.fillIntArray(Array(M), 1, N+1);
    console.log(N, M);
    console.log(A);
    const answer = solution(N, A);
    console.dir(answer);
})();