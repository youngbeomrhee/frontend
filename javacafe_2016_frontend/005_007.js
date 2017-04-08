/**
 * Created by YB on 2016-05-07.
 */
/* 생성자 함수와 this */
function Func(x, y) {
    this.x = x;
    this.y = y;
}

var func = Func(1, 2);


function Func(x, y) {
    this.x = x;
    this.y = y;
}

var func = new Func(1, 2);




/* new 키워드 필수 */

var num = 1;
var num2 = Number(1);
var num3 = new Number(1);

console.log(num === num2);
console.log(num === num3);

console.dir(num);
console.dir(num3);


var func = Func(1, 2);
// func === undefined


/* 공통속성을 추가하는 경우 */

function Person(name) {
    this.name = name;

    this.getName = function () {
        return this.name;
    }

    this.setName = function (name) {
        this.name = name;
    }
}

var me = new Person("yb");  
console.log(me.getName());

me.setName("new yb");
console.log(me.getName());


var personA = new Person("personA");
var personB = new Person("personB");
var personC = new Person("personC");

/* 변경이 발생했을 때 */
personA.getName = function () {
    return 'Hello, ' + this.name;
}

console.log(personA.getName());
console.log(personB.getName());
console.log(personC.getName());



/* 공통속성을 추가하는 경우 - prototype */

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


/* 참조되지 않을 수 있음 */
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



/* 상속을 구현 */
function createObject(parentObj) {
    function Func() {}
    Func.prototype = parentObj;
    return new Func();
}

var personPrototype = {
    getName : function() {
        return this.name;
    }
    , setName : function (name) {
        this.name = name;
    }
};

var student = createObject(personPrototype);

console.log(student.getName());
student.setName('student');
console.log(student.getName());



/* 초깃값을 주고 싶은 경우 */
var personPrototypeFunc = function(name){
    return {
        name : name
        , getName : function() {
            return this.name;
        }
        , setName : function (name) {
            this.name = name;
        }
    }
};

var student2 = createObject(personPrototypeFunc('student2'));

console.log(student2.getName());
student2.setName('student2_changed');
console.log(student2.getName());



/* 재정의 기능 확장 */
function extend(obj, prop) {
    if(!prop) {
        prop = obj;
        obj = this;
    }

    for (var i in prop) {
        obj[i] = prop[i];
    }

    return obj;
}

var added = {
    setAge : function (age) {
        this.age = age;
    }
    , getAge : function () {
        return this.age;
    }
};

extend(student, added);

student.setAge(25);
console.log(student.getAge());


/* 슈퍼클래스와 서브클래스 */
function Rectangle(w, h) {
    this.width = w;
    this.height = h;
}

Rectangle.prototype.area = function () {
    return '넓이 : ' + this.width * this.height;
}

// 아래 코드는 Rectangle 클래스를 어떻게 서브 클래스화 하는지 보여준다
function PositionedRectangle(x, y, w, h) {
    // 생성자 체이닝
   Rectangle.call(this, w, h);

    this.x = x; // 사각형의 좌표를 저장한다.
    this.y = y;
}

// Rectangle를 서브 클래스화 시키려면 명시적으로 프로토타입 객체를 생성해야 한다.
PositionedRectangle.prototype = new Rectangle();

// PositionedRectangle 객체의 constructor를 가지도록 기본값을 다시 할당한다.
PositionedRectangle.prototype.constructor = PositionedRectangle;

PositionedRectangle.prototype.getPosition = function () {
    return 'x : ' + this.x + ' / y : ' + this.y;
}

// 3, 4에 위치한 2x2 사각형
var rect = new PositionedRectangle(3, 4, 2, 2);
console.log(rect.getPosition());    // x : 3 / y : 4
console.log(rect.area());   // 넓이 : 4

// rect 객체는 세 개 클래스의 인스턴스가 된다.
console.log(rect instanceof PositionedRectangle  && rect instanceof Rectangle 
    && rect instanceof Object);     // true



/* 클래스 방식의 상속패턴 완성 */
var inherit = function(Parent, Child) {
    var F = function() {};
    return function(Parent, Child) {
        F.prototype = Parent.prototype;
        Child.prototype = new F();
        Child.prototype.constructor = Child;
        Child.super = Parent.prototype;
        return new Child();
    }
}();

var figure = inherit(Rectangle, PositionedRectangle);

console.dir(figure);



/* 메서드 재정의 */
// 메서드 재정의
Rectangle.prototype.toString = function () {
    return '[' + this.width + ',' + this.height + ']';
}

PositionedRectangle.prototype.toString = function () {
    return '(' + this.x + ',' + this.y + ')' + // PositionedRectangle 필드들
        Rectangle.prototype.toString.apply(this);   // 상위 클래스에 체이닝. 어떤 객체를 참조할지 지정하기 위해 apply()와 함께 호출.
};

console.log(rect.toString());




/* 명령형 프로그래밍 */
function sum(arr) {
    var len = arr.length;
    var i = 0, sum = 0;
    for (; i < len; i++) {
        sum += arr[i];
    }
    return sum;
}

var arr = [1, 2, 3, 4];

console.log(sum(arr));

function multiply(arr) {
    var len = arr.length;
    var i = 0, sum = 1;
    for (; i < len; i++) {
        sum *= arr[i];
    }
    return sum;
}

var arr = [1, 2, 3, 4];

console.log(multiply(arr));



/* 함수형 프로그래밍 */
function reduce(func, arr, memo) {
    var len = arr.length, i= 0, accum = memo;
    for (; i < len; i++) {
        accum = func(accum, arr[i]);
    }
    return accum;
}

var arr = [1, 2, 3, 4];

var sum = function(x, y) {
    return x+y;
}

var multiply = function(x, y) {
    return x*y;
}

console.log(reduce(sum, arr, 0));
console.log(reduce(multiply, arr, 1));


/* 함수 실행시간 */
function getCostTime(func, param, repeatTime) {
    var start = new Date().getTime();
    if(repeatTime) {
        for (var i = 0; i < repeatTime; i++) {
            func(param);
        }
    } else {
        func(param);
    }
    var elapsed = new Date().getTime() - start;
    console.log('소요시간 : ' + elapsed + ' ms');
    return elapsed;
}


getCostTime(function(){
    for (var i = 0; i < 1000000000; i++) {
    }
});


/* Memoization */
var fact = function () {
    var cache = {'0' : 1};
    var func = function (n) {
        var result = 0;

        if(typeof(cache[n]) === 'number') {
            result = cache[n];
        } else {
            result = cache[n] = n * func(n-1);
        }
        console.log(n + '! = '+ result);
        return result;
    }

    return func;
}();

console.log(fact(10));
console.log(fact(20));


/* Memoization - prototype에 선언 */
Function.prototype.memoization = function (key) {
    var arg = Array.prototype.slice.call(arguments, 1);
    this.data = this.data || {};

    return this.data[key] !== undefined ? this.data[key]: this.data[key] = this.apply(this, arg);
}

function myCalculate1(input) {
    return input * input;
}

function myCalculate2(input) {
    return input * input / 4;
}

myCalculate1.memoization(1, 5);
myCalculate1.memoization(2, 4);
myCalculate2.memoization(1, 6);
myCalculate2.memoization(2, 7);

console.log(myCalculate1.memoization(1));
console.log(myCalculate1.memoization(2));
console.log(myCalculate2.memoization(1));
console.log(myCalculate2.memoization(2));


/* Cache를 사용한 피보나치 수열 */
var fibo = function() {
    var cache = {'0' : 0, '1' : 1};

    var func = function (n) {
        if(typeof(cache[n]) === 'number') {
            result = cache[n];
        } else {
            result = cache[n] = func(n-1) + func(n-2);
        }
        return result;
    };
    return func;
}();

console.log(fibo(10));


/* Cache를 사용하는 수열 추상화 */
var cacher = function (cache, func) {
    var calculate = function (n) {
        if(cache[n]!==undefined) {
            result = cache[n];
        } else {
            cache[n] = func(calculate, n);
            result = cache[n];
        }
        return result;
    }
    return calculate;
};

var fact = cacher({'0' : 1}, function (func, n) {   // fact function 초기화
    return n*func(n-1);
});

var fibo = cacher({'0' : 0, '1' : 1}, function (func, n) {  // fibo function 초기화
    return func(n-1) + func(n-2);
});

console.log(fact(3));
console.log(fact(6));

console.log(fibo(3));
console.log(fibo(6));


/* Curry */
function calculate(a, b, c) {
    return a * b + c;
}

function curry(func) {
    var args = Array.prototype.slice.call(arguments, 1);

    return function () {
        return func.apply(null, args.concat(Array.prototype.slice.call(arguments)));
    }
}

var new_func1 = curry(calculate, 1);
console.log(new_func1(2, 3));
var new_func2 = curry(calculate, 1, 3);
console.log(new_func2(3));


/* bind */
var print_all = function (arg) {
    for (var i in this) { console.log(i + " : " + this[i]); }
    for (var j in arguments) { console.log(j + " : " + arguments[j]); }
}

var myobj = {name: "zzoon"};

var myfunc = print_all.bind(myobj);
myfunc();

var myfunc1 = print_all.bind(myobj, 'yb', 'others');
myfunc1('insidejs');


/* each 함수 구현 */
function myEach(obj, fn) {
    if(obj.length == undefined) {
        for (var i in obj) {
            fn.apply(obj[i], [i, obj[i]]);
        }
    } else {
        for (var i = 0; i < obj.length; i++) {
            fn.apply(obj[i], [i, obj[i]]);
        }
    }
    return obj;
}

myEach([1, 2, 3], function (idx, num) {
    console.log(idx + " : " + num);
});

myEach({a:1, b:2}, function (idx, num) {
    console.log(idx + " : " + num);
});



/* Map 함수 구현 */
Array.prototype.map = function (callback) {
    var obj = this;
    var value, mapped_value;
    var A = new Array(obj.length);

    for (var i = 0; i < obj.length; i++) {
        value = obj[i];
        mapped_value = callback.call(null, value);
        A[i] = mapped_value;
    }
    return A;
};

var arr = [1, 2, 3];
var new_arr = arr.map(function (value) {
    return value * value;
});

console.log(new_arr);





/* Reduce 함수 구현 */
Array.prototype.reduce = function (callback, memo) {
    var obj = this;
    var value, accumulated_value = 0;

    for (var i = 0; i < obj.length; i++) {
        value = obj[i];
        accumulated_value = callback.call(null, accumulated_value, value);
    }
    return accumulated_value;
};

var arr = [1, 2, 3];

var accumulated_val = arr.reduce(function (a, b) {
    return a + b;
})

console.log(accumulated_val);





