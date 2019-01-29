/**
 * Created by yblee on 2016-10-10.
 */
function existy(x) {
  return x!==null && x!==undefined;
}

function truthy(x) {
  return existy(x) && x!==false;
}

function doWhen(cond, action) {
  if(truthy(cond)) {
    return action();
  } else {
    return undefined;
  }
}

function executeIfHasField(target, name) {
  return doWhen(existy(target[name]), function () {
    // TODO : 작성중
    // var result = 
  });
}








