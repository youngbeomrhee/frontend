/**
 * Created by YB on 2016-06-18.
 */

var cacher = function (cache, func) {
    var calculate = function (n) {
        if(cache[n]!==undefined) {
            result = cache[n];
        } else {
            cache[n] = func(calculate, n);
            result = cache[n];
        }
        return result;
    }
    return calculate;
};

var fact = cacher({'0' : 1}, function (func, n) {   // fact function 초기화
    return n*func(n-1);
});

var fibo = cacher({'0' : 0, '1' : 1}, function (func, n) {  // fibo function 초기화
    return func(n-1) + func(n-2);
});

console.log(fact(3));
console.log(fact(6));

console.log(fibo(3));
console.log(fibo(6));
