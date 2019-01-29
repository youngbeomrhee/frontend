/**
 * Created by yblee on 2016-09-27.
 */

function curry(func) {
  var args = Array.prototype.slice.call(arguments, 1);

  return function () {
    return func.apply(null, args.concat(Array.prototype.slice.call(arguments)));
  }
}

function add(x, y) {
  return x + y;
}

var new_func1 = curry(add, 1);
console.log(new_func1(2));


function doManyThing(a, b, c, d, e) {
  return ((a + b) * c - d) / e;
}

var doOnlyDevide = curry(doManyThing, 1, 2, 3, 4);
console.log(doOnlyDevide(2));
console.log(doOnlyDevide(4));
console.log(doOnlyDevide(5));




function addAll(a, b, c) {
  return a + b + c;
}

// 2단계 커리
var addThree = curry(addAll, 3);
console.log(addThree(1, 2));
console.log(addThree(3, 2));
console.log(addThree(5, 1));


var addSeven = curry(addThree, 4);

console.log(addSeven(1));
console.log(addSeven(3));
console.log(addSeven(5));
/*

function multiply(x, y) {
  return x * y;
}

var fiveMultiply = curry(threeAdd, 2);
console.log(fiveMultiply(2));
console.log(fiveMultiply(4));
console.log(fiveMultiply(5));
*/






