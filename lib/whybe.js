/**
 * 함수모음
 * Created by yblee on 2016-10-27.
 */

/**
 * 함수와 그 함수를 실행하기 위한 파라미터를 받아서 실행
 * ex : runWithArg(funcA, 1, 2, 3);
 * ex : setTimeout(function(){runWithArg(runTest, 1, 2, 3)}, 3000);
 * @param func, parameters
 * @returns {*}
 */
function runWithArg(func /*, ...args */) {
  var restArgs = Array.prototype.slice.call(arguments, 1);
  return func(restArgs);
}

/**
 * 함수의 실행여부와 파라미터가 제대로 전달됐는지 확인
 * ex : runTest(1,2,3);
 */
function runTest() {
  console.log(`## run with (${Array.prototype.join.call(arguments, ', ')})`);
}



