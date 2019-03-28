"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/* Hello World of Generics */
// 특정한 타입을 지정하는 경우
(function () {
    function identity(arg) {
        return arg;
    }
    var val = identity(3);
    val = identity(5);
    // val = identity('str');   // 선언시 지정한 타입이 아니므로 에러
    // val = identity(true);
    // val = identity({});
});
// 모든 타입을 지정하는 경우 => 타입지정의 의미가 없다
(function () {
    function identity(arg) {
        return arg;
    }
    // 모든 타입으로 지정가능하기 때문에 타입지정의 의미가 없다
    var val = identity(3);
    val = identity(5);
    val = identity('str');
    val = identity(true);
    val = identity({});
});
// The way of capturing the type of the argument
(function () {
    function identity(arg) {
        return arg;
    }
    var val = identity(3);
    val = identity(5);
    // val = identity('str');   // 초기에 할당한 타입이 아니므로 에러
    // val = identity(true);
    // val = identity({});
    // a call with type argument
    var val2 = identity('myStr');
    // val2 = identity(true);
    // val2 = identity({});
    // type argument inference
    var val3 = identity('myStr');
    // val3 = identity(true);
    // val3 = identity({});
});
/* Generic type variables */
(function () {
    function identity(arg) {
        return arg;
    }
    function loggingIdentity(arg) {
        // console.log(arg.length);  // 오류 : T는 .length 메소드를 가지고 있지 않습니다.
        return arg;
    }
    function loggingIdentity2(arg) {
        console.log(arg.length); // Array는 .length 멤버가 있습니다. 오류 없음.
        return arg;
    }
    function loggingIdentity3(arg) {
        console.log(arg.length); // Array는 .length 멤버가 있습니다. 오류 없음.
        return arg;
    }
    var logging = loggingIdentity([1, 2, 3]);
    var logging1 = loggingIdentity(2);
    var logging2 = loggingIdentity2([1, 2, 3]);
    var logging3 = loggingIdentity3([1, 2, 3]);
})();
/* Generic Types */
// 함수 자체의 타입과 제네릭 인터페이스를 만드는 방법
//
(function () {
    function identity(arg) {
        return arg;
    }
    var myIdentity = identity;
})();
// 파라미터이 이름이 달라도 무방
(function () {
    function identity(arg) {
        return arg;
    }
    var myIdentity = identity;
})();
// as object literal type
(function () {
    function identity(arg) {
        return arg;
    }
    var myIdentity = identity;
})();
// 인터페이스 정의
(function () {
    function identity(arg) {
        return arg;
    }
    var myIdentity = identity;
})();
// Generic 매개변수를 인터페이스의 매개변수로 지정
(function () {
    function identity(arg) {
        return arg;
    }
    var myIdentity = identity;
})();
/* Generic Classes */
(function () {
    var GenericNumber = /** @class */ (function () {
        function GenericNumber() {
        }
        return GenericNumber;
    }());
    var myGenericNumber = new GenericNumber();
    myGenericNumber.zeroValue = 0;
    myGenericNumber.add = function (x, y) { return x + y; };
    // 다른 타입도 지정 가능
    var stringNumeric = new GenericNumber();
    stringNumeric.zeroValue = "";
    stringNumeric.add = function (x, y) { return x + y; };
    console.log(stringNumeric.add(stringNumeric.zeroValue, "test"));
})();
/* Generic Constraints */
(function () {
    function loggingIdentity(arg) {
        console.log(arg.length); // 이제 .length 프로퍼티가 있으므로 더이상 오류가 없습니다.
        return arg;
    }
    // loggingIdentity(2);
    loggingIdentity({ length: 10, value: 3 });
})();
/* Using Type Parameters in Generic Constraints */
(function () {
    function getProperty(obj, key) {
        return obj[key];
    }
    var x = { a: 1, b: 2, c: 3, d: 4 };
    getProperty(x, "a"); // 오류 없음
    // getProperty(x, "m"); // 오류 : 타입 'm'의 인수를 'a' | 'b' | 'c' | 'd' 에 할당 할 수 없습니다.
})();
/* Using Class Types in Generics */
(function () {
    function create(c) {
        return new c();
    }
})();
(function () {
    var BeeKeeper = /** @class */ (function () {
        function BeeKeeper() {
        }
        return BeeKeeper;
    }());
    var ZooKeeper = /** @class */ (function () {
        function ZooKeeper() {
        }
        return ZooKeeper;
    }());
    var Animal = /** @class */ (function () {
        function Animal() {
        }
        return Animal;
    }());
    var Bee = /** @class */ (function (_super) {
        __extends(Bee, _super);
        function Bee() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return Bee;
    }(Animal));
    var Lion = /** @class */ (function (_super) {
        __extends(Lion, _super);
        function Lion() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return Lion;
    }(Animal));
    function createInstance(c) {
        return new c();
    }
    function createInstance2(c) {
        return new c();
    }
    createInstance(Lion).keeper.nametag; // 타입 체크!
    createInstance(Bee).keeper.hasMask; // 타입 체크!
})();
(function () {
})();
