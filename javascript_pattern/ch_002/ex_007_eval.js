/**
 * Created by YB on 2016-09-23.
 */
// 일반적으로 eval은 안티패턴
// 브라우져의 콘솔에서 실행
// 실행 후에 f11로 따라가 보자
debugger;
var msg = 'Hello';
(function() {console.log(msg);
})();
eval('console.log(msg)');

// http://jindo.dev.naver.com/jsMatch/에서 성능 비교

// 코드1
var obj = {};
var property = 'name';
eval('obj.' + property + '="yb"');
// 코드2
var obj = {};
var property = 'name';
obj[property] = 'yb';

// 코드 1
var msg = 'Hello';
eval('console.log(msg)');
// 코드2
var msg = 'Hello';
(function() {
    console.log(msg);
})();


// eval 호출패턴과 Function으로 대체
var evalVal1, evalVal2, evalVal3;

console.log('evalVal1 : ', evalVal1);
console.log('evalVal2 : ', evalVal2);
console.log('evalVal3 : ', evalVal3);

var jsstring = 'var evalVal1 = 1; console.log(evalVal1);';
eval(jsstring);

var jsstring = 'var evalVal2 = 2; console.log(evalVal2);';
(function () {
    eval(jsstring);
})();

var jsstring = 'var evalVal3 = 3; console.log(evalVal3);';
new Function(jsstring)();

console.log('evalVal1 : ', evalVal1);   // 전역변수 오염
console.log('evalVal2 : ', evalVal2);
console.log('evalVal3 : ', evalVal3);


// eval을 사용할 경우와 Function을 사용할 경우의 scope 차이
(function () {
    var local = 1;
    eval('console.log(local);');
})();

// Function은 새로운 function을 생성한다.
(function () {
    var local = 1;
    Function('console.log(local);')();
})();


