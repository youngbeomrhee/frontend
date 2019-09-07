const isErrorDebugging = false,
    isFunctionDebugging = false,
    isSolutionDebugging = true;

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

function integerToBinary(num=Util.missParam()) {
    Util.validType(num, Number.isInteger);
    return num.toString(2);
}

function countMatchedChar(str=Util.missParam(), matchChar=Util.missParam()) {
    Util.validType(str, (ele) => typeof ele === 'string');
    Util.validType(matchChar, (ele) => typeof ele === 'string');
    const reg = new RegExp(matchChar, "g"),
        matched = str.match(reg);
    return matched ? matched.length : 0;
}

function solution(A=Util.missParam(), B=Util.missParam()) {
    Util.validType(A, Number.isInteger);
    Util.validType(B, Number.isInteger);
    Util.validIntRange(A, 0, 100000000);
    Util.validIntRange(B, 0, 100000000);

    // 곱한 후 1의 갯수 카운팅
    const m = A * B,
        binaryM = integerToBinary(m),
        matchedCount = countMatchedChar(binaryM, '1');

    return matchedCount;
}


isErrorDebugging && (_ => {
    console.assert(Util.mustThrow(solution));
    console.assert(Util.mustThrow(solution.bind(null, 1)));
    console.assert(Util.mustNotThrow(solution.bind(null, 1, 1)));
    console.assert(Util.mustThrow(solution.bind(null, 's', 1)));
    console.assert(Util.mustThrow(solution.bind(null, 1, 's')));
    console.assert(Util.mustNotThrow(solution.bind(null, 1, 2)));
    console.assert(Util.mustThrow(solution.bind(null, -1, 2)));
    console.assert(Util.mustThrow(solution.bind(null, 2, -2)));
    console.assert(Util.mustThrow(solution.bind(null, -2, -2)));
    console.assert(Util.mustThrow(solution.bind(null, -2, 1)));
    console.assert(Util.mustThrow(solution.bind(null, 2, 100000003)));
    console.assert(Util.mustThrow(solution.bind(null, 1000000023, 100000003)));
    console.assert(Util.mustNotThrow(solution.bind(null, 5, 2)));
    console.assert(Util.mustNotThrow(solution.bind(null, 0, 0)));
    console.assert(Util.mustNotThrow(solution.bind(null, 0, 100000000)));
    console.assert(Util.mustNotThrow(solution.bind(null, 100000000, 100000000)));

    console.assert(Util.mustThrow(countMatchedChar.bind(null, 0)));
    console.assert(Util.mustThrow(countMatchedChar.bind(null, 'ss')));
    console.assert(Util.mustNotThrow(countMatchedChar.bind(null, 'ss', 'ss')));
})();

isFunctionDebugging && (_ => {
    console.assert(integerToBinary(3) === '11');
    console.assert(integerToBinary(7) === '111');
    console.assert(integerToBinary(21) === '10101');
    console.assert(integerToBinary(21) === '10101');
    console.assert(integerToBinary(100000000-1) === '101111101011110000011111111');

    console.assert(countMatchedChar('1010111', '1') === 5);
    console.assert(countMatchedChar('1011111', '1') === 6);
    console.assert(countMatchedChar('1111111', '1') === 7);
    console.assert(countMatchedChar('0000', '1') === 0);
    console.assert(countMatchedChar('10101110', '5') === 0);
    console.assert(countMatchedChar('10101110', '5') === 0);

})();

isSolutionDebugging && (_ => {
    console.assert(solution(3, 7) === 3);
    console.assert(solution(99999999, 99999999) === 25);
    console.assert(solution(100000000, 100000000) === 25);
    // console.assert(solution(3, 7) === 3);
})();