/**
 * Created by YB on 2016-06-18.
 */

function getCostTime(func, paramArr, repeatTime) {
    var start = new Date().getTime();
    if(repeatTime) {
        for (var i = 0; i < repeatTime; i++) {
            func.apply(func, paramArr);
        }
    } else {
        func.apply(func, paramArr);
    }
    var elapsed = new Date().getTime() - start;
    console.log('소요시간 : ' + elapsed + ' ms');
    return elapsed;
}


getCostTime(function(){
    for (var i = 0; i < 1000000000; i++) {
    }
});
