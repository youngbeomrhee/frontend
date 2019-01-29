/**
 * Created by whybe on 2018. 4. 28..
 */
const MSG = {};
MSG.errParam = '필수인자가 누락되었습니다.';

function errParam() {
    throw MSG.errParam;
}

function typeCheck(instance, type) {
    if(!(instance instanceof type)) throw new TypeError(type);
}