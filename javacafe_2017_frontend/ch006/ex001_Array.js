/**
 * Created by yblee on 2017-05-12.
 * Array 객체 기본 탐구
 *
 */

/* Array Object의 구조 보기 */
console.dir(Array);

// Q. Array.of(), Array.slice()는 가능할까? 가능하다면 왜? 불가능하다면 왜일까?


// Q. [].slice()는 가능할까? 가능하다면 왜? 불가능하다면 왜? 일까?


// Q. Array는 오브젝트일까? 함수일까? 근거는?


// Q. 인자가 100개인 배열 만들기


// Q. 반복문을 쓰지 않고 반복횟수를 받아서 그만큼 문자를 반복하는 함수 만들기
// Hint. 위의 배열을 활용


// Q.문자를 고정시킨채 숫자만 받을 수 있는 래핑함수 만들기
// 실행예. repeatA(3) -> 'aaa'
// 1. bind를 사용해서 만들어 보자
// 2. curry1이라는 함수를 사용해서 만들어 보자


/* right curry */
function rightCurry(func, param2) {
    return function(param1) {
        return func(param1, param2);
    }
}

var repeat100 = rightCurry(repeatStr, 100);

// TODO : 받아오는 파라미터의 갯수에 상관없는 curry 함수 만들기


/*-------------------------------------------------------------- every */
// 모든 요소가 해당 조건을 만족하는지 검사. 모두 만족해야 true, 하나라도 만족하지 않으면 false, &&(and) 연산자와 같다
[1, 2, 3, 4, 5].every(function (ele) {
    return ele > 0;
});

[1, 2, 3, 4, 5].every(function (ele) {
    return ele > 1;
});


// Q. 위의 함수를 추상화해서 로직을 주입하는 방식으로 바꿔보자
// function isAllValid(arr, isValid) { ... } 구현


// Q. 로직을 고정시키는 방식으로 변경해보자
// function isAllValidSet(isValid) { ... } 구현
// var isAllInteger = isAllValidSet( ... }); 구현

// 실행
isAllInteger([1,2,3,4,5]);
isAllInteger([1,2,3,4,5,'']);

// ES6의 arrow function 형식으로 바꿔보기
[1, 2, 3, 4, 5].every(function (ele) { return ele > 0; });

[1,2,3,4,5].every(ele=>ele>0);


// arrow function 초간단 정리
// 익명함수를 간략하게 표현하게 해주는 표현
// 식과 문 모두 표현 가능
var plus = x=>x+1;  // 식
var plus = (x)=>{ return x+1; };  // 문

// 식으로 사용할 경우에는 return 삭제 가능
// 문으로 사용할 경우에는 꼭 return 표기

// 파라미터가 하나인 경우에는 괄호() 생략 가능 ex) a=>a+1
// 파라미터가 없거나 2개 이상인 경우에는 괄호() 생략 불가 ex) (a,b)=>a+b, ()=>1

// Q. [1,2,3,4,5].every(function (ele) { return ele > 0}); 를 arrow function으로 바꿔보자



