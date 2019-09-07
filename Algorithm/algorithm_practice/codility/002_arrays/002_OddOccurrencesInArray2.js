const isErrorDebugging = true,
    isFunctionDebugging = true;

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
            return fns.reduceRight((arg, f) => f(arg), arg);
        };
    }

    return {
        missParam,
        validType,
        validIntRange,
        mustThrow,
        mustNotThrow,
        compose
    };
})();

/*
each element of array A is an integer within the range [1..1,000,000,000];
all but one of the values in A occur an even number of times.
 */
function isOddNumber(n) {
    Util.validType(n, Number.isInteger);
    return n % 2 === 1;
}

function occurrencyChart(A) {
    return A.reduce((chart, ele) => {
        Util.validType(ele, Number.isInteger);
        Util.validIntRange(ele, 1, 1000000000);

        if(!chart[ele]) {
            chart[ele] = 1;
        } else {
            chart[ele] = chart[ele] + 1;
        }
        return chart;
    }, {});
}

function findOddOccurenceEle(chart) {
    for(let key in chart) {
        const val = chart[key];
        if(isOddNumber(val)) {
            return Number(key);
        }
    }
}

function solution(A) {
    // 입력값 검증
    Util.validType(A, Array.isArray);
    const aLength = A.length;
    Util.validIntRange(aLength, 1, 1000000);
    if(!isOddNumber(aLength)) throw 'There is no odd occurreny in Array';

    const oddOccurrenceEle = Util.compose(
        findOddOccurenceEle,
        occurrencyChart
    )(A);
    return oddOccurrenceEle;
}

isFunctionDebugging && (() => {
    console.assert(isOddNumber(0) === false);
    console.assert(isOddNumber(1) === true);
    console.assert(isOddNumber(2) === false);
    console.assert(isOddNumber(1000) === false);
    console.assert(isOddNumber(-1000) === false);
    console.assert(isOddNumber(-1982374682) === false);
    console.assert(isOddNumber(1982374683) === true);

    console.assert(JSON.stringify(occurrencyChart([1, 1])) === JSON.stringify({'1':2}));
    console.assert(JSON.stringify(occurrencyChart([1, 3, 1])) === JSON.stringify({1:2,3:1}));

    console.assert(findOddOccurenceEle({1:2,3:1}) === 3);

    console.assert(solution([1, 3, 1]) === 3);
    console.assert(solution([1, 3, 1]) === 3);
    console.assert(solution([9, 3, 9, 3, 9, 7, 9]) === 7);


})();


