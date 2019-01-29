/**
 * Created by yblee on 2017-04-18.
 * 아래의 코드들은 안티패턴과 최적화 패턴을 다룹니다
 * 'TODO : '로 표기된 부분들은 과제이니 직접 구현해 보시면 됩니다.
 */
/*
Javascript patterns 2장 기초편
*/
/* p.14. 안티패턴 : 암묵적 전역 */
function sum(x, y) {
    // 안티패턴: 암묵적 전역
    result = x + y;
    return result;
}
// 의도치 않게 result라는 전역객체가 생김
// TODO : 암묵적 전역을 막으려면?
// -> 코드의 시작에 'use strict'; 선언

/* p.15. 안티패턴 연쇄적 할당 */
function sum(x, y) {
    var a = b  = 0;
    // 아래 코드와 동일한 의미. 암묵적 전역 발생
    // var a = (b = 0);
    // b = 0; var a = b;
}



// var로 선언하지 않은 암묵적 전역 변수는 엄밀히 말하면 변수가 아니라 전역 객체의 프로퍼티가 되게 된다
// 프로퍼티는 delete 메서드로 삭제할 수 있지만 변수는 삭제가 되지 않는다.

var global_var = 1;   // 전역변수
global_novar = 2;   // 암묵적 전역변수
(function () {
    global_fromvar = 3;   // 암묵적 전역변수
})();

delete global_var;
delete global_novar;
delete global_fromvar;


typeof global_var;    // number
typeof global_novar;  // undefined -> 삭제 안됨
typeof global_fromvar;  // undefined -> 삭제 안됨




/* p.16. 범용 전역 객체 */
// 일부 브라우져에서 전역 객체가 없는 경우에는 아래와 같이 할당할 수 있다
var global = (function () { return this; })();

// window 객체가 있으면 사용, 없으면 할당
var window = window || (function() { return this; })();


/* p.17. 단일 var 패턴 */
// var를 코드 제일 첫 줄에 모두 모아서 쓰는 편이 오류를 줄이고 가독성 높은 코드를 만들 수 있다
function func() {
    var a = 1,
        b = 2,
        sum = a + b,
        myobject = {},
        i,
        j;
    // 함수 본문...
}

/* p.18. 호이스팅(hoisting) : 분산된 var 선언의 문제점 */
// 안티패턴
// var가 분산되어 (특히 코드 중간에) 선언된 경우 혼란을 초래할 수 있다
myname = 'global';
function func () {
    console.log(myname);    // local -> global이 나올 것 같지만 undefined가 나온다
    var myname = 'local';
    console.log(myname);
}
func();


// 위의 코드의 var 선언부를 제일 앞으로 가져오면 코드가 명확해진다.
myname = 'global';
function func () {
    var myname;
    console.log(myname);  // 선언만 하고 사용하지 않았으므로 undefined가 나오는게 명확하게 보인다.
    myname = 'local';
    console.log(myname);
}
func();