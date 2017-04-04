/**
 * Created by yblee on 2017-04-04.
 */

/* 타입변환 : 코드를 보고 실행결과와 왜 그렇게 됐는지를 알 수 있으면 통과 */
var a = '1';
var b = +a;
var c = ''+b;
var d = Boolean(c);
var e = !!c;
d === e;

/* 기본형과 참조형*/
/* 마지막이 true인지 false인지 답할 수 있고 그렇게 된 원리를 알 수 있으면 통과 */
a = 1;
b = a;
a = 2;
b === 2;  // true? false?

a = {k: 1};
b = a;
a.k = 2;
b.k === 2;  // true? false?


/* 연산자의 작동원리 */
/* == (The equal operator) 각각이 true인지 false인지 답할 수 있고 그렇게 된 원리를 알 수 있으면 통과 */
'' == 0;
undefined == null;
true == 100;
true == 1;
false == 0;
false == -1;
'1234' == 1234;

/* () The grouping operator : 아래 코드 설명가능 */
(function(){ console.log('hi'); })();

/* &&, || 연산자 */
1 && true && 'str' && {};   // 이걸 실행하면 뭐가 나올까요?
1 || true || 'str' && {};   // 이걸 실행하면 뭐가 나올까요?
var x = a || 1;   // 이 의미는 뭘까요?


/* 객체와 배열의 표기법, 성능 : 아래의 두 가지 표기법 중 어떤게 더 빠르고 어떤걸 더 많이 쓸까요? */
var obj = {};
var obj2 = new Object();

var arr = [];
var arr2 = new Array();

/* 자바스크립트의 동적 파라미터 이해 및 사용방법 알고 있는지 체크 */

/* HTML 내부에 자바스크립트 선언위치는? */

/* 일급객체란? */

/* console.log()는 함수일까요? 메서드일까요? */

/* prototype을 설명해 보세요 */

/* scope : 아래 나온 코드의 모든 함수, 변수의 유효범위(scope)를 확인해 보세요. */

function outer () {   // 예 : outer 함수는 전역(window)에서 유효
  inner();
  var a = 1;  // ?
  function inner () { // ?
      var x = 2;  // ?
  }
  var b = 2;  // ?
  if(a==1) {  // ?
    var c = 3;  // ?
  }
  console.log(c);
}
outer();

