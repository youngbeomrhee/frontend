/**
 * Created by YB on 2016-04-30.
 */

/* 함수 vs. 메서드*/

function funcA() {
    /* 코드 블록*/
}

var objA = {
    funcA : function() {
        /* 코드 블록 */
    }
}



/* 함수의 종류 */

funcA();
function funcA() {
    console.log('funcA has called');
} // 호출됨

funcB();
var funcB = function() {
    console.log('funcB has called');
}; // 에러



/* Quiz */
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


/* 그 외의 함수들 */

(function(){
    console.log("Right now!")
})();

function a() {
    return function b() {
    }
}

/* 함수 전달인자 */
function maxNum(/* 어떤 값이 들어와도 상관 없음 */) {
    var max = Number.NEGATIVE_INFINITY;
    for(var idx in arguments) {
        if(!isNaN(arguments[idx]) && arguments[idx]>max) {
            max = Number(arguments[idx]);
        }
    }
    return max;
}

maxNum(1, 21, 3, undefined, 5, 123, false, '1234', 'test');


/* arguments 객체 */
function dirArgu(/*파라미터 선언 없음*/) {
    console.dir(arguments);
}

dirArgu(1);

dirArgu(1,2,3,4,5,6,7);



/* 호출패턴과 this */
var objA = {
    sum : 0
    , add : function(addVal) {
        this.sum += addVal;
        return this.sum;
    }
}

objA.sum;
objA.add(2);
objA.add(3);

var directAddCall = objA.add;
directAddCall(2);


/* 2. 함수호출 - use strict */
function funcA() {
    console.dir(this);
};

console.dir(funcA());


function funcA() {
    "use strict";
    console.dir(this);
};

funcA();
window.funcA();


/* 생성자에서 호출 */

function FuncA() {};
var funcB = new FuncA();

FuncA.prototype.checkThis
    = function(){
    console.dir(this);
};

funcB.checkThis();


/* call과 apply */
function A(a,b,c) {
    console.log(this.x, this.y, a, b, c);
}

A();

A.call({x:1,y:2}, 3, 4, 5);

A.apply({x:1,y:2}, [6, 7, 8]);


/* bind를 통한 this mapping */
var newA = A.bind({x:3,y:4});

var newA2 = A.bind({x:3,y:4,a:5});


/* 함수의 프로토타입 상속 */
function FuncA() {}
var funcA1 = new FuncA();

console.dir(funcA1);

FuncA.prototype.addedMethod = function(){ console.log("I'm added"); };

console.dir(funcA1);


/* 공통속성을 추가하는 경우 */
function Person(name) {  
    this.name = name;
}

Person.prototype.getName = function () { 
    return this.name;
}

Person.prototype.setName = function (name) {
    this.name = name;
}

var personA = new Person("personA");
var personB = new Person("personB");
var personC = new Person("personC");

console.log(personA.getName());
console.log(personB.getName());
console.log(personC.getName());


/* 변경이 발생했을 때 */
Person.prototype.getName = function () {
    return 'Hello, ' + this.name;
}

console.log(personA.getName());
console.log(personB.getName());
console.log(personC.getName());


/* prototype의 몇 가지 속성 */    

for (var obj in personA) {       
    console.log('name : ', obj, ' / hasOwnProperty : ' + personA.hasOwnProperty(obj));
}


/* prototype이 참조되지 않을 수 있다 */

function Circle(r) { 
    this.r = r;
}

Circle.prototype.PI = 3.14;

Circle.prototype.getArea = function () {
    return 2 * this.r * this.PI;
}

var r2 = new Circle(2);
console.log(r2.getArea());

var r3 = new Circle(3);
console.log(r3.getArea());

var r3Alien = new Circle(3);
r3Alien.PI = 4.74; // PI 재정의
console.log(r3Alien.getArea());

/* 크락포드옹 스탈 */
Function.prototype.addMethod = function (name, func) {
    if(!this.prototype[name]) {
        this.prototype[name] = func;
    }
}

function Person(name) {
    this.name = name;
}

Person.addMethod('setName', function(name) {
    this.name = name;
});

Person.addMethod('getName', function () {
    return this.name;
});

var personA = new Person("personA");
var personB = new Person("personB");
var personC = new Person("personC");



/* prototype chaining 맛배기 */
var a = {
    func : function(){ console.log(this.val); }
};

var b = Object.create(a);
var c = Object.create(b);
var d = Object.create(c);
﻿var e = Object.create(d);

b.val = 'b.val';
a.val = 'a.val';
e.func();  // b.val

e .__proto__ .__proto__ .__proto__ .__proto__ === a; // true


/* Quiz */
function aa() {
    var a = 1;
    function b() {
        var a = 2;
        c();
    }
    function c() {
        console.log(a);
    }
    b();
}

aa();

/* 항목별 유효범위 */
function outer() {
    debugger;
    inner();
    var a = 1;
    function inner() {
        var x = 2;
    }
    var b = 2;
    if(a==1) {
        var c = 3;
    }
    console.log(c);
}
outer();


/* 블록 vs. 함수 유효범위 */
if(window) {
    var x =123;
}
console.log(x);


/* 재귀함수를  구현하는 3가지 방법 */
function factorial() {
    return function(x) {
        if (x <= 1)
            return 1;
        else
            return x * arguments.callee(x-1);
    };
}

factorial()(5);

/* 재귀 - Function Declaration */

function factorial(x) {
    if (x <= 1) return 1;
    else return x * factorial(x-1);
}

factorial(5);

/* 재귀 - 메서드(Function Expression) */

var factorial = function recurs(x) {
    if (x <= 1) return 1;
    else return x * recurs(x-1);
}

factorial(5);


/* 재귀 – arguments.callee (deprecated) */

var factorial = function(x) {
    if (x <= 1) return 1;
    else return x * arguments.callee(x-1);
}

factorial(5);
