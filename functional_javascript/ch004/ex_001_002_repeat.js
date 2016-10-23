/**
 * Created by YB on 2016-10-22.
 */

console.log('\n### 값을 반복시키는 repeat 함수');
function repeat (times, value) {
    return Array.prototype.map.call(new Array(times).join('/').split('/'), function () {return value;});
}
console.log(`repeat(4, 'Major') : ${repeat(4, 'Major')}`);

console.log('\n### 함수를 반복시키는 repeatedly 함수');
function repeatedly (times, fun) {
    return Array.prototype.map.call(new Array(times).join('/').split('/'), fun);
}
console.log(`repeatedly(3, ()=>Math.floor((Math.random()*10)+1)) : ${repeatedly(3, ()=>Math.floor((Math.random()*10)+1))}`);

console.log('\n### 조건을 만족할때까지 반복시키는 iterateUntil 함수');
function iterateUntil(fun, check, init) {
    var ret = [];
    var result = fun(init);
    while (check(result)) {
        ret.push(result);
        result = fun(result);
    }
    return ret;
}

var multiple2_until1024 = iterateUntil(
    (n) => n+n,
    (n) => n <= 1024,
    1
);
console.log(`multiple_2_until_1024 : ${multiple2_until1024}`);
