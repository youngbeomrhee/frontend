/**
 * Created by whybe on 2017. 4. 14..
 */

function FuncA() {}
var funcA1 = new FuncA();

console.dir(funcA1);

FuncA.prototype.addedMethod = function(){ console.log("I'm added"); };

console.dir(funcA1);






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






Person.prototype.getName = function () {
    return 'Hello, ' + this.name;
}

console.log(personA.getName());
console.log(personB.getName());
console.log(personC.getName());






for (var obj in personA) {
    console.log('name : ', obj, ' / hasOwnProperty : ' + personA.hasOwnProperty(obj));
}






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








var a = {
    func : function(){ console.log(this.val); }
};

var b = Object.create(a);
var c = Object.create(b);
var d = Object.create(c);
var e = Object.create(d);

b.val = 'b.val';
a.val = 'a.val';
e.func();  // b.val

e .__proto__ .__proto__ .__proto__ .__proto__ === a; // true

var outerValue = 'outerValue';

function outerFunction() {
    console.log(outerValue == 'outerValue');
}

outerFunction();








var outerValue = 'outerValue';

var later;

function outerFunction() {

    var innerValue = 'innerValue‘

    function innerFunction() {
        console.log(outerValue);
        // innerValue는 있을까?
        console.log(innerValue);
    }

    later = innerFunction;
}

outerFunction();

later();









var outerValue = 'outerValue';

var later;

function outerFunction() {
    // 함수 내에 변수를 하나 선언한다. 이 변수의 유효 범위는 함수 내부로 제한이 되고,
    // 함수 외부에서는 접근할 수 없다.
    var innerValue = 'innerValue'

    // inner 함수에 매개변수를 추가한다.
    function innerFunction(paramValue) {
        console.log(outerValue);
        console.log(innerValue);
        console.log(paramValue);    // 매개변수를 볼 수 있는지 테스트
        console.log(tooLate);    // 클로저가 함수가 선언된 이후에 정의된 변수를 볼 수 있는지 테스트
    }

    later = innerFunction;
}

console.log(tooLate);  // outer closure에서는 tooLate를 쓸 수 없다.

// innerFunction을 정의한 후에 변수를 선언
var tooLate = 'tooLate';
outerFunction();

later('paramValue');









var uniqueId = function(){
    if(!arguments.callee.id){
        arguments.callee.id = 0;
    }
    return arguments.callee.id++;
}

uniqueId();  // 0
uniqueId();  // 1
uniqueId();  // 2

var uniqueId = function(){
    if(!arguments.callee.id){
        arguments.callee.id = 0;
    }
    return arguments.callee.id++;
}

uniqueId();  // 0
uniqueId();  // 1
uniqueId();  // 2

// id를 0으로 초기화 할 수 있을까?
uniqueId.id = 0;

uniqueId();  // 0









var uniqueId = (function(){
    var id = 0;
    return function(){
        return id++;
    }
})();

uniqueId();  // 0
uniqueId();  // 1
uniqueId();  // 2
uniqueId();  // 3

// id를 0으로 초기화 할 수 있을까?









var uniqueId = (function(){
    var id = 0;
    return function(){
        return id++;
    }
})();

uniqueId();  // 0
uniqueId();  // 1
uniqueId();  // 2
uniqueId();  // 3

// 0으로 초기화
uniqueId.id = 0 // ?
uniqueId();  // 4









function DtoObj(initVal) {
    var val = initVal;

    this.getVal = function () {  // this는 새로 만들어진 객체를 가리킴
        return val;
    };

    this.setVal = function(pVal) {
        val = pVal;
    }
}

var dto = new DtoObj(3);

// dto 객체의 내부 변수는 getter를 통해서만 접근하여 값을 받을 수 있다.
console.log(dto.getVal()); // 3
// dto 객체의 내부 변수는 setter를 통해서만 접근하여 값을 바꿀 수 있다.
dto.setVal(4);
console.log(dto.getVal()); // 4
dto.val = 5;
console.log(dto.getVal()); // 4





function GoodWaffle() {
    if(!(this instanceof GoodWaffle)) {
        return new GoodWaffle();
    }
    this.tastes = 'yummy';
}

var waffle = new GoodWaffle();
var waffle2 = new GoodWaffle();

console.log(waffle instanceof GoodWaffle);
console.log(waffle2 instanceof GoodWaffle);


GoodWaffle.call(new GoodWaffle);




var GoodWaffle = (function(){
    var RealWaffle = function(){};
    RealWaffle.prototype.xxx = xxx;

    return function(){
        return new RealWaffle();
    }
})();


var waffle = new GoodWaffle();
var waffle2 = new GoodWaffle();













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




// class를 활용해서 구현

class Rectangle {
    constructor(w, h) {
        this.width = w;
        this.height = h;
    }
    area() {
        return '넓이 : ' + this.width * this.height;
    }
}

class PositionedRectangle extends Rectangle {
    constructor(x, y, w, h) {
        super(w, h);
        this.x = x; // 사각형의 좌표를 저장한다.
        this.y = y;
    }
    getPosition() {
        return 'x : ' + this.x + ' / y : ' + this.y;
    }
}

console.log( positioned_rect.getPosition());
console.log( positioned_rect.area());

console.log(positioned_rect instanceof PositionedRectangle
    && positioned_rect instanceof Rectangle
    && positioned_rect instanceof Object);





// 수정 전: 전역 변수 5개
// 경고: 안티패턴이다.

// 생성자 함수 2개
function Parent() {}
function Child() {}

// 변수 1개
var some_var = 1;

// 객체 2개
var module1 = {};
module1.data = {a: 1, b: 2};
var module2 = {};








// 수정 후: 전역 변수 1개

// 전역 객체
var MYAPP = {};

// 생성자
MYAPP.Parent = function () {};
MYAPP.Child = function () {};

// 변수
MYAPP.some_var = 1;

// 객체 컨테이너
MYAPP.modules = {};

// 객체들을 컨테이너 안에 추가한다.
MYAPP.modules.module1 = {};
MYAPP.modules.module1.data = {a: 1, b: 2};
MYAPP.modules.module2 = {};








var MYAPP = MYAPP || {};

MYAPP.makeNS = function (ns_string) {
    var parts = ns_string.split('.'),
        parent = MYAPP,
        i;
    // 처음에 중복되는 전역 객체명은 제거한다.
    if(parts[0] === "MYAPP") {
        parts = parts.slice(1);
    }

    for (i = 0; i < parts.length; i++) {
        // 프로퍼티가 존재하지 않으면 생성한다.
        if(typeof parent[parts[i]] === "undefined") {
            parent[parts[i]] = {};
        }

        parent = parent[parts[i]];
    }
    return parent;
};

// 반환 값을 지역 변수에 할당한다.
var module2 = MYAPP.makeNS('MYAPP.modules.module2');
console.log(module2 === MYAPP.modules.module2);

// 첫부분의 'MYAPP'을 생략하고도 쓸 수 있다.
MYAPP.makeNS('modules.module51');

// 아주 긴 네임스페이스를 만들어보자.
MYAPP.makeNS('once.upon.a.time.there.was.this.long.nested.property');

console.dir(MYAPP);





var myNs;

(function () {

    // 비공개 멤버
    var privateName = 'foobar';

    // 공개될 부분을 구현한다.
    myNs = {
        // 특권 메서드
        getName: function () {
            return privateName;
        }
    };
})();

console.log(myNs.getName());
console.log(myNs.privateName);






var myNs = (function () {

    // defined within the local scope
    var privateMethod1 = function () { console.log('privateMethod1 has called'); };
    var privateMethod2 = function () { console.log('privateMethod2 has called'); };
    var privateProperty1 = 'foobar';

    return {
        // 외부에 공개할 메서드를 매핑한다.
        publicMethod1: privateMethod1,
        properties:{
            publicProperty1: privateProperty1
        },
        utils:{
            publicMethod2: privateMethod2
        }
    };
})();

myNs.publicMethod1();
myNs.utils.publicMethod2();
console.log(myNs.properties.publicProperty1);







