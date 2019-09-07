/**
 * Created by whybe on 2018. 3. 17..
 */

function toBinaryStr(numberStr) {
    if(!Number.isInteger(Number.parseInt(numberStr))) throw '숫자 혹은 Number형으로 변환 가능한 문자형의 데이터만 입력할 수 있습니다.';
    return (+numberStr).toString(2);
}

let assert= {
    equal: (a, b) => {
        return a === b;
    }
}

assert.equal(toBinary(9), '1001')
&& assert.equal(toBinary(529), '1000010001')
&& assert.equal(toBinary(20), '10100');

function binaryGaps(binaryStr) {
    if(!typeof binaryStr === 'string' || !/^[1|0]*$/.test(binaryStr)) throw '2진수 형식의 문자가 아닙니다.';
    binaryStr = binaryStr.substr(0, binaryStr.lastIndexOf('1')+1);  // 마지막에 최소한 하나의 1로 끝나야 문제의 조건에 부합
    return binaryStr.split('1');
}

function longestEle(arr) {
    if(!Array.isArray(arr)) throw '배열형식만 가능합니다.';
    return arr.reduce((max, ele)=>{
        if(ele.length>max) {
            return ele.length;
        } else {
            return max;
        }
    }, 0);
}

function solution(N) {
    if(typeof N !== 'number') throw Error('입력값은 nubmer 형식만 가능합니다');
    if(N>2147483647) throw Error('입력값은 2,147,483,647까지만 허용됩니다.');
    return longestEle(binaryGaps(toBinaryStr(N)));
}

assert.equal(solution(9), 2)
&& assert.equal(solution(529), 4)
&& assert.equal(solution(20), 1)
&& assert.equal(solution(15), 0);
