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
    Util.validIntRange(N, 1, 100000);

    /*
    each element of array A is an integer within the range [1..1,000,000,000].
     */
    // A를 전체 순회하면서 각각의 값을 새로운 배열 perm에 해당값-1의 index에 담는다
    const perm = [];
    for (let i = 0; i < A.length; i++) {
        const ele = A[i];
        Util.validType(ele, Number.isInteger);
        Util.validIntRange(ele, 1, 1000000000);
        if(perm[ele-1]) return 0;
        perm[ele-1] = ele;
    }

    // A 순회가 끝나면 perm에 빈 요소가 있는지 체크한다
    const isMissing = perm.includes(undefined);

    return isMissing ? 0 : 1;
}

isErrorDebugging && (_ => {
    console.assert(Util.mustThrow(solution));
    console.assert(Util.mustThrow(solution.bind(null, [])));
    console.assert(Util.mustNotThrow(solution.bind(null, [1])));
    console.assert(Util.mustThrow(solution.bind(null, Array(100001))));
})();

isSolutionDebugging && (_ => {
    console.assert(solution([4, 1, 3, 2]) === 1);
    console.assert(solution([4, 1, 3]) === 0);
    console.assert(solution([1, 1, 3, 2]) === 0);
})();