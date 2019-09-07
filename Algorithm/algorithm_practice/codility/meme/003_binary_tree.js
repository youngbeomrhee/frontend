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
        mustNotThrow
    };
})();

function deepBinarySearch(T, chart) {
    console.log(T);
    // Object.keys(Object.assign({1: true, 2: true}, {1: true, 3: true})).length
    const val = T.x,
        obj = {};

    obj[val] = true;
    Object.assign(chart, obj);
    if(T.l) { deepBinarySearch(T.l, chart); }
    if(T.r) { deepBinarySearch(T.r, chart); }

    return chart;
}

/*
// 테스트에 사용되는 입력값이 유효하지 않습니다. 확인 바랍니다.
 */
function solution(T=Util.missParam()) {
    let n = 0;

    console.log(T);
    const chart = deepBinarySearch(T);

    return Object.keys(chart).length;
}

isErrorDebugging && (_ => {
    // console.assert(Util.mustThrow(solution));
})();

isSolutionDebugging && (_ => {
    // console.assert(solution(4, (5, (4, (5, null, null), null), null), (6, (1, null, null), (6, null, null))) === 3);
})();