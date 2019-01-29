/**
 * Created by yblee on 2016-09-27.
 */

console.log('* 자기 자신을 정의하는 함수');
var func = function() {
  console.log('처음에만 실행');
  func = function () {
    console.log('재정의 된 함수');
  }
}

func();
func();
func();


console.log('\n* 이런 방식의 문제점');
// 다른 이름으로 할당할 경우 원치 않는 결과를 낸다
var func = function() {
  console.log('처음에만 실행');
  func = function () {
    console.log('재정의 된 함수');
  }
}

var newFunc = func;
newFunc();
newFunc();
newFunc();


console.log('\n* 새로운 함수를 리턴하는 방식');
// 단순 초기화의 목적이라면 새로운 함수를 리턴하는 방식이 낫다.
var returnFunc = function() {
  console.log('처음에만 실행');
  return function () {
    console.log('재정의 된 함수');
  }
}

var newFunc2 = returnFunc();
newFunc2();
newFunc2();
newFunc2();


console.log('\n* 생성자 함수를 사용할수도 있다.');
// 단순 초기화의 목적이라면 새로운 함수를 리턴하는 방식이 낫다.
var GenFunc = function() {
  console.log('처음에만 실행');
  return function () {
    console.log('재정의 된 함수');
  }
}

var newFunc2 = new GenFunc();
newFunc2();
newFunc2();
newFunc2();




