"use strict";
(function () {
    var Person = /** @class */ (function () {
        function Person() {
        }
        return Person;
    }());
    var p;
    // OK, because of structural typing
    p = new Person();
})();
(function () {
    var x;
    // y's inferred type is { name: string; location: string; }
    var y = { name: "Alice", location: "Seattle" };
    x = y;
    function greet(n) {
        console.log("Hello, " + n.name);
    }
    greet(y); // OK
})();
/* Comparing two functions */
(function () {
    var x = function (a) { return 0; };
    var y = function (b, s) { return 0; };
    y = x; // OK
    // x = y; // Error
})();
(function () {
    var x = function () { return ({ name: "Alice" }); };
    var y = function () { return ({ name: "Alice", location: "Seattle" }); };
    x = y; // OK
    // y = x; // Error, because x() lacks a location property
})();
/* Function Parameter Bivariance */
(function () {
    var EventType;
    (function (EventType) {
        EventType[EventType["Mouse"] = 0] = "Mouse";
        EventType[EventType["Keyboard"] = 1] = "Keyboard";
    })(EventType || (EventType = {}));
    function listenEvent(eventType, handler) {
        /* ... */
    }
    // Unsound, but useful and common
    // if you avoid error change the strictFunctionTypes: true flag to false
    // "strictFunctionTypes": true,           /* Enable strict checking of function types. */
    // listenEvent(EventType.Mouse, (e: MouseEvent) => console.log(e.x + "," + e.y));
    // Undesirable alternatives in presence of soundness
    listenEvent(EventType.Mouse, function (e) { return console.log(e.x + "," + e.y); });
    listenEvent(EventType.Mouse, (function (e) { return console.log(e.x + "," + e.y); }));
    // Still disallowed (clear error). Type safety enforced for wholly incompatible types
    // listenEvent(EventType.Mouse, (e: number) => console.log(e));
})();
/* Optional Parameters and Rest Parameters */
(function () {
    function invokeLater(args, callback) {
        /* ... Invoke callback with 'args' ... */
    }
    // Unsound - invokeLater "might" provide any number of arguments
    invokeLater([1, 2], function (x, y) { return console.log(x + ", " + y); });
    // Confusing (x and y are actually required) and undiscoverable
    invokeLater([1, 2], function (x, y) { return console.log(x + ", " + y); });
})();
(function () {
    var Status;
    (function (Status) {
        Status[Status["Ready"] = 0] = "Ready";
        Status[Status["Waiting"] = 1] = "Waiting";
    })(Status || (Status = {}));
    ;
    var Color;
    (function (Color) {
        Color[Color["Red"] = 0] = "Red";
        Color[Color["Blue"] = 1] = "Blue";
        Color[Color["Green"] = 2] = "Green";
    })(Color || (Color = {}));
    ;
    var status = Status.Ready;
    // status = Color.Green;  // Error
})();
(function () {
    var Animal = /** @class */ (function () {
        function Animal(name, numFeet) {
        }
        return Animal;
    }());
    var Size = /** @class */ (function () {
        function Size(numFeet) {
        }
        return Size;
    }());
    var a;
    var s;
    a = s; // OK
    s = a; // OK
    a = new Animal('lion', 8);
    s = new Size(8);
    a = s;
    s = a;
})();
(function () {
    var x;
    var y;
    x = y; // OK, because y matches structure of x
})();
(function () {
    var x;
    var y;
    // x = y;  // Error, because x and y are not compatible
})();
(function () {
    var identity = function (x) {
        // ...
        return x;
    };
    var reverse = function (y) {
        // ...
        return y;
    };
    identity = reverse; // OK, because (x: any) => any matches (y: any) => any
})();
