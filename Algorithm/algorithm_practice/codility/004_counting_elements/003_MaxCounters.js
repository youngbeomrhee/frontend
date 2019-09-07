const isErrorDebugging = false,
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

    return {
        missParam,
        validType,
        validIntRange,
        mustThrow,
        mustNotThrow
    };
})();

function fillCounter(arr, N, counter) {
    const lastArrLength = arr.length;
    for (let i = 0; i < lastArrLength; i++) {
        const ele = arr[i];
        Util.validType(ele, Number.isInteger);
        Util.validIntRange(ele, 1, N + 1);
        if (ele <= N) {
            counter[ele - 1] = counter[ele - 1] + 1;
        } else {
            const max = counter.reduce((p, n) => p < n ? n : p);
            counter = counter.fill(max);
        }
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

    let counter = Array(N).fill(0);
    counter = fillCounter(A, N, counter);

    return counter;
}

isErrorDebugging && (_ => {
    console.assert(Util.mustThrow(solution));
    console.assert(Util.mustThrow(solution.bind(null, 1)));
    console.assert(Util.mustThrow(solution.bind(null, 1, [])));
    console.assert(Util.mustNotThrow(solution.bind(null, 1, [1])));
})();

isSolutionDebugging && (_ => {
    console.assert(JSON.stringify(solution(5, [3, 4, 4, 6, 1, 4, 4])) === JSON.stringify([3, 2, 2, 4, 2]));
    console.assert(JSON.stringify(solution(5, [3, 4, 4, 6, 1, 4, 4, 6, 1, 4, 4])) === JSON.stringify([5, 4, 4, 6, 4]));
    console.assert(JSON.stringify(solution(5, [6, 6, 6, 6, 6, 6, 6])) === JSON.stringify([0, 0, 0, 0, 0]));
})();