/**
 * Created by YB on 2017-03-25.
 */

/* ------------------------------------------------------------------------------ */
/* ------------------------------------------------------------------------------ */
/* -------------------------------      Quiz    --------------------------------- */
/* ------------------------------------------------------------------------------ */
/* ------------------------------------------------------------------------------ */
/*
 아래에 나오는 함수를 함수형으로 구현해 보는게 문제입니다 :)
 스텝바이 스텝으로 책에 나온 과정처럼 기본 기능 구현 -> 추상화 -> 함수의 조합으로 문제 해결 이렇게 해보시면 좋습니다

 sum(1, 2, 3, 4, 5);
 sumArr([1, 2, 3, 4, 5]);
 safeSum(1, null, 3, 4, 5);
 safeMultiply(1, null, 3, 4, 5);
 checkObj(객체형인지 확인, 특정프로퍼티가 있는지 확인, 특정 프로퍼티의 값이 숫자인지 확인);
*/
// /* sum 함수를 구현하는 가장 초보적인 방법 */
function sum() {
    var args = arguments;
    return Array.prototype.reduce.call(args, function(prev, next) {
        return prev + next;
    });
}

/* 함수형 프로그래밍으로 추상화 */
function doFun(execFun, calcFun) {
    return function() {
        var args = arguments;
        return execFun.call(args, calcFun);
    };
}

/* sum 함수 구현 */
var sum = doFun(Array.prototype.reduce, function(prev, next) { return prev + next; });
// log('sum(1,2,3,4,5) -> ', sum(1,2,3,4,5));

/* 배열 형식을 풀어서 실행할 수 있는 함수 구현 */
/* funcA([1,2,3,4,5]) -> funcB(1,2,3,4,5) */
var runWithArr = function(fun) { return function(arr) { return fun.apply(null, arr); }; };
var sumArr = runWithArr(sum);
// log('sumArr([1,2,3,4,5]) -> ', sumArr([1,2,3,4,5]));


/* 안전(safe)한 배열의 연산을 위해 기본값을 리턴하는 함수 생성 */
function defaults(fun, defVal) {
    return function(/* args */) {
        var args = Array.prototype.map.call(arguments, function(v) {
            return v || defVal;
        });

        return fun(args);
    };
}

/* safeSum 구현 */
var safeSum = defaults(sumArr, 0);

// log('safeSum(1,2,3,4,5) -> ', safeSum(1,2,3,4,5));



// checkObj(객체형인지 확인, 특정프로퍼티가 있는지 확인, 특정 프로퍼티의 값이 숫자인지 확인);
// 타입을 확인할 수 있는 일반 함수 구현
function checkType(p, type) {
    return Boolean(p) && (p).constructor === type;
}

// 타입을 고정시킬 수 있도록 다른 함수로 wrapping
function setCheckType(type, typeName) {
    return function(p) {
        return checkType(p, type);
    };
}

// object 형인지 확인할 수 있는 함수 구현
var isObject = setCheckType(Object.prototype.constructor);

// log("isObject(1) => ", isObject(1));
// log("isObject('str') => ", isObject('str'));
// log("isObject([]) => ", isObject([]));
// log("isObject(null) => ", isObject(null));
// log("isObject(undefined) => ", isObject(undefined));
// log("isObject({}) => ", isObject({}));
// log("isObject({a:1}) => ", isObject({a:1}));

// 숫자형인지 검증
var isNumber = setCheckType(Number.prototype.constructor);

/* 또 다른 validator 구현 */
function checkPropertyType(key, fun, typeName) {

    var f = function (obj) {
        return obj[key] && fun(obj[key]);
    };

    f.message = '해당 object의 프로퍼티 ' + key + '(은)는 ' + typeName + ' 타입이어야 합니다';

    return f;
}


// 모든 조건을 만족시킬 수 있는
var hasProp1Numval = checker(validator('must be a Object', isObject), hasKeys('prop1'), checkPropertyType('prop1', isNumber, 'Number'));

log("hasProp1Numval(1) => ", hasProp1Numval(1));
log("hasProp1Numval([]) => ", hasProp1Numval([]));
log("hasProp1Numval({}) => ", hasProp1Numval({}));
log("hasProp1Numval({prop1: 'str'}) => ", hasProp1Numval({prop1: 'str'}));
log("hasProp1Numval({prop1: 1}) => ", hasProp1Numval({prop1: 1}));


/* ------------------------------------------------------------------------------ */
/* ------------------------------------------------------------------------------ */
/* -------------------------------    Quiz end  --------------------------------- */
/* ------------------------------------------------------------------------------ */
/* ------------------------------------------------------------------------------ */
