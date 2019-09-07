**
 * Created by KOSTI on 2017-09-27.
 */

/**
 * 랜덤숫자 구하기
 * @param range
 * @param start (
 * @returns start||1~range까지의 랜덤숫자
 */
function randomNum(range, start) {
    return Math.floor(Math.random()*range+1+(start||0));
}

function doFun(param, fun) {
    return fun(param);
}

function record(fun, params, count) {
    let board = {}, i=0;
    for(;i<count;i++) {
        let result = fun.apply(null, params);
        board[result] ? board[result] = Number.parseInt(board[result])+1 : board[result] = 1;
    }
    return board;
}

const testList = ["a", "b"];

record(doFun, [testList, (list)=>{ return list[randomNum(list.length)-1]}], 100);
record(doFun, [testList, (list)=>{ return list[randomNum(list.length)-1]}], 1000);
record(doFun, [testList, (list)=>{ return list[randomNum(list.length)-1]}], 10000);
record(doFun, [testList, (list)=>{ return list[randomNum(list.length)-1]}], 100000);
record(doFun, [testList, (list)=>{ return list[randomNum(list.length)-1]}], 1000000);