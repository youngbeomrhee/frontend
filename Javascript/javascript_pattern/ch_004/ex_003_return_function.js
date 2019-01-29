/**
 * Created by yblee on 2016-09-27.
 */

var setup = function() {
  var count = 0;
  return function () {
    count += 1;
    console.log(count);
    return count;
  }
}

var next = setup();
next();
next();
next();

