/**
 * Created by YB on 2016-10-22.
 */
console.log('\n### 여러 객체에서 복사해온 것을 한 객체 안에 넣기');

function mix() {
    var arg, prop, child = {};
    for (arg = 0; arg < arguments.length; arg++) {
        for (prop in arguments[arg]) {
            if (arguments[arg].hasOwnProperty(prop)) {
                child[prop] = arguments[arg][prop];
            }
        }
    }
    return child;
}

var sign = {name: 'yb'};
var cake = mix(
    {eggs: 2, large: true},
    {butter: 1, salted: true},
    {flour: '3 cups'},
    {sugar: 'sure!'},
    sign
);

console.log(`cake : ${cake}`);
console.dir(cake);

// 부모와의 연결고리는 끊어진 상태
sign.name = 'change';   // 부모 객체의 변경
console.dir(cake);
