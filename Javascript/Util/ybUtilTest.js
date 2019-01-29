/**
 * Created by whybe on 2018. 1. 22..
 */

var ybUtil = (function(){

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

    // var loopCount = 10000000,
    //     timeCost = timer(lazyExec((a,b)=>a+b, [1,2]), loopCount);
    // console.log('덧셈 함수 ' + loopCount + '회 실행에 소요된 시간 : ' + timeCost + ' ms');

/*
    var lazyTimeCost = lazyExec(timer, [lazyExec((a,b)=>a+b, [1,2]), loopCount]);
    for(var i=0; i<10; i++) {
        timeCost = lazyTimeCost();
        console.log('덧셈 함수 ' + loopCount + '회 실행에 소요된 시간 : ' + timeCost + ' ms');
    }
*/

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

    // var setTestFunc = setTimerFunc((a,b)=>a+b, [1,2], loopCount);
    // var loopLoopCount = 10;
    // var loopTestTime = getLoopTestTime(setTestFunc, loopLoopCount);
    // console.log('덧셈함수를 ' + loopCount + '번 실행을 ' + loopLoopCount + '번 수행한 시간 : ' + loopTestTime);

    function getLoopLoopTestTime(func, params, loopCount, loopCountAll) {
        return getLoopTestTime(setTimerFunc(func, params, loopCount), loopCountAll);
    }

    // var loopLoopTestTime = getLoopLoopTestTime((a,b)=>a+b, [1,2], loopCount, loopLoopCount);
    // console.log('덧셈함수를 ' + loopCount + '번 실행을 ' + loopLoopCount + '번 수행한 시간 : ' + loopLoopTestTime);

    function testTimeReport(costTimes) {
        var copied = costTimes.slice();
        return {
            'average': copied.reduce((a,b)=>(a+b)/2),
            'min': copied.sort()[0],
            'max': copied[copied.length-1],
            'originalData': costTimes
        }
    }
    // console.log(testTimeReport(loopLoopTestTime));

    function getRandomNum(range) {
        return Math.floor(Math.random()*range+1);
    }

    function getSign() {
        return Math.random()>0.5 ? 1 : -1;
    }

    return {
        'timer': timer,
        'lazyExec': lazyExec,
        'getLoopLoopTestTime': getLoopLoopTestTime,
        'testTimeReport': testTimeReport
    };
})();

