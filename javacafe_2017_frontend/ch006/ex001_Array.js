/**
 * Created by yblee on 2017-05-12.
 * Array 객체 기본 탐구
 *
 */

/* Array Object의 구조 보기 */
console.dir(Array);

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
        age: 27,
        step1: 'pass'
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


// Q.문자를 고정시킨채 숫자만 받을 수 있는 래핑함수 만들기
// 실행예. repeatA(3) -> 'aaa'
// 1. bind를 사용해서 만들어 보자
// 2. curry1이라는 함수를 사용해서 만들어 보자

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

// Q. applicants 중에서 이름만 추출

/*-------------------------------------------------------------- reduce */
// 인자를 줄여가며 하나의 값으로 수렴// 기본
range(10).reduce((accumulator, currentValue) => accumulator + currentValue);
// 초기값 지정
range(10).reduce((accumulator, currentValue) => accumulator + currentValue, 10);
// index 활용
range(10).reduce((accumulator, currentValue, index) => { console.log('now index : ' + index); return accumulator + currentValue;}, 0);
// 원본 배열 활용
range(10).reduce((accumulator, currentValue, index, arr) => { accumulator.push(arr.slice(index)); return accumulator; }, []);

// Q. 1~10을 인자로 가진 배열의 모든 숫자를 곱하기.
// range(10, 1).reduce( ... );

// Q. [1,2,3,4,5] 배열을 인덱스를 키로 갖고 현재 값의 제곱을 값으로 갖는 배열로 변형
// [{0:1}, {1:4}, {2:9}...]

// Q. 추상화하여 로직을 주입하는 방식으로 바꾸기
// function reduceFunc(arr, func) { ... }
// 이런 식으로 실행 reduceFunc([1,2,3], (accum, curr)=>accum+curr);

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
/*
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
*/

var repeat100 = rightCurry(repeatStr, 100);

// [12,23,5,2,,6,3,4,2]을 숫자의 대소비교로 정렬
[12,23,5,2,6,3,4,2].sort((a, b) => a-b);

/*-------------------------------------------------------------- slice */
// 배열을 시작인덱스부터 종료 인덱스까지 자르는 새로운 배열 리턴
// [].slice(시작인덱스, 종료인덱스)
// 원본을 건드리지 않는다
var arr = [1, 2, 3, 4, 5];
var newArr = arr.slice(1, 3);
console.log(newArr);
console.log(arr);

/*-------------------------------------------------------------- every */
// 모든 요소가 해당 조건을 만족하는지 검사. 모두 만족해야 true, 하나라도 만족하지 않으면 false, &&(and) 연산자와 같다
[1, 2, 3, 4, 5].every(function (ele) {
    return ele > 0;
});

/*-------------------------------------------------------------- splice */
// 배열을 시작인덱스부터 갯수만큼 삭제(삭제된 값 리턴)
// [].slice(시작인덱스, 삭제할 갯수, 추가값1, 추가값2, ...)
var newArr = arr.splice(1, 3);
console.log(newArr);
console.log(arr);

// 값을 추가하는 경우
arr = [1, 2, 3, 4, 5];
newArr = arr.splice(1, 3, 7, 8);
console.log(newArr);
console.log(arr);

// Q. 위의 함수를 추상화해서 로직을 주입하는 방식으로 바꿔보자
// function isAllValid(arr, isValid) { ... } 구현


// Q. data를 앞에서부터 50개의 요소 newData에 복사

// Q. 복사한 데이터 중 앞의 20개는 삭제하고 삭제한 곳에 99, 100을 넣기

// Q. 역순으로 정렬

// Q. 해당 데이터를 5의 배수만 있는 배열로 변경

// Q. 해당 데이터가 모두 5의 배수인지 확인

// Q. 해당 데이터중 하나라도 3의 배수인지 확인

// Q. 해당 데이터의 3의 배수인 값 가져오기

// Q. 해당 데이터의 3의 배수인 값의 인덱스 가져오기

// Q. 해당 데이터를 아래와 같은 형태로 바꾸기
// [{idx:0, value:100}, {idx:1, value:50} ... ];

// Q. 해당 데이터를 아래와 같은 형태로 바꾸기
// 예 : [ {0: 100}, {1: 50}, ...]


// 메서드 체인 - 위와 같은 흐름을 제어하기 위한 기본구조
function createPerson() {
    var firstName = "";
    var lastName = "";
    var age = 0;

    return {
        setFirstName: function(fn) {
            firstName = fn;
            return this;
        },
        setLastName: function(ln) {
            lastName = ln;
            return this;
        },
        setAge: function(a) {
            age = a;
            return this;
        },
        toString: function() {
            return [firstName, lastName, age].join(' ');
        }
    };
}

/*
 console.log(
 createPerson()
 .setFirstName('Mike')
 .setLastName('Fogus')
 .setAge(108)
 .toString()
 );
 */


// _.chain : Returns a wrapped object.
//  Calling methods on this object will continue to return wrapped objects until value is called.

/*
 console.log(
 _.chain(library)
 .pluck('title')
 .sort()
 );
 */

/*
 console.log(
 _.chain(library)
 .pluck('title')
 .sort()
 .value()
 );
 */


var TITLE_KEY = 'titel';

// ... 꽤 많은 코드

/*
 console.log(
 _.chain(library)
 .pluck(TITLE_KEY)
 .sort()
 .value()
 );
 */

// Invokes interceptor with the object, and then returns object. The primary purpose of this method is to "tap into" a method chain, in order to perform operations on intermediate results within the chain.

/*
 _.chain(library)
 .tap(function (o) { console.log(o); })
 .pluck(TITLE_KEY)
 .sort()
 .value();
 */

/*
 _.chain(library)
 .pluck(TITLE_KEY)
 .tap(function (o) { console.log(o); })
 .sort()
 .value();
 */

function LazyChain(obj) {
    this._calls  = [];
    this._target = obj;
}

LazyChain.prototype.invoke = function(methodName /*, args */) {
    var args = _.rest(arguments);

    this._calls.push(function(target) {
        var meth = target[methodName];

        return meth.apply(target, args);
    });

    return this;
};

LazyChain.prototype.force = function() {
    return _.reduce(this._calls, function(target, thunk) {
        return thunk(target);
    }, this._target);
};

LazyChain.prototype.tap = function(fun) {
    this._calls.push(function(target) {
        fun(target);
        return target;
    });

    return this;
}









