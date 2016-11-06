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


function set (a) {
  console.log(`step1 has set with ${a}`);
  return function (b) {
    console.log(`step2 has set with ${a}, ${b}`);
    return function (c) {
      console.log(`step3 has set with ${a}, ${b}, ${c}`);
      return function (d) {
        console.log(`step4 has set with ${a}, ${b}, ${c}, ${d}`);
        return function (e) {
          console.log(`step4 has set with ${a}, ${b}, ${c}, ${d}, ${e}`);
          return [a, b, c, d, e];
        };
      };
    };
  };
}



var reducer = partial(condition1(
    validator('integer only', _.isInteger),
    validator('integer only', _.isInteger)
), _.identity);


function condition2(/* validators */) {
  var validators = _.toArray(arguments);

  return function(fun, arg) {
    var errors = mapcat(function(isValid) {
      return isValid(arg) ? [] : [isValid.message];
    }, validators);

    if (!_.isEmpty(errors))
      throw new Error(errors.join(", "));

    return fun(arg);
  };
}


function condition2(){
  var validators = _.toArray(arguments);

  return function(f){
    var arg = _.rest(arguments);
    var err = [];
    validators.forEach((v,idx)=>{
      if( v(arg[idx]) ) err.push(v.message);
    }
    if(err.length) throw new Error('error');
    return f.apply(arg);
  }
}


[1,2,3,4].reduce(partial(condition2(
    validator('첫 번째 인자는 integer형', Number.isInteger),
    validator('두 번째 인자는 integer형', Number.isInteger)
), reducer));
;


// 특정 string을 포함한 키만 가지는 배열 생성
function keysWithStr(obj, str) {
  var containObjs = [];
  for(var key of obj) {
    if (key.indexOf(str)>-1) {
      containObjs.push({key: obj[key]});
    }
  }
  return containObjs;
}