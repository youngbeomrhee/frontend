/**
 * Created by whybe on 2017. 4. 21..
 * 아래의 코드들은 안티패턴과 최적화 패턴을 다룹니다
 * 'TODO : '로 표기된 부분들은 과제이니 직접 구현해 보시면 됩니다.
 */
/* p.49. 객체리터럴 */

// 리터럴 표기법으로 생성

// 리터럴 표기법 예제

// 빈객체 생성
var dog = {};

// 프로퍼티 추가
dog.name = "Benji";

// 메서드 추가
dog.getName = function () {
    return dog.name;
}

// 프로퍼티와 메서드 값을 변경할 수 있다
dog.getName = function () {
    return 'Fido';
}

// 프로퍼티나 메서드를 완전히 삭제한다
delete dog.name;

// 다른 프로퍼티나 메서드를 추가한다
dog.say = function () {
    return 'Woof!';
}

// 생성과 동시에 프로퍼티와 값을 넣을수도 있다
var dog2 = {
    name: 'Benji',
    getName: function () {
        return this.name;
    }
};


/* p.52. 객체 생성자의 함정 -> new Object로 선언했음에도 불구하고 Object가 아니라 다른 객체가 리턴될 수 있다 */

// 빈 객체
var o = new Object();
console.log(o.constructor === Object);

// Number 객체
var o = new Object(1);
console.log(o.constructor === Number);

// String 객체
var o = new Object('');
console.log(o.constructor === String);

// Boolean 객체
var o = new Object(true);
console.log(o.constructor === Boolean);

// Object에 들어오는 인자의 타입에 따라 해당 생성자 함수를 상속하는 객체가 생성됨
// 모두 안티패턴
// 다음의 사용자정의 생성자함수가 아닌 경우에는 new로 선언하기 보다는 객체리터럴로 선언하는 편이 좋다


/* p.53. 사용자 정의 생성자 함수 */

var Person = function (name) {
    this.name = name;
    this.say = function () {
        return "I'm " + this.name
    };
}

var adam = new Person('Adam');
adam.say();

// 위의 코드의 이면에서는 아래와 같은 일이 벌어진다
var Person = function () {
    // 객체 리터럴로 새로운 객체를 생성한다
    // var this = {};

    // 프로퍼티와 메서드를 추가한다.
    this.name = name;
    this.say = function () {
        return "I'm " + this.name
    };

    // this를 반환한다
    // return this;
}


// TODO : say는 같은 일을 하는 메서드이므로 매번 인스턴스에 추가하는게 비효율적이다. 효율적으로 바꿔보자.



var Person = (function () {
    var RealPerson = function (name) {
        this.name = name;
    };
    RealPerson.prototype.say = function () {
        return "I'm " + this.name
    };
    return function(initName) {
        return new RealPerson(initName);
    }
})();

// 위의 코드는 빈 객체를 생성하는 것처럼 보이지만 실제로는 Person의 프로토타입을 상속받는다.
// 즉, 아래와 같다
// var this = Object.create(Person.prototype)


/* p.54. 생성자의 반환값 */
// 생성자 함수를 new와 함께 호출하게되면 return을 명시하지 않아도 항상 this로 참조되는 객체를 리턴하게 된다.
// return을 명시할 경우 return 되는 객체를 바꿀 수 있다
// new로 선언하지 않고, return도 명시하지 않는다면 아무 것도 리턴하지 않는다 (undefined)


var Objectmaker = function () {
    // 생성자가 다른 객체를 반환하기로 결정했기 때문에 다음의 'name' 프로퍼티는 무시된다
    this.name = "This is it";

    // 새로운 객체를 생성하여 반환한다.
    var that = {};
    that.name = "And that's that";
    return that;   // new로 선언했는지 여부와 상관없이 that이 리턴
}

// test
var o = new Objectmaker();
console.log(o.name);    // And that's that 이 출력

// new를 빼먹었을 때 생기는 일
console.log(window.say());
var alien = Person('alien');
console.log(window.say());      // 생성자함수를 실행하자 의도치 않게 say라는 메서드가 전역에 생성됐다



/* new를 강제하는 패턴 */

// 일반적인 생성자함수
function Waffle() {
    this.tastes = 'yummy';
}

// new를 강제하도록 하는 패턴
function GoodWaffle() {
    if(!(this instanceof GoodWaffle)) {
        return new GoodWaffle();
    }
    this.tastes = 'yummy';
}

var waffle = Waffle(),
    waffle2 = new Waffle(),
    waffle3 = GoodWaffle(),
    waffle4 = new GoodWaffle();

console.log(waffle instanceof Waffle);
console.log(waffle2 instanceof Waffle);
console.log(waffle3 instanceof GoodWaffle);
console.log(waffle4 instanceof GoodWaffle);


// 이 패턴도 완전하지 않다
var whatthe = GoodWaffle.call(new GoodWaffle);
console.log(whatthe instanceof GoodWaffle);


// TODO : 위의 Person은 new와 함께 호출하지 않으면 생성자의 역할을 제대로 할 수 없다 new를 강제하는 패턴으로 바꿔보자.
// 만든 코드가 아래의 출력을 만족해야 통과
// var man = Person('adam');
// console.log(man.name);   // adam
// console.log(man.say());     // I'm adam

// var alien = Person.call(new Person);
// console.log(man.name);   // adam
// console.log(man.say());     // I'm adam




/* p.58. 배열리터럴 */
// 배열을 만드는 안티패턴
var a = new Array('a', 'b', 'c');
console.log(a);

// 똑같은 배열을 만드는 리터럴
var a = ['a', 'b', 'c'];
console.log(a);

// 요소가 하나 있는 배열을 만들 경우 문제 발생
var a = new Array(3);
console.log(a);

// 요소가 하나이면서 숫자일 경우에는 아래처럼 리터럴 표기법만으로 생성 가능하다.
var a = [3];
console.log(a);


// 배열인지 판단하는 메서드 생성
if(typeof Array.isArray === 'undefined') {
    Array.isArray = function (arg) {
        return Object.prototype.toString.call(arg) === '[object Array]';
    }
}
// TODO : 위의 코드의 문제점 두 가지 찾아보고 개선해보기
if(!Array.isArray) {    // 이렇게 표현하는 것이 더 범용적
    Array.isArray = function (arg) {
        return arg.constructor === Array;
    }
}


/* p.61. JSON 다루기 */

// 문자열을 (JSON) 객체로 파싱하는 방법

var jstr = '{"mykey": "my value"}';

// 안티패턴
var data = eval('(' + jstr + ')');
console.log(data);

// 권장안
var data = JSON.parse(jstr);
console.log(data);

// 객체를 문자열로 바꾸는 메서드
console.log(JSON.stringify(data));


/* p.62. 정규 표현식 */

// 정규식을 표현하는 두 가지 방법
// 정규식 리터럴
var reg = /||/gm;

// 생성자
var reg = new RegExp("\\\\", "gm");

var no_letters = 'abc123XYZ'.replace(/[a-z]/gi, '');
console.log(no_letters);

// 생성자를 사용할 경우 작동원리를 알아야 되고 특수문자를 escape하기 위해 추가적인 역슬래쉬가 들어가서 번거롭다
// 단, 런타임에 문자열로 정규식과 플래그가 들어갈 경우에는 생성자 방식을 사용해야 한다.

// TODO : 정규식 객체를 생성해주는 함수 만들기




/* p.64. 원시 데이터 타입 래퍼 */

// TODO : var n = 100; vs. var n = new Number(100);의 차이점은?




/* p.66. Error 객체 :  */

// 스펙에 기본적으로 Error 객체는 name과 message를 갖는다는 규격은 있지만 구현은 브라우져 벤더사별로 제각각
// try catch 문에서 error 객체를 받을 때도 임의의 프로퍼티를 가질 수 있기 때문에 창의적으로 구현 가능
function genericErrorHandler() { console.log('에러나서 다시 열일 중')};

try {
    // 에러를 발생
    throw {
        name: 'MyErrorType',    // 임의의 에러 타입
        message: 'oops',
        extra: 'This was rather embrassing',
        remedy: genericErrorHandler // 에러를 처리할 함수
    }
} catch (e) {
    // 사용자에게 공지한다
    console.log(e.message);

    // 훌륭하게 에러를 처리한다
    e.remedy();
}


// TODO : Object, Function, Array, 정규식, 원시 래퍼 객체, Error 객체 중 꼭 new를 써야 되는 경우를 뽑아보기. 그 경우를 제외하면 나머지는 다 리터럴 방식이 더 낫다.

// 정리 : 결국 대부분의 경우에 new를 사용한 생성방법보다는 리터럴 표기법이 권장된다.
// 어쩔 수 없이 new로 사용되는 경우만 정리하면 나머지는 리터럴 표기법으로 사용하면 된다.

