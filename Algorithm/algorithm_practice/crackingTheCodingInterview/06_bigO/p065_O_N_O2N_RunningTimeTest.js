/**
 * Created by yblee on 2018-03-16.
 */

function timer(func, params, maxCount) {
    let start = new Date().getTime(), n=0;
    for (; n < maxCount; n++) {
        func.apply(null, params);
    }
    var elapsed = new Date().getTime() - start;
    return elapsed;
}

function O_N() {
    let min = Number.MIN_VALUE;
    let max = Number.MAX_VALUE;

    let arr = new Array(100000000);
    let x=0;
    for(; x<arr.length; x++) {
        if(x<min) min = x;
        if(x>min) max = x;
    }
}

function O_2N() {
    let min = Number.MIN_VALUE;
    let max = Number.MAX_VALUE;

    let arr = new Array(100000000);
    let x=0;
    for(; x<arr.length; x++) {
        if(x<min) min = x;
    }
    for(; x<arr.length; x++) {
        if(x>min) max = x;
    }
}

console.log('O(N) : ' + timer(O_N, null, 1));
console.log('O(2N) : ' + timer(O_2N, null, 1));

