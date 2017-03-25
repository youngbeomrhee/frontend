/**
 * Created by YB on 2016-10-09.
 */

// 객체의 존재여부 확인
function existy(x) {
    return x!==undefined && x !== null;
}

// 형에 상관없이 참인지 여부를 확인한다.
function truthy(x) {
    return existy(x) && x!==false;
}

// 조건을 충족하면 실행
function doWhen(cond, action) {
    if(truthy(cond)) {
        return action();
    } else {
        return undefined;
    }
}

function executeIfHasField(target, name) {
    return doWhen(existy(target[name]), function () {
        var result = _.result 
    })
}










