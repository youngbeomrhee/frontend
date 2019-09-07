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


function getFiboArr(arr = Util.missParam(), validEle) {
    Util.validType(arr, Array.isArray);
    const fibo = [];
    fibo[0] = validEle(arr[0]);
    for (let i = 1; i < arr.length; i++) {
        const sum = fibo[i-1] + validEle(arr[i]);
        fibo[i] = sum;
    }
    return fibo;
}


function getFiboReverseArr(arr = Util.missParam(), validEle) {
    Util.validType(arr, Array.isArray);
    const fibo = [], n = arr.length;
    fibo[0] = validEle(arr[n-1]);
    for (let i = n-1; i > 0; i--) {
        const rIdx = n - i;
        const sum = fibo[rIdx-1] + validEle(arr[i-1]);
        fibo[rIdx] = sum;
    }
    return fibo;
}

function solution(A=Util.missParam()) {
    Util.validType(A, Array.isArray);
    const N = A.length;
    Util.validType(N, Number.isInteger);
    Util.validIntRange(N, 2, 100000);

    const valieEle = ele => {
            Util.validType(ele, Number.isInteger);
            Util.validIntRange(ele, -1000, 1000);
            return ele;
        },
        fiboArr = getFiboArr(A, valieEle),
        fiboReverseArr = getFiboReverseArr(A, valieEle);

    const P = [];
    for (let i = 0; i < N-1; i++) {
        P.push(Math.abs(fiboArr[i]-fiboReverseArr[N-i-2]));
    }

    const minEle = P.reduce((p, n) => p < n ? p : n)
    return minEle;
}

isErrorDebugging && (_ => {
    console.assert(Util.mustThrow(solution));
    console.assert(Util.mustNotThrow(solution.bind(null, [1,2,3,4,5])));
    console.assert(Util.mustThrow(solution.bind(null, [1,2,3,4,5,10000])));
    console.assert(Util.mustThrow(solution.bind(null, [1,2,3,4,5,-10000])));
})();

isSolutionDebugging && (_ => {
    console.assert(solution([3,1,2,4,3]) === 1);
})();