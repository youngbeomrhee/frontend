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

