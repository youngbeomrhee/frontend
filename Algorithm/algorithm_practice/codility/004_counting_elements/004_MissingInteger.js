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

    function compose(...fns) {
        return function(arg) {
            return fns.reduce((arg, f) => f(arg));
        };
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
        compose,
        getRandomInt,
        fillIntArray
    };
})();

function solution(A=Util.missParam()) {
    Util.validType(A, Array.isArray);

    const N = A.length;
    Util.validType(N, Number.isInteger);
    Util.validIntRange(N, 1, 100000);

    const positiveInt = A.reduce((chart, ele) => {
        Util.validType(ele, Number.isInteger);
        Util.validIntRange(ele, -1000000, 1000000);
        if(ele>0) {
            chart[ele-1] = ele;
        }
        return chart;
    }, []);

    const positiveIntLen = positiveInt.length;

    if(!positiveInt.includes(undefined)) return positiveIntLen + 1;

    let missingInteger;
    for(let i=0; i<positiveInt.length; i++) {
        if(!positiveInt[i]) {
            missingInteger = i+1;
            break;
        }
    }

    return missingInteger || 1;
}

isErrorDebugging && (_ => {
    console.assert(Util.mustThrow(solution));
    console.assert(Util.mustThrow(solution.bind(null, [])));
    console.assert(Util.mustThrow(solution.bind(null, Array(100001))));
})();

isSolutionDebugging && (_ => {
    const A = Util.fillIntArray(Util.getRandomInt(1, 100000), -1000000, 1000000);

    console.assert(solution([1, 3, 6, 4, 1, 2]) === 5);
    console.assert(solution([1, 2, 3]) === 4);
    console.assert(solution([-1, -2]) === 1);
})();