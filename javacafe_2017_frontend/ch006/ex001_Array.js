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



/* 테스트를 위한 데이터 생성 함수를 만들고 시작하자 */
function range(size, start) {
    let i=start||0, added=start||0, arr=[];
    for(;i<size+added;i++) {
        arr.push(i);
    }
    return arr;
}

/*-------------------------------------------------------------- filter */
// 기본
range(10).filter(ele => ele<5);

// Q. 0~99까지의 배열 중에서 짝수 구하기
// A. range(100).filter( ... );


// Q. 0~99까지의 배열 중에서 짝수이면서 10보다 크고 30보다 작은 수 구하기
// A. range(100).filter( ... );


// Q. [1, 2, '', {}, [], 4, [1,2], '7', true] 중에서 숫자만 뽑아내기


// Q. 아래의 지원자 중 25세 이상만 추출
var applicants = [
    {
        name: 'a',
        age: 23
    },
    {
        name: 'b',
        age: 27
    },
    {
        name: 'c',
        age: 22
    },
    {
        name: 'd',
        age: 25
    },
    {
        name: 'e',
        age: 29
    }
];



/*-------------------------------------------------------------- find */
// 기본
// 조건을 만족하는 첫 번째 인자를 반환
applicants.find(applicant=>applicant.age>25);


/*-------------------------------------------------------------- findIndex */
// 기본
// 조건을 만족하는 첫 번째 인자의 인덱스를 반환
applicants.findIndex(applicant=>applicant.age>25);



/*-------------------------------------------------------------- map */
// 기본
// callback 함수의 리턴값으로 새로운 배열을 생성
range(10, 1).map(ele => ele * ele);

// Q. applicants 중에서 25세가 넘는 사람들에게는 step1:'pass'라는 키/벨류 추가하기



/*-------------------------------------------------------------- reduce */
// 인자를 줄여가며 하나의 값으로 수렴
range(10).reduce((accumulator, currentValue) => accumulator + currentValue);
range(10).reduce((accumulator, currentValue, index, array) => accumulator + currentValue, 0);
range(10).reduce((accumulator, currentValue, index, array) => accumulator + currentValue, 0);

// Q. 1~10을 인자로 가진 배열의 모든 숫자를 곱하기.
// range(10, 1).reduce( ... );

// Q. [1,2,3,4,5]을 인덱스를 키로 갖고 현재 값의 제곱을 값으로 갖는 배열로 변형

// Q. 추상화하여 로직을 주입하는 방식으로 바꾸기
// function reduceFunc(arr, func) { ... }
// 이런 식으로 실행 reduceFunc([1,2,3], (accum, curr)=>accum+curr);

// Q. (accum, curr)=>accum+curr 로직을 함수로 빼보자
// Q. 로직은 고정시키고 배열만 동적으로 받을 수 있도록 바꿔보자
// function setReduce( ... ) { ... };
// var reducePlusExec = setReduce( ... );

/*-------------------------------------------------------------- reduceRight */
// reduce와 기능 동일. 다만 오른쪽에서 왼쪽으로 배열 순
[1,2,3,4,5].reduceRight((accumulator, current, index) =>{
    var temp = {};
    temp[index] = current ** 2;
    accumulator.push(temp);
    return accumulator;
}, []);



/*-------------------------------------------------------------- some */
// every와 달리, 모든 요소중에 하나라도 해당 조건을 만족하는지 검사. 하나라도 만족하면 true, 모두다 만족하지 않으면 false, ||(or) 연산자와 같다
// 기본
range(10).some(ele=>ele>8);
range(10).some(ele=>ele>9);


/*-------------------------------------------------------------- sort */
// 정렬해주는 함수 (기본 String unicode 오름차순)
// 비교로직(comparator)을 넣는 경우 로직에 따라 정렬 가능
// 기본
['d', 'r', 'a', 'j', 'u'].sort();
[12,23,5,2,6,3,4,2].sort();

// comparator는 기본적으로 아래의 로직을 따른다
function compare(a, b) {
    if (a is less than b by some ordering criterion) {
        return -1;
    }
    if (a is greater than b by the ordering criterion) {
        return 1;
    }
    // a must be equal to b
    return 0;
}


// [12,23,5,2,,6,3,4,2]을 숫자의 대소비교로 정렬
[12,23,5,2,6,3,4,2].sort((a, b) => a-b);


/*-------------------------------------------------------------- slice */
// 배열을 시작인덱스부터 종료 인덱스까지 자르는 새로운 배열 리턴
// [].slice(시작인덱스, 종료인덱스)
// 원본을 건드리지 않는다
var arr = [1, 2, 3, 4, 5];
arr.slice(1, 3);
console.log(arr);


/*-------------------------------------------------------------- splice */
// 배열을 시작인덱스부터 갯수만큼 삭제(삭제된 값 리턴)
// [].slice(시작인덱스, 삭제할 갯수, 추가값1, 추가값2, ...)
arr.splice(1, 3, 7, 8);
console.log(arr);

/* 종합문제 */
var data = range(100, 1);

// Q. data를 앞에서부터 50개의 요소 newData에 복사

// Q. 복사한 데이터 중 뒤의 20개는 삭제하고 삭제한 곳에 99, 100을 넣기

// Q. 역순으로 정렬

// Q. 해당 데이터를 5의 배수만 있는 배열로 변경

// Q. 해당 데이터가 모두 5의 배수인지 확인

// Q. 해당 데이터중 15가 하나라도 있는지 확인

// Q. 해당 데이터의 15의 인덱스 찾기

// Q. 해당 데이터를 인덱스를 키로, 요소를 배열로 변경
// 예 : [ {0: 100}, {1: 50}, ...]

// Q. 해당 데이터의 모든 값을 더하기

// Q. 첫 번째 요소 newData에서 받아오고 원본은 지우기

