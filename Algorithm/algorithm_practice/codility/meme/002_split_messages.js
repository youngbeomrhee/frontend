const isErrorDebugging = false,
    isFunctionDebugging = false,
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

// 문자를 자를 수 있다면 가능한 최소수, 자를 수 없다면 -1을 리턴
function cutString(S, K) {
    Util.validType(S, ele => typeof ele === 'string');
    Util.validType(K, Number.isInteger);
    Util.validIntRange(K, 1, 500);

    const sLength = S.length;
    let cuttingStartIdx = 0,
        cuttingEndIdx = 0,
        cuttedCount = 0,
        isFinish = false;

    while(!isFinish) {

        const subStr = S.substr(cuttingStartIdx, K),
            checkStartIdx = cuttingStartIdx === 0 ? 0 : cuttingStartIdx -1,
            checkEndIdx = cuttingStartIdx + K > sLength ? sLength + 1 : cuttingStartIdx + K,
            byPass = (checkStartIdx === 0 || S[checkStartIdx] === ' ') && (S[checkEndIdx] === ' ' || checkEndIdx >= sLength + 1);  // 자른 문자의 시작과 끝이 공백인 경우는 한 단어이므로 아래 테스트 로직 바이패스

        if(byPass) {
            isFinish = cuttingStartIdx + K >= sLength;
            cuttingStartIdx += (K + 1);
            cuttedCount++;
            continue;
        }

        let cutLength = subStr.lastIndexOf(' ');
        if(cutLength < 1) {     // 공백이 첫 글자에 있는 경우는 자를 수 없다고 판단하여 종료
            cuttedCount = -1
            isFinish = true;
            break;
        } else {
            cuttingStartIdx += cutLength + 1;
            cuttedCount++;
        }
    }

    return cuttedCount;
}

function solution(S=Util.missParam(), K=Util.missParam()) {
    // S : 문자. 처음과 끝에 공백이 있을 수 없다. 연속된 공백이 있을 수 없다. 1이상 500이하
    Util.validType(S, ele => typeof ele === 'string');
    if(/(^\s)|(\s$)/.test(S)) throw Error('S의 앞과 뒤에 공백이 올 수 없습니다.');
    if(/\s\s/.test(S)) throw Error('S에 연속된 공백이 올 수 없습니다.');

    const N = S.length;
    Util.validType(N, Number.isInteger);
    Util.validIntRange(N, 1, 500);

    // K : 분할 할 최대 문자수. 1이상 500이하. K가 끝나기 전에 단어가 끝나야 한다
    Util.validType(K, Number.isInteger);
    Util.validIntRange(K, 1, 500);

    let n = 0;

    n = cutString(S, K);

    return n;
}

isErrorDebugging && (_ => {
    console.assert(Util.mustThrow(solution));
    console.assert(Util.mustThrow(solution.bind(null, 1)));
    console.assert(Util.mustThrow(solution.bind(null, 1, 1)));
    console.assert(Util.mustThrow(solution.bind(null, '', 1)));
    console.assert(Util.mustNotThrow(solution.bind(null, 's', 1)));
    console.assert(Util.mustThrow(solution.bind(null, 's', 0)));
    console.assert(Util.mustThrow(solution.bind(null, ' s', 1)));
    console.assert(Util.mustThrow(solution.bind(null, 's ', 1)));
    console.assert(Util.mustThrow(solution.bind(null, ' s ', 1)));
    console.assert(Util.mustThrow(solution.bind(null, 's  s', 1)));
    console.assert(Util.mustThrow(solution.bind(null, 's    s', 1)));
    console.assert(Util.mustNotThrow(solution.bind(null, 's s', 1)));
    console.assert(Util.mustNotThrow(solution.bind(null, 's s', 500)));
    console.assert(Util.mustThrow(solution.bind(null, 's s', 501)));
    console.assert(Util.mustNotThrow(solution.bind(null, Array(500).fill('s').join(''), 500)));
    console.assert(Util.mustThrow(solution.bind(null, Array(501).fill('s').join(''), 500)));
    console.assert(Util.mustThrow(solution.bind(null, Array(1000).fill('s').join(''), 500)));
})();

isFunctionDebugging && (_ => {
    console.assert(cutString('SMS messages are really short', 3) === -1);
    console.assert(cutString('SMS messages are really short', 4) === -1);
    console.assert(cutString('SMS messages are really short', 5) === -1);
    console.assert(cutString('SMS messages are really short', 6) === -1);
    console.assert(cutString('SMS messages are really short', 7) === -1);
    console.assert(cutString('SMS messages are really short', 8) === 5);
    console.assert(cutString('SMS messages are really short', 9) === 5);
    console.assert(cutString('SMS messages are really short', 10) === 4);
    console.assert(cutString('SMS messages are really short', 11) === 4);
    console.assert(cutString('SMS messages are really short', 12) === 3);
})();
isSolutionDebugging && (_ => {
    console.assert(solution('SMS messages are really short', 1) === -1);
    console.assert(solution('SMS messages are really short', 2) === -1);
    console.assert(solution('SMS messages are really short', 3) === -1);
    console.assert(solution('SMS messages are really short', 4) === -1);
    console.assert(solution('SMS messages are really short', 5) === -1);
    console.assert(solution('SMS messages are really short', 6) === -1);
    console.assert(solution('SMS messages are really short', 7) === -1);
    console.assert(solution('SMS messages are really short', 8) === 5);
    console.assert(solution('SMS messages are really short', 9) === 5);
    console.assert(solution('SMS messages are really short', 10) === 4);
    console.assert(solution('SMS messages are really short', 11) === 4);
    console.assert(solution('SMS messages are really short', 12) === 3);
    console.assert(solution('SMS messages are really short', 13) === 3);
    console.assert(solution('SMS messages are really short', 14) === 3);
    console.assert(solution('SMS messages are really short', 15) === 3);
    console.assert(solution('SMS messages are really short', 16) === 2);
    console.assert(solution('SMS messages are really short', 50) === 1);
})();