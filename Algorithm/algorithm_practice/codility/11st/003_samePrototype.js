
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


class GenT {
    constructor(num) {
        this.num = num;
    }
    value() {
        return this.num;
    }
};

function testT(A, T) {
    const tLen = T.length;
    let prevProto;

    for (let i = 0, j = 1; i < tLen; i++) {

        const isTrue = T[i].value === A[i] && ;

    }
}

function solution(A=Util.missParam()) {
    Util.validType(A, Array.isArray);
    const N = A.length;
    Util.validType(N, Number.isInteger);
    Util.validIntRange(N, 1, 200);
    const T = [];

    // −9,007,199,254,740,991 ~ 9,007,199,254,740,991 사이 값만 유효
    // value의 결과가 자신의 값과 같아야 한다
    // A의 모든 요소에 대해 value 메서드가 같은 참조값을 바라봐야 한다.
    // value 메서드가 자신의 propery가 아니라 prototype에 있어야 한다.
    for (let i = 0; i < A.length; i++) {
        const num = A[i];
        Util.validType(num, Number.isInteger);
        Util.validIntRange(num, -9007199254740991, 9007199254740991);

        T.push(new GenT(num));
    }

    return T;
}


isErrorDebugging && (_ => {
    console.assert(Util.mustThrow(solution));
    console.assert(Util.mustThrow(solution.bind(null, 1)));
    console.assert(Util.mustThrow(solution.bind(null, [])));
    console.assert(Util.mustNotThrow(solution.bind(null, [1])));
    console.assert(Util.mustThrow(solution.bind(null, Array(201))));
})();

isSolutionDebugging && (_ => {

    const A = Util.fillIntArray(Array(100), -9007199254740991, 9007199254740991),
        T = solution(A);
    // testT(A, T);

})();




