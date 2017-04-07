/**
 * Created by YB on 2016-04-15.
 */

/* Dynamic typing */

// Java 개발자에게 익숙한 형태
// int a = 1;

// 하지만...
var a;
a = null;
a = 1;
a = 'str';
a = [];
a = {};



/* +, -, *, /, ! 5가지의 연산자 */

'123' + 123;
'123' - 123;
'123' * 123;
'123' / '123';

!'123';
!'';
!123;
!false;


/* 형변환 */
// string 형으로 변환
var x = 123;
x += '';

// number 형으로 변환 (*, -, / 연산자를 활용)
var x = '123'
x *= 1;

// Boolean 형으로 변환
var x = '';
x = !!x;


/* 기본타입과 참조타입 */

// 기본타입
var a = 1;
var b = a;
a = 2;
console.log('a : ', a, ' / ', 'b : ', b);

// 참조타입
var a = {k:1};
var b = a;
a.k = 2;
console.log('a : ', a, ' / ', 'b : ', b);


/* == 연산자  */

'' == 0;
undefined == null;
true == 1;
false == 0;
'1234' == 1234;

{} == {};
({}).__proto__ == ({}).__proto__;

/* === 연산자 */

'' === 0;
undefined === null;
true === 1;
{} === {};
({}).__proto__ === ({}).__proto__;
({}).__proto__.constructor === Object;


/* grouping operator */
1 + 2 * 3 == 7;
(1 + 2) * 3 == 9;
({}).__proto__.constructor === Object;
(1==true) && (function(){
    console.log('1==true')
})();


/* &&, || 연산자 */
var x = (1 && true && "str" && {});  // ?
var x = (1 || true || "str" || {});  // ?

var x = (1 && true || "str" || {});  // ?

if(a==b) stop();
(a==b) && stop();



var x = (0 || false || "" || null || undefined); // ?
var x = (0 || false && "a" || null || undefined); // ?
var x = (0 || true && "a" || null || undefined); // ?


/* 객체와 배열 */

// 객체 : {}, new object()

var obj = {};
var obj = new Object();


// 배열 : [], new Array()

var arr = []
var arr = new Array();


/* Javascript 배열의 특수한 점 */

var arr = []; // arr.length == 0
arr.push(1); // arr.length == 1
arr.push(2); // arr.length == 2
arr.push(3); // arr.length == 3
arr.pop(); // arr.length == 2
arr.length = 1; // 나머지 요소는 삭제
arr.length = 5; // 나머지 요소는 undefined


/* 유사배열 */

var obj = {a:1, b:2, c:3};
for(idx in obj) {
    console.log(obj[idx]);
};

var str_wrapper = new String('abcdefg');
console.dir(str_wrapper);

console.dir(document.getElementsByTagName("div"));



/* 동적 파라미터 */
function func(arr) {
    arr = arr || [];
    if (arr.length == 0) {
        console.log('Error')
    } else {
        console.log(arr)
    }
}

func();  // 파라미터가 없을 때
func([1,2,3]); // 파라미터가 있을 때



function printArg() {
    console.log(arguments);
}
printArg(1);
printArg(1,'a');
printArg(1,'a',{},[1,2,3]);


/* 자바스크립트 엔진 해석 */

debugger;
alert(square(4));    // ????
var square = 0;
function square(x) {
    return x*x;
}
alert(square);       // ????






var print_all = function (arg) {
    for (var i in this) { console.log(i + " : " + this[i]); }
    for (var j in arguments) { console.log(j + " : " + arguments[j]); }
}

var myobj = {name: "zzoon"};

var myfunc = print_all.bind(myobj);
myfunc();

var myfunc1 = print_all.bind(myobj, 'yb', 'others');
myfunc1('insidejs');



