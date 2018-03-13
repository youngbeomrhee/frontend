/**
 * Created by whybe on 2018. 1. 21..
 */
function timer(func, maxCount) {
    var start = new Date().getTime();
    maxCount = maxCount? maxCount: 1;
    for (var n = 0; n < maxCount; n++) {
        func();
    }
    var elapsed = new Date().getTime() - start;
    return elapsed;
}

function lazyExec(func, arr) {
    return ()=>func.apply(null, arr);
}

var loopCount = 10000000,
    timeCost = timer(lazyExec((a,b)=>a+b, [1,2]), loopCount);
console.log('덧셈 함수 ' + loopCount + '회 실행에 소요된 시간 : ' + timeCost + ' ms');


var lazyTimeCost = lazyExec(timer, [lazyExec((a,b)=>a+b, [1,2]), loopCount]);
for(var i=0; i<10; i++) {
    timeCost = lazyTimeCost();
    console.log('덧셈 함수 ' + loopCount + '회 실행에 소요된 시간 : ' + timeCost + ' ms');
}

function getLoopTestTime(setTimerFunc, count) {
    var execTimes = [], timeCost;
    for(var i=0; i<count; i++) {
        timeCost = setTimerFunc();
        execTimes.push(timeCost);
    }
    return execTimes;
}

function setTimerFunc(func, params, loopCount) {
    return lazyExec(timer, [lazyExec(func, params), loopCount]);
}

var setTestFunc = setTimerFunc((a,b)=>a+b, [1,2], loopCount);
var loopLoopCount = 10;
var loopTestTime = getLoopTestTime(setTestFunc, loopLoopCount);
console.log('덧셈함수를 ' + loopCount + '번 실행을 ' + loopLoopCount + '번 수행한 시간 : ' + loopTestTime);

function getLoopLoopTestTime(func, params, loopCount, loopCountAll) {
    return getLoopTestTime(setTimerFunc(func, params, loopCount), loopCountAll);
}

var loopLoopTestTime = getLoopLoopTestTime((a,b)=>a+b, [1,2], loopCount, loopLoopCount);
console.log('덧셈함수를 ' + loopCount + '번 실행을 ' + loopLoopCount + '번 수행한 시간 : ' + loopLoopTestTime);

function testTimeReport(costTimes) {
    var copied = costTimes.slice();
    return {
        'average': copied.reduce((a,b)=>(a+b)/2),
        'min': copied.sort()[0],
        'max': copied[copied.length-1],
        'originalData': costTimes
    }
}

console.log(testTimeReport(loopLoopTestTime));


// TODO : 위의 코드는 함수간의 의존관계가 강하다. validation + 생성자, 더블바인딩 등을 통해 강제할 수 있는 방법 찾아보기
// TODO : 위의 과정에 기존의 코드를 고치지 않고 선행조건, 후행조건을 사용해서 검증해보기
// TODO : 범용적으로 쓸 수 있는 타입체크 함수 만들어보기
/*
    validate(func, [[valid1func, msg1], [valid2func, msg2], ...])
 */

