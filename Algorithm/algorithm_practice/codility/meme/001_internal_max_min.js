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

function checkIsInternalRowMax(arr, i, j) {
    const prevC = arr[i-1][j],
        ele = arr[i][j],
        nextC = arr[i+1][j];
    return ele > prevC && ele > nextC;
}

function checkIsInternalRowMin(arr, i, j) {
    const prevC = arr[i-1][j],
        ele = arr[i][j],
        nextC = arr[i+1][j];
    return ele < prevC && ele < nextC;
}

function solution(A=Util.missParam()) {
    // N : row, M : column 1이상 500이하
    // ele : −2,147,483,648 이상 2,147,483,647 이하
    Util.validType(A, Array.isArray);

    const N = A.length;
    Util.validType(N, Number.isInteger);
    Util.validIntRange(N, 1, 500);

    let settleCount = 0;

    for (let i = 1; i < N - 1; i++) {
        const B = A[i],
            M = B.length;

        Util.validType(B, Array.isArray);
        Util.validType(M, Number.isInteger);
        Util.validIntRange(M, 1, 500);

        for (let j = 1; j < M - 1; j++) {
            const prevR = B[j - 1],
                ele = B[j],
                nextR = B[j + 1];
            Util.validType(prevR, Number.isInteger);
            Util.validIntRange(prevR, -2147483648, 2147483647);
            if(ele < prevR && ele < nextR) {
                const isInternalRowMax = checkIsInternalRowMax(A, i, j);
                if(isInternalRowMax) { settleCount++; }
            } else if(ele > prevR && ele > nextR) {
                const isInternalRowMin = checkIsInternalRowMin(A, i, j);
                if(isInternalRowMin) { settleCount++; }
            }
        }
    }
    return settleCount;
}

isErrorDebugging && (_ => {
    console.assert(Util.mustThrow(solution));
    console.assert(Util.mustThrow(solution.bind(null, [])));
    console.assert(Util.mustNotThrow(solution.bind(null, [1])));
    console.assert(Util.mustNotThrow(solution.bind(null, Array(500))));
    console.assert(Util.mustThrow(solution.bind(null, Array(501))));
})();

isSolutionDebugging && (_ => {
    const A = [
	    [0, 1, 9, 3],
	    [7, 5, 8, 3],
	    [9, 2, 9, 4],
	    [4, 6, 7, 1]
    ]
    console.assert(solution(A) === 2);
})();