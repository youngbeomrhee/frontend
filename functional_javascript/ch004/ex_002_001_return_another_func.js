/**
 * Created by YB on 2016-10-22.
 */
var _ = require('underscore');
var fjs = require('../lib/functional_js.js');

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

function invoker (NAME, METHOD) {
    return function(target /* args ... */) {
        if (!fjs.existy(target)) fjs.fail("Must provide a target");

        var targetMethod = target[NAME];
        var args = _.rest(arguments);
        
        // targetMethod가 처음에 생성될때 넘겨준 함수와 동일한 경우에만 실행
        return fjs.doWhen((fjs.existy(targetMethod) && METHOD === targetMethod), function()     {
            return targetMethod.apply(target, args);
        });
    };
}

var rev = invoker('reverse', Array.prototype.reverse);

var revArr = _.map([[1, 2, 3]], rev);
console.log(`revArr : ${revArr}`);

var obj = {
    isMine : function () { console.log('실행됨'); return arguments; }
}

var isMineCall = invoker('isMine', obj.isMine);
var isMineCall2 = invoker('isMine', Function.prototype);

console.log(isMineCall(obj, 'returnVal'));
console.log(isMineCall(Object, 'returnVal'));