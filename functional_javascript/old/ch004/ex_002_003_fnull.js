/**
 * Created by YB on 2016-10-22.
 */
console.log('\n### 값이 존재하지 않는 상황을 지켜주는 함수 : fnull');
// 객체의 존재여부 확인
function notNull(x) {
    return x!==undefined && x !== null;
}

function fnull (fun /*, 기본값 */) {
    var defaults = Array.prototype.slice.call(arguments, 1);

    return function (/* 인자 */) {
        var args = Array.prototype.map.call(arguments, function (currVal, idx) {
            return notNull(currVal) ? currVal : defaults[idx];
        });
        return fun.apply(null, args);
    };
}

console.log('\n### fnull을 이용한 안전한 곱셈');
var safeMultiple = fnull(function (total, n) {
        return total * n;
    }, 1, 1);
console.log(`Array.prototype.reduce.call([1,2,null,4,null], safeMultiple) : ${Array.prototype.reduce.call([1,2,null,4,'5','str',undefined], safeMultiple)}`);


console.log('\n### fnull을 이용한 설정 객체 문제 해결');

function defaults (def) {
    return function (config, key) {
        var val = fnull((x)=>x, def[key]);
        return config && val(config[key]);
    };
}

function doSomething (config) {
    var lookup = defaults({critical: 108});
    return lookup(config, 'critical');
}

console.log('# doSomething({critical: 9})');
console.dir(doSomething({critical: 9}));

console.log('# ${doSomething({})');
console.dir(doSomething({}));


