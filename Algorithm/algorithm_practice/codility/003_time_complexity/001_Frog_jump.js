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

/*
    X: 시작점
    Y: 결승점
    D: 한 번에 뛸 수 있는 거리
    return : X에서 Y까지 갈 때 필요한 최소 이동횟수
 */
function solution(X=Util.missParam, Y=Util.missParam, D=Util.missParam) {
    Util.validType(X, Number.isInteger);
    Util.validType(Y, Number.isInteger);
    Util.validType(D, Number.isInteger);
    Util.validIntRange(X, 1, 1000000000);
    Util.validIntRange(Y, 1, 1000000000);
    Util.validIntRange(D, 1, 1000000000);
    if(X>Y) throw 'X값은 Y보다 작거나 같아야 합니다.';

    const distance = Y - X,
        minimumJump = Math.ceil(distance / D);

    return minimumJump;
}


isErrorDebugging && (_ => {
})();

isSolutionDebugging && (_ => {
    console.assert(solution(10, 85, 30) === 3);
})();

