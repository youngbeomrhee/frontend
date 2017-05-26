/**
 * Created by yblee on 2017-05-12.
 * Array 객체 기본 탐구
 * 
 */

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
// A.
range(100).filter(ele => ele%2===0);


// Q. 0~99까지의 배열 중에서 짝수이면서 10보다 크고 30보다 작은 수 구하기
// A.
range(100).filter(ele => ele%2===0 && ele>10 && ele<30);


// Q. [1, 2, '', {}, [], 4, [1,2], '7', true] 중에서 숫자만 뽑아내기
// A.
[1, 2, '', {}, [], 4, [1,2], '7', true].filter(Number.isInteger);


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

// A.
applicants.filter(obj => obj.age && obj.age>=25);


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

// Q. applicants 중에서 이름만 추출
applicants.map(ele=>ele.name);

// Q. applicants 중에서 25세가 넘는 사람들에게는 step1:'pass'라는 키/벨류 추가하기
// A.
applicants = applicants.map(ele => {
  if(ele.age > 25) {
    ele['step1'] = 'pass';
  }
  return ele;
});



/*-------------------------------------------------------------- reduce */
// 인자를 줄여가며 하나의 값으로 수렴
range(10).reduce((accumulator, currentValue) => accumulator + currentValue);
range(10).reduce((accumulator, currentValue, index, array) => accumulator + currentValue, 0);
range(10).reduce((accumulator, currentValue, index, array) => accumulator + currentValue, 0);

// Q. [1,2,3,4,5]을 인덱스를 키로 갖고 현재 값의 제곱을 값으로 갖는 배열로 변형
// A.
[1,2,3,4,5].reduce((accumulator, current, index) =>{
    var temp = {};
    temp[index] = current ** 2;
    accumulator.push(temp);
    return accumulator;
}, []);


function reduceFunc(arr, func) {
    return arr.reduce(func);
}

reduceFunc([1,2,3], (accum, curr)=>accum+curr);

var reducePlus = (accum, curr)=>accum+curr;

reduceFunc([1,2,3], reducePlus);

function setReduce(func) {
  return function (arr) {
      return arr.reduce(func);
  };
}

var reducePlusExec = setReduce(reducePlus);

reducePlusExec([1,2,3,4,5]);


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




