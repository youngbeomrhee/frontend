const isErrorDebugging = false,
    isFunctionDebugging = false;

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

function integerToBinary(num=Util.missParam()) {
    Util.validType(num, Number.isInteger);
    return num.toString(2);
}


function binaryGap(numStr=Util.missParam()) {
    Util.validType(numStr, ((str) => typeof str === 'string').bind(null, numStr));
    const ones = numStr.match(/1/g);
    if(!Array.isArray(ones) || ones.length < 2) return 0;

    numStr = numStr.substr(0, numStr.lastIndexOf('1') + 1); // 1과 1사이의 값이 중요하므로 마지막 1까지로 문장을 자른다

    const gaps = numStr.split('1'),
        maxGap = gaps.reduce((max, gap) => gap.length > max ? gap.length : max, 0);
    return maxGap;
}

function solution(N=Util.missParam()) {
    Util.validType(N, Number.isInteger);
    Util.validIntRange(N, 1, 2147483647);
    const maxGap = Util.compose(
        binaryGap,
        integerToBinary
    )(N);
    return maxGap;
}

isErrorDebugging && (_=>{
    console.assert(Util.mustThrow(solution));
    console.assert(Util.mustThrow(solution.bind(null, '')));
    console.assert(Util.mustThrow(solution.bind(null, {})));
    console.assert(Util.mustThrow(solution.bind(null, [])));
    console.assert(Util.mustThrow(solution.bind(null, true)));
    console.assert(Util.mustThrow(solution.bind(null, 0)));
    console.assert(Util.mustNotThrow(solution.bind(null, 1)));
    console.assert(Util.mustNotThrow(solution.bind(null, 1000000)));
    console.assert(Util.mustNotThrow(solution.bind(null, 100000000)));
    console.assert(Util.mustThrow(solution.bind(null, 10000000000)));

    console.assert(Util.mustThrow(binaryGap));
    console.assert(Util.mustThrow(binaryGap.bind(null, 0)));
    console.assert(Util.mustThrow(binaryGap.bind(null, 0)));
})();

isFunctionDebugging && (_ => {
    console.assert(integerToBinary(9) === '1001');
    console.assert(integerToBinary(529) === '1000010001');
    console.assert(integerToBinary(20) === '10100');
    console.assert(integerToBinary(15) === '1111');
    console.assert(integerToBinary(32) === '100000');

    console.assert(binaryGap('1001') === 2);
    console.assert(binaryGap('1000010001') === 4);
    console.assert(binaryGap('10100') === 1);
    console.assert(binaryGap('1111') === 0);
    console.assert(binaryGap('100000') === 0);

    console.assert(solution(9) === 2);
    console.assert(solution(529) === 4);
    console.assert(solution(20) === 1);
    console.assert(solution(15) === 0);
    console.assert(solution(32) === 0);
})();