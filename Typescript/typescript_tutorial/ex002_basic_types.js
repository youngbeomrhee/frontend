"use strict";
/* Boolean */
var isDone = true;
/* Number */
// TS supports various number system that JS does
var decimal = 7;
var hex = 0xf00d;
var binary = 10;
var octal = 508;
// But you can't fix it.
hex = 3; // hex has changed decimal system
/* String */
// Single quotes, double quotes
var color = "blue";
color = 'red';
// backtick/backquote
var fullName = "Bob Bobbington";
var age = 37;
var sentence = "Hello, my name is " + fullName + ".\n\nI'll be " + (age + 1) + " years old next month.";
/* Array */
var list = [1, 2, 3];
var list2 = [1, 2, 3];
/* Tuple */
var x;
x = ['hello', 10];
// x = [10, 'hello'];  // error
var x2;
x[0] = 'world'; // OK, 'string' can be assigned to 'string | number'
console.log(x[1].toString()); // OK, 'string' and 'number' both have 'toString'
// x[1] = true;   // Error, 'boolean' isn't 'string | number'
/* Enum */
// default index starts at 0
var Color;
(function (Color) {
    Color[Color["Red"] = 0] = "Red";
    Color[Color["Green"] = 1] = "Green";
    Color[Color["Blue"] = 2] = "Blue";
})(Color || (Color = {}));
;
var c = Color.Green;
console.log(c); // print 1
// start index can be changed
var Color2;
(function (Color2) {
    Color2[Color2["Red"] = 1] = "Red";
    Color2[Color2["Green"] = 2] = "Green";
    Color2[Color2["Blue"] = 3] = "Blue";
})(Color2 || (Color2 = {}));
;
var c2 = Color2.Green;
console.log(c2); // print 2
// All indices can be set
var Color3;
(function (Color3) {
    Color3[Color3["Red"] = 1] = "Red";
    Color3[Color3["Green"] = 4] = "Green";
    Color3[Color3["Blue"] = 2] = "Blue";
})(Color3 || (Color3 = {}));
;
var c3 = Color3.Green;
console.log(c3); // print 4
// You can also go from a numeric value to the name of that value in the enum
var colorName = Color3[2];
console.log(colorName); // print 'Blue'
/* Any */
var notSure = 4;
notSure = "may be a string instead";
notSure = false;
// it is pretty same but different from Object
// notSure.ifItExists();   // okay, ifItExists might exist at runtime
// notSure.toFixed();  // okay, toFixed exists (but the compiler doesn't check)
var prettySure = 4;
// prettySure.toFixed();   // Error: Property 'toFixed' doesn't exist on type 'Object'.
// "any" type is also handy if you know some part of the type
var listAny = [1, true, 'free'];
listAny[1] = 100;
var listConainsAny = [1, true, 'free'];
// listConainsAny[1] = 100;    // error
listConainsAny[2] = 100; // okay
/* Void */
function warnUser() {
    console.log("This is my warning message");
}
warnUser();
var unusable = undefined;
unusable = null;
/* Null and Undefined */
var u = undefined;
u = null;
var n = null;
n = undefined;
/* Never */
// Function returning never must have unreachable end point
function error(message) {
    throw new Error(message);
}
// Inferred return type is never
function fail() {
    return error("Something failed");
}
// Function returning never must have unreachable end point
function infiniteLoop() {
    while (true) {
    }
}
create({ prop: 0 }); // OK
create(null); // OK
// create(42); // Error
// create('string'); // Error
// create(false); // Error
// create(undefined); // Error
/* Type assertions */
var someValue = "this is a string";
var strLength = someValue.length;
var strLength2 = someValue.length;
