/**
 * Created by yblee on 2017-05-12.
 * Array 객체 기본 탐구
 * 
 */

/* Array Object의 구조 보기 */
console.dir(Array);

// Q. Array.of(), Array.slice()는 가능할까? 가능하다면 왜? 불가능하다면 왜? 일까?

// A. Array.of()는 가능, Array.slice()는 불가능
// Array.of는 내부 메서드, Array.slice는 내부메서드가 아니므로 해당 객체의 프로토타입을 검사하여 존재여부를 확인.
// Array.__proto__ === Function.prototype // Function에 없음
// Array.__proto__.__proto__ === Object.prototype


// Q. [].slice()는 가능할까? 가능하다면 왜? 불가능하다면 왜? 일까?
// A. console.dir([].__proto__)
// 정리 : Array.prototype의 메서드들이 Array의 인스턴스 ([], new Array())에 상속되고 상속된 메서드들은 __proto__를 통해 접근 가능
// 함수가 실행시에 생성되는 Execution context에서 프로토타입 체인을 따라 메서드를 찾는 원리에 의해서
// Array의 인스턴스([], new Array())에 slice는 없지만 부모 prototype을 따라 계속 찾아 올라가면서 slice를 찾게 된다.


// Q. Array는 오브젝트일까? 함수일까? 근거는?
// A. Array는 함수. 근거는 실행 가능하고 (new Array(), Array()), Array.constructor === Function를 통해서도 확인이 가능하다


// Q. 인자가 100개인 배열 만들기
// A. var arr = []; arr.length = 100;
// A2. var arr = new Array(100);


// Q. 반복문을 쓰지 않고 반복횟수를 받아서 그만큼 문자를 반복하는 함수 만들기
// Hint. 위의 배열을 활용
// 실행예. repeatStr('a', 3) -> 'aaa';
// A.
function repeatStr(str, cnt) {
  return new Array(cnt+1).join(str);
}


// Q.문자를 고정시킨채 숫자만 받을 수 있는 래핑함수 만들기
// 실행예. repeatA(3) -> 'aaa'
// A.
var repeatA = repeatStr.bind(null, 'a');
// A2.
function curry1(fun, fix1) {
  return function(arg) {
    return fun(fix1, arg);
  };
}
var repeatA = curry1(repeatStr, 'a');
// TODO : 받아오는 파라미터의 갯수에 상관없는 curry 함수 만들기


/* every */
// 모든 요소가 해당 조건을 만족하는지 검사. 모두 만족해야 true, 하나라도 만족하지 않으면 false, &&(and) 연산자와 같다
[1, 2, 3, 4, 5].every(function (ele) {
  return ele > 0;
});

[1, 2, 3, 4, 5].every(function (ele) {
  return ele > 1;
});

// Q. 배열의 값이 모두 숫자인지 체크하는 함수 만들기
// A.
function isAllInt(arr) {
  return arr.every(function (ele) {
    return Number.isInteger(ele);
  });
}
isAllInt([1,2,3,4,5]);
isAllInt([1,2,3,4,5,'']);

// 위의 함수를 추상화해서 로직을 주입하는 방식으로 변경
function isAllValid(arr, isValid) {
  return arr.every(isValid);
}
isAllValid([1,2,3,4,5], function (ele) { return Number.isInteger(ele); });
isAllValid([1,2,3,4,5,''], function (ele) { return Number.isInteger(ele); });


// 로직은 고정시키는 방식으로 변경
function isAllValidSet(isValid) {
  return function (arr) {
    arr.every(isValid);
  };
}

var isInteger = isAllValidSet(function (ele) { return Number.isInteger(ele); });

isInteger([1,2,3,4,5]);
isInteger([1,2,3,4,5,'']);

// ES6 방식으로 바꿔보기


