// 함수 표현식
const log = function (message) {
    console.log(message);
};
log('자바스크립트에서는 함수를 변수에 넣을 수 있습니다.');

// 화살표 함수도 사용가능
const log2 = message => console.log(message);
log2('자바스크립트에서는 함수를 변수에 넣을 수 있습니다.2');

// 객체의 값으로 사용할수도 있다
const obj = {
    message: '함수를 달른 값과 마찬가지로 객체에 추가할 수도 있습니다.',
    log(message) {
        console.log(message);
    }
};
obj.log(obj.message);

// 배열에 넣을 수도 있다
const messages = [
        '함수를 배열에 넣을 수도 있습니다.',
        message => console.log(message),
        '일반적인 값과 마찬가지입니다.',
        message => console.log(message)
];
messages[1](messages[0]);
messages[3](messages[2]);

// 다른 함수에 인자로 넘길 수도 있다.
const insideFn = logger => logger('함수를 다른 함수에 인자로 넘길 수도 있습니다.');
insideFn(message => console.log(message));

const insideFnBetter = (func, arr) => func(arr);
insideFnBetter(console.log, '실행시에 넘길 파라미터');

// 함수가 함수를 리턴
const CreateScream = function (logger) {
    return function (message) {
        logger(message.toUpperCase() + '!!!');
    };
};

const scream = CreateScream(message => console.log(message));

scream('함수가 함수를 반환할 수도 있습니다.');
scream('CreateScream은 함수를 반환합니다.');
scream('scream은 createScream이 반환한 함수를 가리킵니다.');

// 추상화
const GenerateFuncWithSuffix = function (setFunc, suffix) {
    return function (func, arr) {
        setFunc(func(arr, suffix));
    };
};

const scream2 = GenerateFuncWithSuffix(console.log, '!!!');
scream2((a, b) => a + b, 'msg1');

const plus = (a, b) => a + b;
scream2(plus, 'msg2');

const GenerateLogFunc = GenerateFuncWithSuffix.bind(null, console.log);
const suffix = '!!!';   // 그냥 넘기는 것보다 명시적
const scream3 = GenerateLogFunc(suffix);
scream3(plus, 'msg3');

const scream4 = scream3.bind(null, plus);
scream4('msg4');

// 화살표 함수를 사용한 고차함수 표현
const CreateScream2 = logger => message => logger(message.toUpperCase() + '!!!');
const scream5 = CreateScream2(message => console.log(message));
scream5('msg5');
// 보다 다양한 예제는 https://30secondsofcode.org/


