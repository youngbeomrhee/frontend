// you can write to stderr for debugging purposes, e.g.
// process.stderr.write('this is a debug message');
const isDebugging = false;

/* Utils */ // TODO: 재사용 할 경우 모듈화
function missParam() {
    throw Error('missed param!');
}

// TODO: typescript를 사용할 경우에는 불필요
function isValidType(typeAssertionFunc=missParam(), p=missParam())  {
    // 해당 환경에서 작동하지 않으므로 흐름 제어하지 않고 단순 boolean 타입
    // if (!typeAssertionFunc(p)) throw Error(`${p}의 타입이 ${typeName}을 일치하는지 여부를 확인하는 ${typeAssertionFunc} 함수를 통과하지 못했습니다.`);
    return typeAssertionFunc(p);
}

function isValidIntRange(p, min, max) {
    return isValidType(Number.isInteger, p) && (p >= min) && (p <= max);
}

function getMax(arr) {
    return arr.reduce((max, temp) => (temp>max ? temp : max), 0);
}

function getChars(ch, len) {
    return Array(len+1).join(ch);
}

function getLines(separator, common, iter) {
    let str = separator;
    for (let i = 0; i < iter; i++) {
        str += common + separator;
    }
    return str;
}

function addBlanks(num, max) {
    const numLength = (''+num).length;
    return numLength < max ? getChars(' ', max-numLength) + num: num;
}

function solution(A, K) {
    /* 입력된 값의 체크 */
    isValidType(Number.isInteger, A);
    isValidType(Number.isInteger, K);
    isValidIntRange(A.length, 1, 200);
    isValidIntRange(K, 1, 1000000000);
    for (let i = 0; i < A.length; i++) {
        const temp = A[i];
        if(!isValidIntRange(temp, 0, 1000000000)) throw Error(`${temp} is out of range`);
    }

    const maxA = getMax(A),
        aLen = A.length,
        maxALength = (''+maxA).length,
        separator = '+',
        commonChar = '-',
        commonChars = getChars(commonChar, maxALength),
        lineSeparator = getLines(separator, commonChars, K),
        endLineSeparator = getLines(separator, commonChars, aLen % K),
        columnSeparator = '|',
        lineBreak = '\n';

    let result = lineSeparator + lineBreak, // lineSeparator로 구성된 첫 줄과 줄 내림
        lineBreakIdx = 0;

    // 필요한 출력값 생성
    for (let i = 0; i < aLen; i++) {    // 전체 배열 순회
        const temp = A[i];  // 현재 값
        result += columnSeparator + addBlanks(temp, maxALength);
        if(lineBreakIdx === K-1) {  // K개만큼 출력한 후 줄내림
            result += columnSeparator;  // 마지막 컬럼 닫아 줌
            result += lineBreak + lineSeparator + lineBreak;
            lineBreakIdx = 0;   // 초기화
        } else {
            lineBreakIdx++;
        }
    }
    result += columnSeparator + '\n';   // 마지막 컬럼을 닫아 주고 줄내림
    result += endLineSeparator;     // 마지막 lineseparator 출력

    console.log(result);
}

// solution([4, 35, 80, 123, 12345, 44, 8, 5], 10);
solution([4, 35, 80, 123, 12345, 44, 8, 5, 24, 3], 4);


// 테스트 코드 실행
isDebugging && (() => {
    /* 필수값 누락 확인 => missParam 작동여부 체크 */
    // isValidType();   // exception
    // isValidType(_=>1);   // exception
    isValidType(_=>1, 1)

    /* isValidType test */
    console.assert(isValidType(Number.isInteger, -1000000) === true);
    console.assert(isValidType(Number.isInteger, -923847) === true);
    console.assert(isValidType(Number.isInteger, -1000.03) === false);
    console.assert(isValidType(Number.isInteger, -0.03) === false);
    console.assert(isValidType(Number.isInteger, 0.1234) === false);
    console.assert(isValidType(Number.isInteger, 1) === true);
    console.assert(isValidType(Number.isInteger, 123098476218374) === true);
    console.assert(isValidType(Number.isInteger, 29348.23) === false);

    /* isValidIntRange test */
    console.assert(isValidIntRange('s') === false);
    console.assert(isValidIntRange('s', 1) === false);
    console.assert(isValidIntRange('s', 1, 100) === false);
    console.assert(isValidIntRange(false, 1, 100) === false);
    console.assert(isValidIntRange(100, 1, 100) === true); // exception
    console.assert(isValidIntRange(1000, 1, 100) === false); // exception

    // TODO: 원래는 모든 경우를 테스트 하며 진행하지만 제한된 시간이 짧아서 나머지 테스트는 생략합니다. 이후의 코드도 테스트는 생략하고 진행하니 참고 부탁 드립니다.
})();
