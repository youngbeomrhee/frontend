
class Greeter {
    greeting: string;
    constructor(message: string) {
        this.greeting = message;
    }
    greet() {
        return "Hello, " + this.greeting;
    }
}

let greeter2 = new Greeter("world");


/* Inheritance */
class Animal2 {
    move(distanceInMeters: number = 0) {
        console.log(`Animal moved ${distanceInMeters}m.`);
    }
}

class Dog2 extends Animal2 {
    bark() {
        console.log('Woof! Woof!');
    }
}

const dog = new Dog2();
dog.bark();
dog.move(10);
dog.bark();


class Animal3 {
    name: string;
    constructor(theName: string) { this.name = theName; }
    move(distanceInMeters: number = 0) {
        console.log(`${this.name} moved ${distanceInMeters}m.`);
    }
}

class Snake extends Animal3 {
    constructor(name: string) { super(name); }
    move(distanceInMeters = 5) {
        console.log("Slithering...");
        super.move(distanceInMeters);
    }
}

class Horse extends Animal3 {
    constructor(name: string) { super(name); }
    move(distanceInMeters = 45) {
        console.log("Galloping...");
        super.move(distanceInMeters);
    }
}

let sam = new Snake("Sammy the Python");
let tom: Animal3 = new Horse("Tommy the Palomino");

sam.move();
tom.move(34);



/* Public, private, and protected modifiers */

/* Understanding private */
class Animal4 {
    private name: string;
    constructor(theName: string) { this.name = theName; }
    sayMyName(): void {
        console.log("I'm " + this.name);
    }
}

// new Animal4("Cat").name; // Error: 'name' is private;
new Animal4("Cat").sayMyName();


/* compatible */
class Animal5 {
    private name: string;
    constructor(theName: string) { this.name = theName; }
}

class Rhino extends Animal5 {
    constructor() { super("Rhino"); }
}

class Employee {
    private name: string;
    constructor(theName: string) { this.name = theName; }
}

let animal = new Animal5("Goat");
let rhino = new Rhino();
let employee = new Employee("Bob");

animal = rhino;
// animal = employee;   // Error: 'Animal' and 'Employee' are not compatible



/* Understanding protected */
class Person {
    protected name: string;
    constructor(name: string) { this.name = name; }
}

class Employee2 extends Person {
    private department: string;

    constructor(name: string, department: string) {
        super(name);
        this.department = department;
    }

    public getElevatorPitch() {
        return `Hello, my name is ${this.name} and I work in ${this.department}.`;
    }
}

let howard = new Employee2("Howard", "Sales");
console.log(howard.getElevatorPitch());
// console.log(howard.name); // Error


/* protected constructor */
class Person2 {
    protected name: string;
    protected constructor(theName: string) { this.name = theName; }
}

// Employee는 Person을 확장할 수 있습니다
class Employee3 extends Person2 {
    private department: string;

    constructor(name: string, department: string) {
        super(name);
        this.department = department;
    }

    public getElevatorPitch() {
        return `Hello, my name is ${this.name} and I work in ${this.department}.`;
    }
}

let howard2 = new Employee3("Howard", "Sales");
// let john = new Person2("John"); // Error: The 'Person' constructor is protected


/* Readonly modifier */
class Octopus {
    readonly name: string;
    readonly numberOfLegs: number = 8;
    constructor (theName: string) {
        this.name = theName;
    }
    printName(): void {
        console.log(this.name);
    }
}
let dad = new Octopus("Man with the 8 strong legs");
// dad.name = "Man with the 3-piece suit"; // error! name is readonly.
dad.printName();

/* Parameter properties */
class Octopus2 {
    readonly numberOfLegs: number = 8;
    constructor(readonly name: string) {
    }
    printName(): void {
        console.log(this.name);
    }
}
let dad2 = new Octopus2("Man with the 8 strong legs");
// dad.name = "Man with the 3-piece suit"; // error! name is readonly.
dad2.printName();



/* Accessors */
/* no getters/setters */
class Employee4 {
    fullName: string | undefined;
}

let employee4 = new Employee4();
employee4.fullName = "Bob Smith";
if (employee4.fullName) {
    console.log(employee4.fullName);
}

/* with getters/setters */
let passcode = "secret passcode";

class Employee5 {
    _fullName!: string;

    get fullName(): string {
        return this._fullName;
    }

    set fullName(newName: string) {
        if (passcode && passcode == "secret passcode") {
            this._fullName = newName;
        }
        else {
            console.log("Error: Unauthorized update of employee!");
        }
    }
}

let employee5 = new Employee5();
employee5.fullName = "Bob Smith";
if (employee5.fullName) {
    console.log(employee5.fullName);
}

passcode = 'malformed password'
employee5.fullName = "Hakcer";
if (employee5.fullName) {
    console.log(employee5.fullName);
}


/* Static Properties */
class Grid {
    private static origin = {x: 0, y: 0};
    calculateDistanceFromOrigin(point: {x: number; y: number;}) {
        let xDist = (point.x - Grid.origin.x);
        let yDist = (point.y - Grid.origin.y);
        return Math.sqrt(xDist * xDist + yDist * yDist) / this.scale;
    }
    constructor (public scale: number) { }
}

let grid1 = new Grid(1.0);  // 1x scale
let grid2 = new Grid(5.0);  // 5x scale
// console.log(Grid.origin);
console.log(grid1.calculateDistanceFromOrigin({x: 10, y: 10}));
console.log(grid2.calculateDistanceFromOrigin({x: 10, y: 10}));


/* Abstract Classes */
abstract class Animal6 {
    abstract makeSound(): void;
    move(): void {
        console.log("roaming the earth...");
    }
}



abstract class Department {

    constructor(public name: string) {
    }

    printName(): void {
        console.log("Department name: " + this.name);
    }

    abstract printMeeting(): void; // must be implemented in derived classes
}

class AccountingDepartment extends Department {

    constructor() {
        super("Accounting and Auditing"); // constructors in derived classes must call super()
    }

    printMeeting(): void {
        console.log("The Accounting Department meets each Monday at 10am.");
    }

    generateReports(): void {
        console.log("Generating accounting reports...");
    }
}

let department: Department; // ok to create a reference to an abstract type
// department = new Department(); // error: cannot create an instance of an abstract class
department = new AccountingDepartment(); // ok to create and assign a non-abstract subclass
department.printName();
department.printMeeting();
// department.generateReports(); // error: method doesn't exist on declared abstract type


let department2: AccountingDepartment; // ok to create a reference to an abstract type
department2 = new AccountingDepartment(); // ok to create and assign a non-abstract subclass
department2.printName();
department2.printMeeting();
department2.generateReports(); // error: method doesn't exist on declared abstract type

/* Advanced Techniques */
/* Constructor functions */
class Greeter2 {
    constructor(greeting: string) {
        this.greeting = greeting;
    }
    static standardGreeting = "Hello, there";
    greeting: string;
    greet() {
        if (this.greeting) {
            return "Hello, " + this.greeting;
        }
        else {
            return Greeter2.standardGreeting;
        }
    }
}

let greeter3: Greeter2;
greeter3 = new Greeter2('');
console.log(greeter3.greet());

let greeterMaker: typeof Greeter2 = Greeter2;
greeterMaker.standardGreeting = "Hey there!";

let greeter4: Greeter = new greeterMaker('');
console.log(greeter4.greet());


/* Using a class as an interface */
class Point2 {
    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }
    x: number;
    y: number;
}

interface Point3d extends Point2 {
    z: number;
}

let point3d: Point3d = {x: 1, y: 2, z: 3};

