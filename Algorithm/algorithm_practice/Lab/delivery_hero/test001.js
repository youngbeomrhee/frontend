const isDebugging = true;

/* Utils */
function missedParam() {
    throw Error("You've missed param!");
}

function validType(typeAssertionFunc=missedParam(), p=missedParam())  {
    if (!typeAssertionFunc(p)) throw Error(`${p}이 ${typeAssertionFunc} 함수체크를 통과하지 못했습니다.`);
}

function validIntRange(p=missedParam(), min=missedParam(), max=missedParam()) {
    validType(Number.isInteger, p);
    validType(Number.isInteger, min);
    validType(Number.isInteger, max);
    if((p < min) || (p > max)) throw Error(`전달된 ${p}는 ${min} 이상이고 ${max} 이하여야 합니다.`);
}

function isInRange(p=missedParam(), min=missedParam(), max=missedParam()) {
    validType(Number.isInteger, p);
    validType(Number.isInteger, min);
    validType(Number.isInteger, max);
    return (p >= min) && (p <= max);
}

function validIntMoreThan(p=missedParam(), min=missedParam()) {
    validType(Number.isInteger, p);
    if(p < min) throw Error(`전달된 ${p}는 ${min} 이상이어야 합니다.`);
}

function addInt(a, b) {
    validType(Number.isInteger, a);
    validType(Number.isInteger, b);
    return a + b;
}

function multiplyInt(a, b) {
    validType(Number.isInteger, a);
    validType(Number.isInteger, b);
    return a * b;
}

/* /Utils */

/* 1번 문제 */
(()=>{
    function func(str=missedParam()) {
        // 예외체크 생략 : 어떤 타입이 들어오더라도 예외체크 필요 없음
        // String으로 형변환 후에 괄호, 공백 제거
        str = String(str).replace(/\(|\)|\s/g, '');
        // 맞는 숫자형식인지 체크
        return /^[55|56]{2}322457$/.test(str);
    }

    /* testcases */
    isDebugging && (()=>{
        // 예외처리
        // console.assert(func());  // 파라미터를 넘기지 않은 경우 throw

        // 유효
        console.assert(func('(56) 32 24 57'));
        console.assert(func('(56) 32 2457'));
        console.assert(func('(56) 322457'));
        console.assert(func('(56)322457'));
        console.assert(func('56 32 24 57'));
        console.assert(func('56 32 2457'));
        console.assert(func('56 322457'));
        console.assert(func('56322457'));

        // 유효하지 않은 값
        console.assert(func('88952463')===false);
        console.assert(func('abcdefgh')===false);
        console.assert(func('(56) 95 2 314')===false);
    })();
})();


/* 2번 문제 */
(()=>{


    function func(x=missedParam(), y=missedParam()) {
        validIntMoreThan(x, 1);
        validIntRange(y, 0, 9);

        // y, y+10의 배수가 x에 포함되는 갯수를 구한다
        const containYinX = [];

        let temp = y,
            times = 1;
        do {
            if(isInRange(temp, 1, x)) {
                containYinX.push(temp);
            }
            temp += 10;
            times++;
        } while(temp<=x);

        return [containYinX.length, containYinX.reduce(addInt), containYinX.reduce(multiplyInt)];
    }

    /* testcases */
    isDebugging && (()=>{
        // 예외처리
        // func();
        // func(0);
        // func(0, 0);
        // func(-1, 0);
        // func('a', 0);
        // func('a', 'b');
        // func(-100, 0);
        // func(3245, -23);
        // func(3245, 0);       // 통과
        // func(988237, 5);       // 통과
        // func(238, 9);       // 통과

        // 함수가 제대로 된 값을 리턴하는지 확인
        console.assert(JSON.stringify(func(20, 0)) === JSON.stringify([2, 30, 200]));
        console.assert(JSON.stringify(func(20, 1)) === JSON.stringify([2, 12, 11]));
    })();
})();

/* 3번 문제 */
(()=>{
    // 들어오는 타입은 Int형으로 한정
    function min(arr=missedParam()) {
        validType(Array.isArray, arr);
        return Math.min(...arr);
    }

    function max(arr=missedParam()) {
        validType(Array.isArray, arr);
        return Math.max(...arr);
    }


    /* testcases */
    isDebugging && (()=>{
        // 예외처리
        // min();
        // min(1);
        // min('a');
        // min(true);
        // min({});
        // min([])  // 통과

        // max();
        // max(1);
        // max('a');
        // max(true);
        // max({});
        // max([])  // 통과

        // 함수 작동 테스트
        console.assert(isNaN(min([1, 2, 3, 'a'])));
        console.assert(isNaN(max([1, 2, 3, 'a'])));

        console.assert(min([1, 2, 3, 4, 5]) === 1);
        console.assert(min([1, 2, 3, -345, 4, 5]) === -345);
        console.assert(max([1, 20, 3, 4, 5]) === 20);
    })();
})();


/* 3번 문제 */
(()=>{
    function func(A, B) {

    }
})();
