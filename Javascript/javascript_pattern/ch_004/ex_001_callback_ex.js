/**
 * Created by yblee on 2016-09-27.
 */

// 단순한 콜백패턴
// this가 동적으로 변할 수 있다
function success() {
  console.log('this === success ? ', this === success);
  console.log('콜백함수 호출');
}

function work(callback) {
  console.log('work 이런 저런 작업 처리');
  callback();
}

work(success);


// this를 고정시키는 방법
function betterWork(callback) {
  console.log('betterWork 이런 저런 작업 처리');
  callback.call(callback);
}

betterWork(success);

