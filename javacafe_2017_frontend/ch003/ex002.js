/**
 * Created by yblee on 2017-04-18.
 */
/*
  Javascript patterns 2장
*/
/* p.14. 안티패턴 : 암묵적 전역 */
function sum(x, y) {
  // 안티패턴: 암묵적 전역
  result = x + y;
  return result;
}

// TODO : 암묵적 전역을 막으려면?


/* p.15. 안티패턴 연쇄적 할당 */
function sum(x, y) {
  var a = b  = 0;
  // 아래 코드와 동일한 의미. 암묵적 전역 발생
  // var a = (b = 0);
  // b = 0; var a = b;
}

var global_var = 1;
global_novar = 2;
(function () {
    global_fromvar = 3;
})();

delete global_var;
delete global_novar;
delete global_fromvar;


/* p.16. 범용 전역 객체 */
var global = (function () { return this; })();

// TODO : window 객체가 있으면 사용, 없으면 할당
var window = window || (function() { return this; })();


/* p.17. 단일 var 패턴 */
function func() {
  var a = 1,
    b = 2,
    sum = a + b,
    myobject = {},
    i,
    j;
  // 함수 본문...
}

/* p.18. 호이스팅(hoisting) : 분산된 var 선언의 문제점 */
// 안티패턴
myname = 'global';
function func () {
  console.log(myname);
  var myname = 'local';
  console.log(myname);
}
func();

myname = 'global';
function func () {
  var myname;
  console.log(myname);
  myname = 'local';
  console.log(myname);
}
func();


/* p.19. for 루프 */
// 최적화되지 않은 루프
for (var i = 0; i < document.querySelectorAll('*').length; i++) {
  console.log(document.querySelectorAll('*')[i]);
}

// length를 캐쉬하여 최적화
var eles = document.querySelectorAll('*'),
  len = eles.length;
for (var i = 0; i < len; i++) {
  console.log(eles[i]);
}

// http://jindo.dev.naver.com/jsMatch/index.html?d=301

/* 미세최적화는 내용 안맞음 */


/* p.24. 내장 생성자 프로토타입 확장하기 / 확장하지 않기

1. 해당 기능이 ECMAScript의 향후 버전이나 자바스크립트 구현에서 일관되게 내장 메서드로 구현될 예정이다. 예를 들어 ECMAScript 5에 기술되었으나 아직 브라우저에 내장되지 않은 메서드라면 추가할 수 있다. 이 경우에는 유용한 메서드를 미리 정의하는 것이라고 할 수 있다.
2. 이 프로퍼티 또는 메서드가 이미 존재하는지, 즉 이미 코드 어딘가에 구현되어 있거나, 지원 브라우저 중 일부 자바스크립트 엔진에 내장되어 있는지 확인한다.
3. 이 변경사항을 명확히 문서화하고 팀 내에서 공유한다.
*/


/* p.27. eval is evil */
var obj = { name: 'whybe' },
  property = 'name';

// 안티패턴
console.log(eval('obj.' + property));
console.log(obj[property]);

// http://jindo.dev.naver.com/jsMatch/index.html?d=303

function myFunc() {
  console.log(arguments);
}

// 안티패턴
setTimeout('myFunc()', 1000);
setTimeout('myFunc(1, 2, 3)', 1000);

// 권장안
setTimeout(myFunc, 1000);
setTimeout(function () {
    myFunc(1, 2, 3);
}, 1000);


// eval과 Function의 차이
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



/* p.35. 명명규칙

생성자는 대문자로 시작하는 카멜표기법, 변수는 소문자로 시작하는 카멜표기법 (예 : function Gen() {}, var gen = new Gen())
상수와 전역변수는 모든 글자를 대문자로(예 : const PI = 3.14, MYAPP_MODULE = {})
클래스명은 소문자와 _의 조합으로 (예 : my_class)
아이디는 카멜표기법으로 (예 : myId)
비공개 멤버는 _로 시작 (예 : { _privateMethod: function() {}})

*/

/* p.38. API문서 작성 */
// 참고 : http://yui.github.io/yuidoc/
// 예제 파일 : https://github.com/youngbeomrhee/jssample/blob/master/yuidoc_sample.js
// TODO : 직접 node로 yuidoc 설치하고 예제파일로 API doc 만들어보기

/* p.45. 출시 단계의 압축 */
// 참고 : https://www.npmjs.com/package/node-minify
// 예제 파일 : https://github.com/youngbeomrhee/jssample/blob/master/node_compress_sample.js
// TODO : 직접 node로 node-minify 설치하고 압축해보기
