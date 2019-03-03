
/* first example */
function printLabel(labelledObj: { label: string}) {
    console.log(1, labelledObj.label);
}

let myObj = {size: 10, label: 'Size 10 Object'};

printLabel(myObj);

/* using interface */
interface LabelledValue {
    label: string;
    // label2: number;
}

// if the same function name declares again, the old one is overrided
// function printLabel(labelledObj: LabelledValue) {
function printLabel2(labelledObj: LabelledValue) {
    console.log(2, labelledObj.label);
}

printLabel2(myObj);

interface SquareConfig {
    color?: string;
    width?: number;
}

function createSquare(config: SquareConfig): { color: string; area: number} {
    let newSquare = {color: "white", area: 100};
    if(config.color) {
        newSquare.color = config.color;
    }
    if(config.width) {
        newSquare.area = config.width * config.width;
    }
    return newSquare;
}

let mySquare = createSquare({color: "black"});
console.log(mySquare);

function createSquareMisspelled(config: SquareConfig): { color: string; area: number} {
    let newSquare = {color: "white", area: 100};
    // if(config.colr) {
    //     // Error: Property clor does not exist on type 'SquareConfig'
    //     newSquare.color = config.colr;
    // }
    if(config.width) {
        newSquare.area = config.width * config.width;
    }
    return newSquare;
}

/* Readonly properties */
interface Point {
    readonly x: number;
    readonly y: number;
}

let p1: Point = { x: 10, y: 20};
// p1.x = 5;   // Error

let a: number[] = [1, 2, 3, 4];
let ro: ReadonlyArray<number> = a;
// ro[0] = 12; // Error!
// ro.push(5); // Error!
// ro.length = 100; // Error!

// a = ro; // Error!
// But you can still override it with a type assertion, though
a = <Array<number>>ro;
a = ro as number[];

/* Excess property checks */
// error: 'colour' not expected in type 'SquareConfig'
// mySquare = createSquare({colour: "red", width: 100});

mySquare = createSquare({width: 100, opacity: 0.5} as SquareConfig);

/* Function types */
interface SearchFunc {
    (source: string, subString: string): boolean;
}

let mySearch: SearchFunc;
mySearch = function(source: string, subString: string) {
    let result = source.search(subString);
    return result > -1;
};
mySearch('a', 'b');

mySearch = function(source: string, sub: string) {
    let result = source.search(sub);
    return result > -1;
};
mySearch('a', 'b');

// TODO: The below may cause an Error!
mySearch = function(source: string) {
    return false;
};
mySearch('a', 'b');

mySearch = function(src, sub) {
    let result = src.search(sub);
    return result > -1;
};
mySearch('a', 'b');

/* Indexable typeas */
interface StringArray {
    [index: number]: string;
}

let myArray: StringArray;
myArray = ["Bob", "Fred"];

let myStr: string = myArray[0];


class Animal {
    name: string;
}
class Dog extends Animal {
    breed: string;
}

// Error: indexing with a numberic string might get you a completely separate type of Animal!
// interface NotOkay {
//     [x: number]: Animal;
//     [x: string]: Dog;
// }
interface Okay {
    [x: number]: Animal;
}
let dogA: Dog = { name: 'redbull', breed: 'American Bulldog'};
let dogList: Okay = [dogA];

// interface NumberDictionary {
//     [index: string]: number;
//     length: number;
//     name: string;   // Error, the type of 'name' is not a subtype of the indexer
// }

interface ReadonlyStringArray {
    readonly [index: number]: string;
}

let myArray2: ReadonlyStringArray = ["Alice", "Bob"];
// myArray2[2] = "Mallory";    // Error!


/* Class types */
/* Implementing an interface */
interface ClockInterface {
    currentTime: Date;
}

class Clock implements ClockInterface {
    currentTime: Date;
    constructor(h: number, m: number) {}
}

interface ClockInterface2 {
    currentTime: Date;
    setTime(d: Date): void;
}

class Clock2 implements ClockInterface2 {
    currentTime: Date;
    setTime(d: Date): void {
        this.currentTime = d;
    }
    constructor(h: number, m: number) {}
}

/* Difference between the static and instance sides of classes */

interface ClockConstructor {
    new (hour: number, minute: number): ClockInterface3;
}

// class Clock3 implements ClockConstructor {
//     currentTime: Date;
//     constructor(h: number, m: number) {}
// }

interface ClockInterface3 {
    h: number;
    m: number;
    tick(): void;
    now(): { hour: number, minute: number };
}

function createClock(
    ctor: ClockConstructor,
    hour: number,
    minute: number
): ClockInterface3 {
    return new ctor(hour, minute);
}

class DigitalClock implements ClockInterface3 {
    constructor(h: number, m: number) {
        this.h = h;
        this.m = m;
    }
    h: number;
    m: number;
    tick() {
        console.log("beep beep");
    }
    now() {
        return {hour: this.h, minute: this.m}
    }
}

// TODO: interface only guarantees type, not a number of parameters
class AnalogClock implements ClockInterface3 {
    constructor(h: number, m: number) {
        this.h = h;
        this.m = m;
    }
    h: number;
    m: number;
    tick(): void {
        console.log("tick tock");
    }
    now() {
        return {hour: this.h, minute: this.m}
    }
}

let digital = createClock(DigitalClock, 12, 17);
let analog = createClock(AnalogClock, 7, 32);

digital.tick();
console.log(digital.now());
analog.tick();
console.log(analog.now());

/* Extending interfaces */
interface Shape {
    color: string;
}

interface Square extends Shape {
    sideLength: number;
}

let square = <Square>{};
square.color = "blue";
square.sideLength = 10;
// square.sideLength = '10';   // Error!
// square.nowhere = 10;    // Error!


interface PenStroke {
    penWidth: number;
}

interface Square2 extends Shape, PenStroke {
    sideLength: number;
}

let square2 = <Square2>{};
square2.color = "blue";
square2.sideLength = 10;
square2.penWidth = 5.0;
// square2.penWidth = "5.0";   // Error!


/* Hybrid types */
interface Counter {
    (start: number): void;
    start: number;
    now: number;
    interval: number;
    reset(): void;
}

function getCounter(): Counter {
    let counter = <Counter>function(start: number) {
        counter.start = start;
    };
    counter.interval = 123;
    counter.reset = function() {};
    return counter;
}

let counter = getCounter();
counter(10);
counter.reset();
counter.interval = 5.0;


/* Interfaces Extending Classes */
class Control {
    private state: any;
}

interface SelectableControl extends Control {
    select(): void;
}

class Button extends Control implements SelectableControl {
    select() {}
}

class TextBox extends Control {
    select() {}
}

// Error: Property 'state' is missing in type 'Image'.
// class Image implements SelectableControl {
//     select() {}
// }

class Location2 {}


