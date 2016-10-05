/**
 * Created by yblee on 2016-09-27.
 */

var func = function() {
  console.log('처음에만 실행');
  func = function () {
    console.log('재정의 된 함수');
  }
}

func();
func();
func();


// 이런 방식의 문제점
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