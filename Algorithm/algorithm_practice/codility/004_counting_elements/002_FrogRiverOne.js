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

    return {
        missParam,
        validType,
        validIntRange,
        mustThrow,
        mustNotThrow
    };
})();

function solution(X=Util.missParam(), A=Util.missParam()) {
    Util.validType(X, Number.isInteger);
    Util.validIntRange(X, 1, 100000);
    Util.validType(A, Array.isArray);

    const N = A.length;
    Util.validType(N, Number.isInteger);
    Util.validIntRange(N, 1, 100000);

    const board = [];
    for (let i = 0; i < N; i++) {
        const ele = A[i];
        Util.validIntRange(ele, 1, X);

        board[ele-1] = ele;
        // 아래 조건문의 순서를 바꾸는 것만으로도 성능 차이가 크게 생길 수 있다
        if(board.length === X && !board.includes(undefined)) return i;
    }
    return -1;
}

isErrorDebugging && (_ => {
    console.assert(Util.mustThrow(solution));
    console.assert(Util.mustThrow(solution.bind(null, 1)));
    console.assert(Util.mustThrow(solution.bind(null, 1, 1)));
    console.assert(Util.mustThrow(solution.bind(null, 1, [])));
    console.assert(Util.mustNotThrow(solution.bind(null, 1, [1])));

})();

isSolutionDebugging && (_ => {
    console.assert(solution(5, [1, 3, 1, 4, 2, 3, 5, 4]) === 6);
    console.assert(solution(2, [2, 2, 2, 2, 2]) === -1);
})();