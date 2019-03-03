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
/* first example */
function printLabel(labelledObj) {
    console.log(1, labelledObj.label);
}
var myObj = { size: 10, label: 'Size 10 Object' };
printLabel(myObj);
// if the same function name declares again, the old one is overrided
// function printLabel(labelledObj: LabelledValue) {
function printLabel2(labelledObj) {
    console.log(2, labelledObj.label);
}
printLabel2(myObj);
function createSquare(config) {
    var newSquare = { color: "white", area: 100 };
    if (config.color) {
        newSquare.color = config.color;
    }
    if (config.width) {
        newSquare.area = config.width * config.width;
    }
    return newSquare;
}
var mySquare = createSquare({ color: "black" });
console.log(mySquare);
function createSquareMisspelled(config) {
    var newSquare = { color: "white", area: 100 };
    // if(config.colr) {
    //     // Error: Property clor does not exist on type 'SquareConfig'
    //     newSquare.color = config.colr;
    // }
    if (config.width) {
        newSquare.area = config.width * config.width;
    }
    return newSquare;
}
var p1 = { x: 10, y: 20 };
// p1.x = 5;   // Error
var a = [1, 2, 3, 4];
var ro = a;
// ro[0] = 12; // Error!
// ro.push(5); // Error!
// ro.length = 100; // Error!
// a = ro; // Error!
// But you can still override it with a type assertion, though
a = ro;
a = ro;
/* Excess property checks */
// error: 'colour' not expected in type 'SquareConfig'
// mySquare = createSquare({colour: "red", width: 100});
mySquare = createSquare({ width: 100, opacity: 0.5 });
var mySearch;
mySearch = function (source, subString) {
    var result = source.search(subString);
    return result > -1;
};
mySearch('a', 'b');
mySearch = function (source, sub) {
    var result = source.search(sub);
    return result > -1;
};
mySearch('a', 'b');
// TODO: The below may cause an Error!
mySearch = function (source) {
    return false;
};
mySearch('a', 'b');
mySearch = function (src, sub) {
    var result = src.search(sub);
    return result > -1;
};
mySearch('a', 'b');
var myArray;
myArray = ["Bob", "Fred"];
var myStr = myArray[0];
var Animal = /** @class */ (function () {
    function Animal() {
    }
    return Animal;
}());
var Dog = /** @class */ (function (_super) {
    __extends(Dog, _super);
    function Dog() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Dog;
}(Animal));
var dogA = { name: 'redbull', breed: 'American Bulldog' };
var dogList = [dogA];
var myArray2 = ["Alice", "Bob"];
var Clock = /** @class */ (function () {
    function Clock(h, m) {
    }
    return Clock;
}());
var Clock2 = /** @class */ (function () {
    function Clock2(h, m) {
    }
    Clock2.prototype.setTime = function (d) {
        this.currentTime = d;
    };
    return Clock2;
}());
function createClock(ctor, hour, minute) {
    return new ctor(hour, minute);
}
var DigitalClock = /** @class */ (function () {
    function DigitalClock(h, m) {
        this.h = h;
        this.m = m;
    }
    DigitalClock.prototype.tick = function () {
        console.log("beep beep");
    };
    DigitalClock.prototype.now = function () {
        return { hour: this.h, minute: this.m };
    };
    return DigitalClock;
}());
// TODO: interface only guarantees type, not a number of parameters
var AnalogClock = /** @class */ (function () {
    function AnalogClock(h, m) {
        this.h = h;
        this.m = m;
    }
    AnalogClock.prototype.tick = function () {
        console.log("tick tock");
    };
    AnalogClock.prototype.now = function () {
        return { hour: this.h, minute: this.m };
    };
    return AnalogClock;
}());
var digital = createClock(DigitalClock, 12, 17);
var analog = createClock(AnalogClock, 7, 32);
digital.tick();
console.log(digital.now());
analog.tick();
console.log(analog.now());
var square = {};
square.color = "blue";
square.sideLength = 10;
var square2 = {};
square2.color = "blue";
square2.sideLength = 10;
square2.penWidth = 5.0;
function getCounter() {
    var counter = function (start) {
        counter.start = start;
    };
    counter.interval = 123;
    counter.reset = function () { };
    return counter;
}
var counter = getCounter();
counter(10);
counter.reset();
counter.interval = 5.0;
/* Interfaces Extending Classes */
var Control = /** @class */ (function () {
    function Control() {
    }
    return Control;
}());
var Button = /** @class */ (function (_super) {
    __extends(Button, _super);
    function Button() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Button.prototype.select = function () { };
    return Button;
}(Control));
var TextBox = /** @class */ (function (_super) {
    __extends(TextBox, _super);
    function TextBox() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TextBox.prototype.select = function () { };
    return TextBox;
}(Control));
// Error: Property 'state' is missing in type 'Image'.
// class Image implements SelectableControl {
//     select() {}
// }
var Location2 = /** @class */ (function () {
    function Location2() {
    }
    return Location2;
}());
