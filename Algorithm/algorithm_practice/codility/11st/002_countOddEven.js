



function countToZeroOld(S, count=0) {

    if(!S.match(/1/)) return count;
    // 마지막이 1이면 홀수 아니면 짝수
    const sLen = S.length;
    S = S.lastIndexOf('1') === sLen - 1 ?  S.substr(0, sLen-1) + 0 : S.substr(0, sLen-1);
    count++;

    return countToZero(S, count);
}

function solution(S) {
    // write your code in JavaScript (Node.js 8.9.4)
    let count = 0,
        isContinue = true;

    while(isContinue) {
        if(!S.match(/1/)) break;
        const sLen = S.length;
        S = S.lastIndexOf('1') === sLen - 1 ?  S.substr(0, sLen-1) + 0 : S.substr(0, sLen-1);
        count++;
    }

    return count;
}


console.assert(solution('011100') === 7);
