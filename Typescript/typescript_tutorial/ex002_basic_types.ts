/* Boolean */ 
let isDone: boolean = true;

/* Number */
// TS supports various number system that JS does
let decimal: number = 7;
let hex: number = 0xf00d;
let binary: number = 0b1010;
let octal: number = 0o774;

// But you can't fix it.
hex = 3;    // hex has changed decimal system

/* String */
// Single quotes, double quotes
let color: string = "blue";
color = 'red';

// backtick/backquote
let fullName: String = `Bob Bobbington`;
let age: number = 37;
let sentence: string = `Hello, my name is ${ fullName }.

I'll be ${ age + 1 } years old next month.`;

/* Array */ 
let list: number[] = [1, 2, 3];
let list2: Array<number> = [1, 2, 3];

/* Tuple */
let x: [string, number];
x = ['hello', 10];
// x = [10, 'hello'];  // error

let x2: [string, string | number];
x[0] = 'world'; // OK, 'string' can be assigned to 'string | number'
console.log(x[1].toString());   // OK, 'string' and 'number' both have 'toString'
// x[1] = true;   // Error, 'boolean' isn't 'string | number'

/* Enum */
// default index starts at 0
enum Color {Red, Green, Blue};
let c: Color = Color.Green;
console.log(c); // print 1

// start index can be changed
enum Color2 {Red=1, Green, Blue};
let c2: Color2 = Color2.Green;
console.log(c2);    // print 2

// All indices can be set
enum Color3 {Red=1, Green=4, Blue=2};
let c3: Color3 = Color3.Green;
console.log(c3);    // print 4

// You can also go from a numeric value to the name of that value in the enum
let colorName: string = Color3[2];
console.log(colorName); // print 'Blue'

/* Any */
let notSure: any = 4;
notSure = "may be a string instead";
notSure = false;

// it is pretty same but different from Object
// notSure.ifItExists();   // okay, ifItExists might exist at runtime
// notSure.toFixed();  // okay, toFixed exists (but the compiler doesn't check)

let prettySure: Object = 4;
// prettySure.toFixed();   // Error: Property 'toFixed' doesn't exist on type 'Object'.

// "any" type is also handy if you know some part of the type
let listAny: any[] = [1, true, 'free']; 
listAny[1] = 100;

let listConainsAny: [number, boolean, any] = [1, true, 'free']; 
// listConainsAny[1] = 100;    // error
listConainsAny[2] = 100;    // okay

/* Void */
function warnUser(): void {
    console.log("This is my warning message");
}
warnUser();

let unusable: void = undefined;
unusable = null;

/* Null and Undefined */
let u: undefined = undefined;
u = null;
let n: null = null;
n = undefined;

/* Never */
// Function returning never must have unreachable end point
function error(message: string): never {
    throw new Error(message);
}

// Inferred return type is never
function fail() {
    return error("Something failed");
}

// Function returning never must have unreachable end point
function infiniteLoop(): never {
    while(true) {
    }
}
// error('error');
// fail();
// infiniteLoop();

/* Object */
declare function create(o: object | null): void;
 
create({ prop: 0}); // OK
create(null);   // OK

// create(42); // Error
// create('string'); // Error
// create(false); // Error
// create(undefined); // Error

/* Type assertions */
let someValue: any = "this is a string";
let strLength: number = (<string>someValue).length;
let strLength2: number = (someValue as string).length;


