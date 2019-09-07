const isErrorDebugging = false,
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

    return {
        missParam,
        validType,
        validIntRange,
        mustThrow,
        mustNotThrow,
    };
})();


function solution(A=Util.missParam(), K=Util.missParam()) {
    // write your code in JavaScript (Node.js 8.9.4)
    Util.validType(A, Array.isArray);
    const N = A.length;
    Util.validIntRange(N, 0, 100);

    Util.validType(K, Number.isInteger);
    Util.validIntRange(K, 0, 100);

    // 핵심은 index의 변경 -> 시작점을 다르게 하는 새로운 배열 생성
    K = K % N;
    const shiftedArr = [],
        stIdx =  N - K;

    for (let i = stIdx; i < N; i++) {
        shiftedArr.push(A[i]);
    }
    for (let i = 0; i < stIdx; i++) {
        shiftedArr.push(A[i]);
    }
    // console.dir(shiftedArr);
    return shiftedArr;
}

isErrorDebugging && (_ => {
    console.assert(Util.mustThrow(solution));
    console.assert(Util.mustThrow(solution.bind(null, 0)));
    console.assert(Util.mustNotThrow(solution.bind(null, [], 0)));
    console.assert(Util.mustThrow(solution.bind(null, Array(101), 0)));
    console.assert(Util.mustThrow(solution.bind(null, [], 102)));
})();

isSolutionDebugging && (_ => {
    console.assert(JSON.stringify(solution([1,2,3], 0)), JSON.stringify([1,2,3]));
    console.assert(JSON.stringify(solution([1,2,3], 1)), JSON.stringify([3,1,2]));
    console.assert(JSON.stringify(solution([1,2,3], 2)), JSON.stringify([2,3,1]));
    console.assert(JSON.stringify(solution([1,2,3], 3)), JSON.stringify([1,2,3]));
    console.assert(JSON.stringify(solution([1,2,3], 4)), JSON.stringify([3,1,2]));
})();

