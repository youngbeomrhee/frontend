/**
 * Created by whybe on 2018. 9. 23..
 */
const string = 'abc',
    number = 1,
    boolean = true,
    obj = {
        outside: {
            inside: {
                key: 'value',
            },
        },
    };

console.time('전체시간');
console.log('평범한 로그입니다 쉼표로 구분해 여러 값을 찍을 수 있습니다');
console.log(string, number, boolean);
console.error('에러 메시지는 console.error에 담아주세요');

console.log(obj);
console.dir(obj, {colors: false, depth: 2});
console.dir(obj, {colors: true, depth: 1});

console.time('시간측정');
for (var i = 0; i < 100000; i++) {
    continue;
}
console.timeEnd('시간측정');

function b() {
    console.trace('에러 위치 추적');
}

function a() {
    b();
}

a();

console.timeEnd('전체시간');