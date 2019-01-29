/**
 * Created by whybe on 2017. 4. 7..
 */


funcA();
function funcA() { console.log('funcA has called'); } // 호출됨

funcB();
var funcB = function() { console.log('funcB has called'); }; // 에러



console.log(a);
function a() {};
var a = 1;
console.log(a);


console.log(a);
var a = 1;
function a() {};
console.log(a);



console.log(a);
var a = 1;
var a = function(){};
console.log(a);



var a = {
    b: function() {
        console.log(this);
        return this;
    }
}


a.b();
a.b() === a;

var c = a.b;
c();
c() === window;



function func() {
    console.log(this);
}

f();



function strictFunc() {
    'use strict';
    console.log(this);
}
strictFunc();
window.strictFunc();







