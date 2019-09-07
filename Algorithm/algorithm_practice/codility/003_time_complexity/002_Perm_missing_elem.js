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


function solution(A=Util.missParam()) {
    Util.validType(A, Array.isArray);
    const N = A.length;
    if(N < 1) return 1;
    if(N === 1) {
        return A[0] === 1 ? 2 : 1;
    }
    Util.validIntRange(N, 0, 100000);
    const board = Array(N);

    A.forEach(ele => {
        Util.validType(ele, Number.isInteger);
        Util.validIntRange(ele, 1, N + 1);
        board[ele-1] = ele;
    });

    console.log(board);
    let result = -1;
    for (let i = 0; i < board.length; i++) {
        if(!board[i]) {
            result = i+1;
            break;
        }

    }

    return result !== -1 ? result : N + 1;
}

isErrorDebugging && (_ => {
    console.assert(Util.mustThrow(solution));
    console.assert(Util.mustThrow(solution.bind(null, 1)));
})();

isSolutionDebugging && (_ => {
    console.assert(solution([]) === 1);
    console.assert(solution([1]) === 2);
    console.assert(solution([2, 3, 1, 5]) === 4);
    console.assert(solution([2, 3, 4, 5]) === 1);
    console.assert(solution([1, 2, 3, 4]) === 5);
})();


