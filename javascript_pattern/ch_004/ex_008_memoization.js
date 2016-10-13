/**
 * Created by yblee on 2016-09-27.
 */
var myFunc = function(param) {
  if(!myFunc.cache[param]) {
    var result = {};
    // ... 비용이 많이 드는 수행 ...
    myFunc.cache[param] = result;
  }
  return myFunc.cache[param];
};

// 캐시 저장공간
myFunc.cache = {};



var fact = function () {
  // 초기화
  var cache = {'0' : 1};
  var func = function (n) {
    var result = 0;

    if(cache[n]) {
      result = cache[n];
    } else {
      result = cache[n] = n * func(n-1);
    }
    console.log(n + '! = '+ result);
    return result;
  }

  return func;
}();

fact(10);
fact(20);

// 과제 피보나치 수열을 메모이제이션을 활용하여 구현해보기