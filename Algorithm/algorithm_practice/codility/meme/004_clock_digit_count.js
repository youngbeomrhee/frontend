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

    function compose(...fns) {
        return function(arg) {
            return fns.reduce((arg, f) => f(arg));
        };
    }

    function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    function fillIntArray(arr, min, max) {
        for (let i = 0; i < arr.length; i++) {
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


function perm(arr) {
    Util.validType(arr, Array.isArray);
    const _permutation = [];

    function _perm(prefix=[], arr=[]) {
        if(arr.length<1) {
            _permutation.push(prefix);
        }

        for(let i=0; i<arr.length; i++) {
            const temp = arr.slice();
            const pick = temp.splice(i, 1);
            _perm(prefix.concat(pick), temp);
        }
    }

    _perm([], arr);
    return _permutation;
}


function solution(A=Util.missParam(), B=Util.missParam(), C=Util.missParam(), D=Util.missParam()) {
    Util.validType(A, Number.isInteger);
    Util.validType(B, Number.isInteger);
    Util.validType(C, Number.isInteger);
    Util.validType(D, Number.isInteger);

    Util.validIntRange(A, 0, 9);
    Util.validIntRange(B, 0, 9);
    Util.validIntRange(C, 0, 9);
    Util.validIntRange(D, 0, 9);

    const arr = [A, B, C, D];
    const permutation = perm(arr);

    const validClockDigits = permutation.reduce((accum, ele) => {
        const hour = ele[0] * 10 + ele[1];
        const minute = ele[2] * 10 + ele[3];
        const digitalFormat = hour + ':' + minute;
        if(hour < 24 && minute < 60 && !accum.includes(digitalFormat)) {
            accum.push(digitalFormat);
        }
        return accum;
    }, []);

    return validClockDigits.length;
}

isErrorDebugging && (_ => {
    Util.mustThrow(solution);
    Util.mustThrow(solution.bind(null, 1, 2));
    Util.mustThrow(solution.bind(null, 1, 2, 0));
    Util.mustNotThrow(solution.bind(null, 1, 2, 0, 1));

    Util.mustThrow(solution.bind(null, 's', 2, 0, 1));
    Util.mustThrow(solution.bind(null, 1, 's', 0, 1));
    Util.mustThrow(solution.bind(null, 1, 2, 's', 1));
    Util.mustThrow(solution.bind(null, 1, 2, 0, 's'));

    Util.mustThrow(solution.bind(null, 10, 2, 0, 1));
    Util.mustThrow(solution.bind(null, 1, 20, 0, 1));
    Util.mustThrow(solution.bind(null, 1, 20, 100, 1));
    Util.mustThrow(solution.bind(null, 1, 20, 1, 10));


    // console.assert(Util.mustThrow(solution));
})();

isSolutionDebugging && (_ => {
    console.assert(solution(1, 8, 3, 2) === 6);
    console.assert(solution(2, 3, 3, 2) === 3);
    console.assert(solution(6, 2, 4, 7) === 0);

})();
