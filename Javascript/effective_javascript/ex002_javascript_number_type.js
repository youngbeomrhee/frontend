// Javascript 내의 모든 숫자는 IEEE 754 표준에서 정의한 64비트로 인코딩된 배정밀도의(double-precision) 부동 소수점, 즉 흔히 'double'로 알려진 숫자다.
function toBinary(num) {
    if(isNaN(Number(num))) { throw Error('숫자만 변환할 수 있습니다'); }

    return Number(num).toString(2);
}

console.assert(String(toBinary(1)) === '1');
console.assert(String(toBinary(2)) === '10');
console.assert(String(toBinary(7)) === '111');
console.assert(String(toBinary(8)) === '1000');
console.assert(String(toBinary(100)) === '1100100');

function binaryToDecimal(binaryStr) {
    if(!/^(1|0)*$/.test(binaryStr)) { throw '2진수값이 아닙니다.'; }
    return parseInt(binaryStr, 2);
}

console.assert(binaryToDecimal('1') === 1);
console.assert(binaryToDecimal('10') === 2);
console.assert(binaryToDecimal('111') === 7);
console.assert(binaryToDecimal('1000') === 8);
console.assert(binaryToDecimal('11001001') === 100);