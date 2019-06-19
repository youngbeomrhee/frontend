const isDebugging = true;

/* Util 함수 */
// TODO: 모듈화
function missParam() {
    throw Error('You missed param!');
}

function validType(typeAssertionFunc=missParam(), p=missParam())  {
    if (!typeAssertionFunc(p)) throw Error(`${p}이 ${typeAssertionFunc} 함수체크를 통과하지 못했습니다.`);
}

function validIntRange(p=missParam(), min=missParam(), max=missParam()) {
    validType(Number.isInteger, p);
    if((p < min) || (p > max)) throw Error(`${p}는 ${min} 이상이고 ${max} 이하여야 합니다.`);
}

function mustThrow(func, params) {
    let hasBeenThrown = false;
    try {
        func.apply(null, params);
    } catch(e) {
        hasBeenThrown = true;
    } finally {
        if(!hasBeenThrown) throw `${params}를 받아서 실행한 ${func}는 에러가 발생해야 합니다.`;
    }
}
/* /Util 함수 */

function toBinary(num=missParam()) {
    // 입력값의 유효성 검증
    validType(Number.isInteger, num);
    return num.toString(2);
}

function binaryGap(numStr=missParam()) {
    validType(((str) => typeof str === 'string').bind(null, numStr), numStr);
    if(!Array.isArray(numStr.match(/1/g)) || numStr.match(/1/g).length < 2) return 0;

    return true;
}

function solution(N) {
    validType(Number.isInteger, N);
    validIntRange(N, 1, 2147483647);

}

isDebugging && (_=>{
    // 제대로 예외처리되고 있는지 확인
    // console.assert(toBinary(10) === '1010');
    // console.assert(toBinary() === '1010');
    // console.assert(toBinary('10') === '1010');
    // console.assert(toBinary(true) === '1010');
    // console.assert(toBinary({}) === '1010');
    // console.assert(toBinary([]) === '1010');
    // console.assert(toBinary([]) === '1010');
    //
    // console.assert(binaryGap());
    // console.assert(binaryGap(1));
    // console.assert(binaryGap(true));
    console.assert(binaryGap('') === 0);

    // 제대로 예외처리되고 있는지 확인
    // console.assert(solution() === 0);
    console.assert(solution('s') === 0);
    // console.assert(solution(7) === 0);
    // console.assert(solution(9) === 2);
    // console.assert(solution(529) === 4);
    // console.assert(solution(1041) === 5);
})();
