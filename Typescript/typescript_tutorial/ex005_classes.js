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
var Greeter = /** @class */ (function () {
    function Greeter(message) {
        this.greeting = message;
    }
    Greeter.prototype.greet = function () {
        return "Hello, " + this.greeting;
    };
    return Greeter;
}());
var greeter2 = new Greeter("world");
/* Inheritance */
var Animal2 = /** @class */ (function () {
    function Animal2() {
    }
    Animal2.prototype.move = function (distanceInMeters) {
        if (distanceInMeters === void 0) { distanceInMeters = 0; }
        console.log("Animal moved " + distanceInMeters + "m.");
    };
    return Animal2;
}());
var Dog2 = /** @class */ (function (_super) {
    __extends(Dog2, _super);
    function Dog2() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Dog2.prototype.bark = function () {
        console.log('Woof! Woof!');
    };
    return Dog2;
}(Animal2));
var dog = new Dog2();
dog.bark();
dog.move(10);
dog.bark();
var Animal3 = /** @class */ (function () {
    function Animal3(theName) {
        this.name = theName;
    }
    Animal3.prototype.move = function (distanceInMeters) {
        if (distanceInMeters === void 0) { distanceInMeters = 0; }
        console.log(this.name + " moved " + distanceInMeters + "m.");
    };
    return Animal3;
}());
var Snake = /** @class */ (function (_super) {
    __extends(Snake, _super);
    function Snake(name) {
        return _super.call(this, name) || this;
    }
    Snake.prototype.move = function (distanceInMeters) {
        if (distanceInMeters === void 0) { distanceInMeters = 5; }
        console.log("Slithering...");
        _super.prototype.move.call(this, distanceInMeters);
    };
    return Snake;
}(Animal3));
var Horse = /** @class */ (function (_super) {
    __extends(Horse, _super);
    function Horse(name) {
        return _super.call(this, name) || this;
    }
    Horse.prototype.move = function (distanceInMeters) {
        if (distanceInMeters === void 0) { distanceInMeters = 45; }
        console.log("Galloping...");
        _super.prototype.move.call(this, distanceInMeters);
    };
    return Horse;
}(Animal3));
var sam = new Snake("Sammy the Python");
var tom = new Horse("Tommy the Palomino");
sam.move();
tom.move(34);
/* Public, private, and protected modifiers */
/* Understanding private */
var Animal4 = /** @class */ (function () {
    function Animal4(theName) {
        this.name = theName;
    }
    Animal4.prototype.sayMyName = function () {
        console.log("I'm " + this.name);
    };
    return Animal4;
}());
// new Animal4("Cat").name; // Error: 'name' is private;
new Animal4("Cat").sayMyName();
/* compatible */
var Animal5 = /** @class */ (function () {
    function Animal5(theName) {
        this.name = theName;
    }
    return Animal5;
}());
var Rhino = /** @class */ (function (_super) {
    __extends(Rhino, _super);
    function Rhino() {
        return _super.call(this, "Rhino") || this;
    }
    return Rhino;
}(Animal5));
var Employee = /** @class */ (function () {
    function Employee(theName) {
        this.name = theName;
    }
    return Employee;
}());
var animal = new Animal5("Goat");
var rhino = new Rhino();
var employee = new Employee("Bob");
animal = rhino;
// animal = employee;   // Error: 'Animal' and 'Employee' are not compatible
/* Understanding protected */
var Person = /** @class */ (function () {
    function Person(name) {
        this.name = name;
    }
    return Person;
}());
var Employee2 = /** @class */ (function (_super) {
    __extends(Employee2, _super);
    function Employee2(name, department) {
        var _this = _super.call(this, name) || this;
        _this.department = department;
        return _this;
    }
    Employee2.prototype.getElevatorPitch = function () {
        return "Hello, my name is " + this.name + " and I work in " + this.department + ".";
    };
    return Employee2;
}(Person));
var howard = new Employee2("Howard", "Sales");
console.log(howard.getElevatorPitch());
// console.log(howard.name); // Error
/* protected constructor */
var Person2 = /** @class */ (function () {
    function Person2(theName) {
        this.name = theName;
    }
    return Person2;
}());
// Employee는 Person을 확장할 수 있습니다
var Employee3 = /** @class */ (function (_super) {
    __extends(Employee3, _super);
    function Employee3(name, department) {
        var _this = _super.call(this, name) || this;
        _this.department = department;
        return _this;
    }
    Employee3.prototype.getElevatorPitch = function () {
        return "Hello, my name is " + this.name + " and I work in " + this.department + ".";
    };
    return Employee3;
}(Person2));
var howard2 = new Employee3("Howard", "Sales");
// let john = new Person2("John"); // Error: The 'Person' constructor is protected
/* Readonly modifier */
var Octopus = /** @class */ (function () {
    function Octopus(theName) {
        this.numberOfLegs = 8;
        this.name = theName;
    }
    Octopus.prototype.printName = function () {
        console.log(this.name);
    };
    return Octopus;
}());
var dad = new Octopus("Man with the 8 strong legs");
// dad.name = "Man with the 3-piece suit"; // error! name is readonly.
dad.printName();
/* Parameter properties */
var Octopus2 = /** @class */ (function () {
    function Octopus2(name) {
        this.name = name;
        this.numberOfLegs = 8;
    }
    Octopus2.prototype.printName = function () {
        console.log(this.name);
    };
    return Octopus2;
}());
var dad2 = new Octopus2("Man with the 8 strong legs");
// dad.name = "Man with the 3-piece suit"; // error! name is readonly.
dad2.printName();
/* Accessors */
/* no getters/setters */
var Employee4 = /** @class */ (function () {
    function Employee4() {
    }
    return Employee4;
}());
var employee4 = new Employee4();
employee4.fullName = "Bob Smith";
if (employee4.fullName) {
    console.log(employee4.fullName);
}
/* with getters/setters */
var passcode = "secret passcode";
var Employee5 = /** @class */ (function () {
    function Employee5() {
    }
    Object.defineProperty(Employee5.prototype, "fullName", {
        get: function () {
            return this._fullName;
        },
        set: function (newName) {
            if (passcode && passcode == "secret passcode") {
                this._fullName = newName;
            }
            else {
                console.log("Error: Unauthorized update of employee!");
            }
        },
        enumerable: true,
        configurable: true
    });
    return Employee5;
}());
var employee5 = new Employee5();
employee5.fullName = "Bob Smith";
if (employee5.fullName) {
    console.log(employee5.fullName);
}
passcode = 'malformed password';
employee5.fullName = "Hakcer";
if (employee5.fullName) {
    console.log(employee5.fullName);
}
/* Static Properties */
var Grid = /** @class */ (function () {
    function Grid(scale) {
        this.scale = scale;
    }
    Grid.prototype.calculateDistanceFromOrigin = function (point) {
        var xDist = (point.x - Grid.origin.x);
        var yDist = (point.y - Grid.origin.y);
        return Math.sqrt(xDist * xDist + yDist * yDist) / this.scale;
    };
    Grid.origin = { x: 0, y: 0 };
    return Grid;
}());
var grid1 = new Grid(1.0); // 1x scale
var grid2 = new Grid(5.0); // 5x scale
// console.log(Grid.origin);
console.log(grid1.calculateDistanceFromOrigin({ x: 10, y: 10 }));
console.log(grid2.calculateDistanceFromOrigin({ x: 10, y: 10 }));
/* Abstract Classes */
var Animal6 = /** @class */ (function () {
    function Animal6() {
    }
    Animal6.prototype.move = function () {
        console.log("roaming the earth...");
    };
    return Animal6;
}());
var Department = /** @class */ (function () {
    function Department(name) {
        this.name = name;
    }
    Department.prototype.printName = function () {
        console.log("Department name: " + this.name);
    };
    return Department;
}());
var AccountingDepartment = /** @class */ (function (_super) {
    __extends(AccountingDepartment, _super);
    function AccountingDepartment() {
        return _super.call(this, "Accounting and Auditing") || this;
    }
    AccountingDepartment.prototype.printMeeting = function () {
        console.log("The Accounting Department meets each Monday at 10am.");
    };
    AccountingDepartment.prototype.generateReports = function () {
        console.log("Generating accounting reports...");
    };
    return AccountingDepartment;
}(Department));
var department; // ok to create a reference to an abstract type
// department = new Department(); // error: cannot create an instance of an abstract class
department = new AccountingDepartment(); // ok to create and assign a non-abstract subclass
department.printName();
department.printMeeting();
// department.generateReports(); // error: method doesn't exist on declared abstract type
var department2; // ok to create a reference to an abstract type
department2 = new AccountingDepartment(); // ok to create and assign a non-abstract subclass
department2.printName();
department2.printMeeting();
department2.generateReports(); // error: method doesn't exist on declared abstract type
/* Advanced Techniques */
/* Constructor functions */
var Greeter2 = /** @class */ (function () {
    function Greeter2(greeting) {
        this.greeting = greeting;
    }
    Greeter2.prototype.greet = function () {
        if (this.greeting) {
            return "Hello, " + this.greeting;
        }
        else {
            return Greeter2.standardGreeting;
        }
    };
    Greeter2.standardGreeting = "Hello, there";
    return Greeter2;
}());
var greeter3;
greeter3 = new Greeter2('');
console.log(greeter3.greet());
var greeterMaker = Greeter2;
greeterMaker.standardGreeting = "Hey there!";
var greeter4 = new greeterMaker('');
console.log(greeter4.greet());
/* Using a class as an interface */
var Point2 = /** @class */ (function () {
    function Point2(x, y) {
        this.x = x;
        this.y = y;
    }
    return Point2;
}());
var point3d = { x: 1, y: 2, z: 3 };
