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
/* Intersection Types */
(function () {
    function extend(first, second) {
        var result = {};
        for (var id in first) {
            result[id] = first[id];
        }
        for (var id in second) {
            if (!result.hasOwnProperty(id)) {
                result[id] = second[id];
            }
        }
        return result;
    }
    var Person = /** @class */ (function () {
        function Person(name) {
            this.name = name;
        }
        return Person;
    }());
    var ConsoleLogger = /** @class */ (function () {
        function ConsoleLogger() {
        }
        ConsoleLogger.prototype.log = function () {
            // ...
        };
        return ConsoleLogger;
    }());
    var jim = extend(new Person("Jim"), new ConsoleLogger());
    console.dir(jim);
    var x = extend({ a: "hello" }, { b: 42 });
    var s = x.a;
    var n = x.b;
    var x2 = extend({ a: 'hello' }, { b: 42 });
    var s2 = x2.a;
    var n2 = x2.b;
    var x3 = { a: 'hello', b: 42 };
    var s3 = x3.a;
    var n3 = x3.b;
})();
/* Intersection types examples */
(function () {
    var ab = { a: 1, b: 'str' };
    var a = ab;
    var b = ab;
    var xy = { p: ab };
    var f = function (a, b) { };
    f("hello", "world"); // Ok
    f(1, 2); // Ok
    // f(1, "test");         // Error
    function func(a, b) { }
    ;
    func('str', 1);
    func(1, 1);
    func(1, 'str');
    // func(1, false); // Error
})();
/* Union Types */
(function () {
    /**
     * Takes a string and adds "padding" to the left.
     * If 'padding' is a string, then 'padding' is appended to the left side.
     * If 'padding' is a number, then that number of spaces is added to the left side.
     */
    function padLeft(value, padding) {
        if (typeof padding === "number") {
            return Array(padding + 1).join(" ") + value;
        }
        if (typeof padding === "string") {
            return padding + value;
        }
        throw new Error("Expected string or number, got '" + padding + "'.");
    }
    console.log(padLeft("Hello world", 4)); // returns "    Hello world"
    // let indentedString = padLeft("Hello world", true); // passes at compile time, fails at runtime.
})();
(function () {
    /**
     * Takes a string and adds "padding" to the left.
     * If 'padding' is a string, then 'padding' is appended to the left side.
     * If 'padding' is a number, then that number of spaces is added to the left side.
     */
    function padLeft(value, padding) {
        // ...
    }
    // let indentedString = padLeft("Hello world", true); // errors during compilation
})();
(function () {
    function getSmallPet() {
        // ...
        var result = { swim: function () { }, layEggs: function () { return undefined; } };
        return result;
    }
    var pet = getSmallPet();
    pet.layEggs(); // okay
    // pet.swim();    // errors
    /* Type Guards and Differentiating Types */
    // 이러한 각 프로퍼티의 액세스는 오류를 발생시킵니다.
    // if (pet.swim) {
    //     pet.swim();
    // }
    // else if (pet.fly) {
    //     pet.fly();
    // }
    if (pet.swim) {
        pet.swim();
    }
    else {
        pet.fly();
    }
    /* User-Defined Type Guards */
    function isFish(pet) {
        return pet.swim !== undefined;
    }
    // Both calls to 'swim' and 'fly' are now okay.
    if (isFish(pet)) {
        pet.swim();
    }
    else {
        pet.fly();
    }
})();
(function () {
    var str_n_num;
    // str_n_num = { a: 'str'};    // str_n_num type Error
    // str_n_num = { b: 1};    // str_n_num type Error
    // str_n_num = { a: 1, b: 1};  // a type Error
    // str_n_num = { a: 'str', b: 'str'};  // b type Error
    str_n_num = { a: 'str', b: 1 };
    var str_u_num;
    // str_u_num = { a: 1 }    // a type Error
    str_u_num = { a: 'str' };
    // str_u_num = { b: 'str' }    // b type Error
    str_u_num = { b: 1 };
    str_u_num = { a: 'str', b: 1 };
    str_u_num = { a: 'str', b: 'str' };
})();
/* typeof type guards */
(function () {
    function isNumber(x) {
        return typeof x === "number";
    }
    function isString(x) {
        return typeof x === "string";
    }
    function padLeft(value, padding) {
        if (isNumber(padding)) {
            return Array(padding + 1).join(" ") + value;
        }
        if (isString(padding)) {
            return padding + value;
        }
        throw new Error("Expected string or number, got '" + padding + "'.");
    }
})();
(function () {
    function padLeft(value, padding) {
        if (typeof padding === "number") {
            return Array(padding + 1).join(" ") + value;
        }
        if (typeof padding === "string") {
            return padding + value;
        }
        throw new Error("Expected string or number, got '" + padding + "'.");
    }
})();
/* instanceof type guards */
(function () {
    var SpaceRepeatingPadder = /** @class */ (function () {
        function SpaceRepeatingPadder(numSpaces) {
            this.numSpaces = numSpaces;
        }
        SpaceRepeatingPadder.prototype.getPaddingString = function () {
            return Array(this.numSpaces + 1).join(" ");
        };
        return SpaceRepeatingPadder;
    }());
    var StringPadder = /** @class */ (function () {
        function StringPadder(value) {
            this.value = value;
        }
        StringPadder.prototype.getPaddingString = function () {
            return this.value;
        };
        return StringPadder;
    }());
    function getRandomPadder() {
        return Math.random() < 0.5 ?
            new SpaceRepeatingPadder(4) :
            new StringPadder("  ");
    }
    // 'SpaceRepeatingPadder | StringPadder' 타입입니다.
    var padder = getRandomPadder();
    if (padder instanceof SpaceRepeatingPadder) {
        padder; // 타입이 'SpaceRepeatingPadder'로 좁혀졌습니다.
    }
    if (padder instanceof StringPadder) {
        padder; // 타입이 'StringPadder'로 좁혀졌습니다.
    }
})();
/* Nullable types */
(function () {
    var s = "foo";
    // s = null; // error, 'null' is not assignable to 'string'
    var sn = "bar";
    sn = null; // ok
    // sn = undefined; // error, 'undefined' is not assignable to 'string | null'
})();
(function () {
    function f(x, y) {
        return x + (y || 0);
    }
    f(1, 2);
    f(1);
    f(1, undefined);
    // f(1, null); // error, 'null'은 'number | undefined' 타입에 할당할 수 없습니다.
})();
(function () {
    var C = /** @class */ (function () {
        function C() {
        }
        return C;
    }());
    var c = new C();
    c.a = 12;
    // c.a = undefined; // error, 'undefined' is not assignable to 'number'
    c.b = 13;
    c.b = undefined; // ok
    // c.b = null; // error, 'null' is not assignable to 'number | undefined'
})();
/* Type guards and type assertions */
(function () {
    function f(sn) {
        if (sn == null) {
            return "default";
        }
        else {
            return sn;
        }
    }
})();
(function () {
    function f(sn) {
        return sn || "default";
    }
})();
(function () {
    // function broken(name: string | null): string {
    //     function postfix(epithet: string) {
    //         return name.charAt(0) + '.  the ' + epithet; // error, 'name' is possibly null
    //     }
    //     name = name || "Bob";
    //     return postfix("great");
    // }
    function fixed(name) {
        function postfix(epithet) {
            return name.charAt(0) + '.  the ' + epithet; // ok
        }
        name = name || "Bob";
        return postfix("great");
    }
})();
/* Type Aliases */
(function () {
    function getName(n) {
        if (typeof n === "string") {
            return n;
        }
        else {
            return n();
        }
    }
})();
(function () {
})();
(function () {
})();
(function () {
    var people = { name: 'John' };
    var s = people.name;
    // var s = people.next.name;    Runtime Error
    // var s = people.next.next.name;
    // var s = people.next.next.next.name;
})();
(function () {
    // type Yikes = Array<Yikes>; // error, TS2456: Type alias 'Yikes' circularly references itself.
})();
(function () {
})();
/* String Literal Types */
(function () {
    var UIElement = /** @class */ (function () {
        function UIElement() {
        }
        UIElement.prototype.animate = function (dx, dy, easing) {
            if (easing === "ease-in") {
                // ...
            }
            else if (easing === "ease-out") {
            }
            else if (easing === "ease-in-out") {
            }
            else {
                // error! null 또는 undefined를 넘겨서는 안됩니다.
            }
        };
        return UIElement;
    }());
    var button = new UIElement();
    button.animate(0, 0, "ease-in");
    // button.animate(0, 0, "uneasy"); // error: "uneasy"는 여기에 사용할 수 없습니다.
})();
/* Discriminated Union */
(function () {
    function area(s) {
        switch (s.kind) {
            case "square": return s.size * s.size;
            case "rectangle": return s.height * s.width;
            case "circle": return Math.PI * Math.pow(s.radius, 2);
        }
    }
    function assertNever(x) {
        throw new Error("Unexpected object: " + x);
    }
    function area2(s) {
        switch (s.kind) {
            case "square": return s.size * s.size;
            case "rectangle": return s.height * s.width;
            case "circle": return Math.PI * Math.pow(s.radius, 2);
            default: return assertNever(s); // error here if there are missing cases
        }
        // should error here - we didn't handle case "triangle"
    }
})();
/* Polymorphic this types */
(function () {
    var BasicCalculator = /** @class */ (function () {
        function BasicCalculator(value) {
            if (value === void 0) { value = 0; }
            this.value = value;
        }
        BasicCalculator.prototype.currentValue = function () {
            return this.value;
        };
        BasicCalculator.prototype.add = function (operand) {
            this.value += operand;
            return this;
        };
        BasicCalculator.prototype.multiply = function (operand) {
            this.value *= operand;
            return this;
        };
        return BasicCalculator;
    }());
    var v = new BasicCalculator(2)
        .multiply(5)
        .add(1)
        .currentValue();
    var ScientificCalculator = /** @class */ (function (_super) {
        __extends(ScientificCalculator, _super);
        function ScientificCalculator(value) {
            if (value === void 0) { value = 0; }
            return _super.call(this, value) || this;
        }
        ScientificCalculator.prototype.sin = function () {
            this.value = Math.sin(this.value);
            return this;
        };
        return ScientificCalculator;
    }(BasicCalculator));
    var v2 = new ScientificCalculator(2)
        .multiply(5)
        .sin()
        .add(1)
        .currentValue();
})();
/* Index types */
(function () {
    function pluck(o, names) {
        return names.map(function (n) { return o[n]; });
    }
    var obj = {
        a: 1,
        b: 2,
        c: 3
    };
    var pluckAB = pluck(obj, ['a', 'b']);
    console.log('pluckAB : ');
    console.dir(pluckAB);
})();
(function () {
    function pluck(o, names) {
        return names.map(function (n) { return o[n]; });
    }
    var person = {
        name: 'Jarid',
        age: 35
    };
    var strings = pluck(person, ['name']); // ok, string[]
    var personProps; // 'name' | 'age'
    personProps = "name";
    personProps = "age";
    // pluck(person, ['age', 'unknown']); // error, 'unknown' is not in 'name' | 'age'
    pluck(person, ['age', 'name']); // ok
    function getProperty(o, name) {
        return o[name]; // o[name] is of type T[K]
    }
    var name = getProperty(person, 'name');
    var age = getProperty(person, 'age');
    var keys; // string
    var value; // number
})();
/* Mapped type */
(function () {
    var personPartial = { name: 'anonymous' };
    personPartial.name = 'Tom';
    var personReadonly = { name: 'anonymous', age: 0 };
    // personReadonly.name = 'Tom'; // Error
})();
(function () {
    var personPartial = { name: 'anonymous' };
    personPartial.name = 'Tom';
    var personReadonly = { name: 'anonymous', age: 0 };
    // personReadonly.name = 'Tom'; // Error
})();
(function () {
    var v = { option1: true, option2: false };
    console.dir(v);
})();
(function () {
    var nullablePerson = { name: 'anonymous', age: 0 };
    nullablePerson.name = 'Tom';
    nullablePerson.age = 37;
    nullablePerson.name = null;
    nullablePerson.age = null;
    var partialPerson = { name: 'anonymous' };
    partialPerson.name = 'Tom';
    partialPerson.age = 37;
    var nullablePerson2 = { name: 'anonymous', age: 0 };
    nullablePerson2.name = 'Tom';
    nullablePerson2.age = 37;
    nullablePerson2.name = null;
    nullablePerson2.age = null;
    var partialPerson2 = { name: 'anonymous' };
    partialPerson2.name = 'Tom';
    partialPerson2.age = 37;
    // partialPerson.name = null;
    // partialPerson.age = null;
    var readonlyPerson3 = { name: 'anonymous', age: 0 };
    // readonlyPerson3.name = 'Tom';    Error
    // 읽기 전용이면서 partial인 Readonly<Partial<Person>>
    var readonlyPartialPerson = { name: 'anonymous' };
})();
(function () {
    // type Proxy<T> = {
    //     get(): T;
    //     set(value: T): void;
    // }
    // type Proxify<T> = {
    //     [P in keyof T]: Proxy<T[P]>;
    // }
    // function proxify<T>(o: T): Proxify<T> {
    //     // ... wrap proxies ...
    //     const result: Proxify<T> = <Proxy<T>>o;
    //     return result;
    // }
    // let proxyProps = proxify({ ip: '127.0.0.1', name: 'proxy' });
    var threeStringProps;
    threeStringProps = {
        'prop1': 'str',
        'prop2': 'str2',
        'prop3': 'str3',
    };
    console.log('threeStringProps : ');
    console.dir(threeStringProps);
    var threeStringPropsPicked = threeStringProps;
    console.log('threeStringPropsPicked : ');
    console.dir(threeStringPropsPicked);
    // function unproxify<T>(t: Proxify<T>): T {
    //     let result = {} as T;
    //     for (const k in t) {
    //         result[k] = t[k].get();
    //     }
    //     return result;
    // }
    // let originalProps = unproxify(proxyProps);
})();
// Type is 'string | number
var funcX = func(Math.random() < 0.5);
console.log(funcX);
(function () {
})();
(function () {
    function foo(x) {
        // Has type 'U extends Foo ? string : number'
        var a = funcB(x);
        // This assignment is allowed though!
        var b = a;
    }
})();
(function () {
    var a, string = 1;
})();
(function () {
})();
(function () {
})();
(function () {
})();
(function () {
})();
(function () {
})();
