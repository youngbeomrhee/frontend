/**
 * Created by yblee on 2016-09-27.
 */

console.log('\n* 즉시실행함수 - Immediate function');
console.log('\n* 기본형');

(function(){
  console.log('즉시실행함수 실행');
})();

console.log('\n* 연산된 결과를 변수에 할당할 수 있다.');

var result = (function(p1, p2){
  console.log('즉시실행함수 실행');
  return p1 + p2;
})(2, 3);

console.log('result = ', result);


console.log('\n* closure를 사용하여 모듈화 할 수 있다.');

var next = (function () {
  var count = 0;
  return function () {
    return count++;
  };
}());

console.log('next = ', next());
console.log('next = ', next());
console.log('next = ', next());
console.log('next = ', next());



console.log('\n* 즉시 객체 초기화 및 실행을 할 수 있다');

var setObj = ({
  initVal: 0,
  getMsg: function () {
    return '초기값 : ' + this.initVal;
  },
  print: function(msg) {
    console.log(msg);
  },
  init: function (param) {
    this.initVal = param;
    this.print(this.getMsg());
    // 초기화 후에 사용하고 싶다면
    return this;
  }
}).init(3);

setObj.print('print test');





