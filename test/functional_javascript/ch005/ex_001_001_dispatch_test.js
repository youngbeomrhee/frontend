/**
 * Created by YB on 2016-10-23.
 */
var fjs = require('../lib/functional_js.js');
var _ = require('underscore');

console.log('\n### 함수 조립의 핵심');

describe('functional javascript ch005_TODO', function () {
  it('dispatch 함수는 ')
});

/**
 * 함수를 조립해서 다형적인 함수를 만들거나 인자에 따라 다른 동작을 수행하는 함수
 * @returns {Function}
 */
/*
function dispatch(/!* funs *!/) {
  // 넘겨받은 함수들 closure에 저장
  var funs = _.toArray(arguments);
  var size = funs.length;

  return function(target /!*, args *!/) {
    var ret = undefined;
    var args = _.rest(arguments);

    for (var funIndex = 0; funIndex < size; funIndex++) {
      var fun = funs[funIndex];
      //
      var targetConstruct = fjs.construct(target, args);
      ret = fun.apply(fun, targetConstruct);

      if (fjs.existy(ret)) return ret;
    }

    return ret;
  };
}

function logValue(val) {
  console.log(`# value : ${toStr('a')}`);
}

var str = dispatch(fjs.invoker('toString', Array.prototype.toString),
  fjs.invoker('toString', String.prototype.toString));

console.log(`str('a') : ${str('a')}`);
console.log(`str(_.range(10)) : ${str(_.range(10))}`);

Object.prototype.stringify = function() {
  return Object.keys(this).map((key)=> key + ' : ' + this[key]).join(', ');
};

var toStr = dispatch(
  fjs.invoker('toString', Array.prototype.toString),
  fjs.invoker('toString', String.prototype.toString),
  fjs.invoker('stringify', Object.prototype.stringify),
  fjs.invoker('toString', Boolean.prototype.toString),
  fjs.invoker('toString', Number.prototype.toString)
);


console.log(`toStr(1) : ${toStr(1)}`);
console.log(`toStr('a') : ${toStr('a')}`);
console.log(`toStr(_.range(10)) : ${toStr(_.range(10))}`);
console.log(`toStr({a:1, b:2, c:'str'}) : ${toStr({a:1, b:2, c:'str'})}`);
console.log(`toStr(false) : ${toStr(false)}`);



function stringReverse(s) {
  if(!_.isString(s)) return undefined;
  return s.split('').reverse().join('');
}

var rev = dispatch(fjs.invoker('reverse', Array.prototype.reverse), stringReverse);

console.log(`rev([1,2,3]) : ${rev([1, 2, 3])}`);
console.log(`rev('asdfas') : ${rev('asdfas')}`);
console.log(`rev(234) : ${rev(234)}`);

// dispatch가 dispatch의 signature로 사용될 수 있다
var sillyReverse = dispatch(rev, fjs.always("Can't reverse"));

console.log(`sillyReverse([1,2,3]) : ${sillyReverse([1,2,3])}`);
console.log(`sillyReverse('asdfas') : ${sillyReverse('asdfas')}`);
console.log(`sillyReverse(234) : ${sillyReverse(234)}`);

// console.log(` : ${}`);
// console.log(` : ${}`);
// console.log(` : ${}`);
// console.log(` : ${}`);
// console.log(` : ${}`);
// console.log(` : ${}`);
// console.log(` : ${}`);
// console.log(` : ${}`);

var performCommand = dispatch(
  isa('notify', function(obj) { return notify(obj.message); }),
  isa('join', function(obj) { return join(obj.target); }),
  function(obj) { return notify(obj.type); }
)
*/

