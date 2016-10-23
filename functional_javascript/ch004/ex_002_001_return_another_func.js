/**
 * Created by YB on 2016-10-22.
 */
require()

console.log('\n### 항상 같은 값을 반환하는 함수');

function always (value) {
    return function () {
        return value;
    };
}
// 이런 함수를 combinator라고 한다.

var alwaysFunc = always(function () {});
console.log(`alwaysFunc() === alwaysFunc() : ${alwaysFunc() === alwaysFunc()}`);

var alwaysFunc2 = always(function () {});
console.log(`alwaysFunc() === alwaysFunc2 : ${alwaysFunc() === alwaysFunc2}`);

function invoker (name, method) {
    return function (target) {
        if (!target) {
            fail("Must provide a target");
        }

        var targetMethod = target[name];
        var restArgs = Array.prototype.slice.call(arguments, 1);

        if (targetMethod && method===targetMethod) {
            return targetMethod.apply(target, restArgs);
        }
    };
}

var rev = invoker('reverse', Array.prototype.reverse);

var revArr = Array.prototype.map.call([[1, 2, 3]], rev);
console.log(`revArr : ${revArr}`);

exports.invoker = invoker;