"use strict";
/* Numeric enums */
(function () {
    var Direction;
    (function (Direction) {
        Direction[Direction["Up"] = 1] = "Up";
        Direction[Direction["Down"] = 2] = "Down";
        Direction[Direction["Left"] = 3] = "Left";
        Direction[Direction["Right"] = 4] = "Right";
    })(Direction || (Direction = {}));
    console.log(Direction.Up, Direction.Down, Direction.Left, Direction.Right); // 1 2 3 4
})();
(function () {
    var Direction;
    (function (Direction) {
        Direction[Direction["Up"] = 0] = "Up";
        Direction[Direction["Down"] = 1] = "Down";
        Direction[Direction["Left"] = 2] = "Left";
        Direction[Direction["Right"] = 3] = "Right";
    })(Direction || (Direction = {}));
    console.log(Direction.Up, Direction.Down, Direction.Left, Direction.Right); // 0 1 2 3
})();
(function () {
    var Response;
    (function (Response) {
        Response[Response["No"] = 0] = "No";
        Response[Response["Yes"] = 1] = "Yes";
    })(Response || (Response = {}));
    function respond(recipient, message) {
        // ...
        console.log(recipient, message);
    }
    respond("Princess Caroline", Response.Yes);
    /*
    enum E {
        A = getSomeValue(),
        B, // error! 'A' is not constant-initialized, so 'B' needs an initializer
    }
    */
})();
/* String enums */
(function () {
    var Direction;
    (function (Direction) {
        Direction["Up"] = "UP";
        Direction["Down"] = "DOWN";
        Direction["Left"] = "LEFT";
        Direction["Right"] = "RIGHT";
    })(Direction || (Direction = {}));
})();
/* Heterogeneous enums */
(function () {
    var BooleanLikeHeterogeneousEnum;
    (function (BooleanLikeHeterogeneousEnum) {
        BooleanLikeHeterogeneousEnum[BooleanLikeHeterogeneousEnum["No"] = 0] = "No";
        BooleanLikeHeterogeneousEnum["Yes"] = "YES";
    })(BooleanLikeHeterogeneousEnum || (BooleanLikeHeterogeneousEnum = {}));
})();
/* Computed and constant members */
(function () {
    // E.X is constant:
    var E;
    (function (E) {
        E[E["X"] = 0] = "X";
    })(E || (E = {}));
    console.log(E.X);
    // All enum members in 'E1' and 'E2' are constant.
    var E1;
    (function (E1) {
        E1[E1["X"] = 0] = "X";
        E1[E1["Y"] = 1] = "Y";
        E1[E1["Z"] = 2] = "Z";
    })(E1 || (E1 = {}));
    console.log(E1.X, E1.Y, E1.Z);
    var E2;
    (function (E2) {
        E2[E2["A"] = 1] = "A";
        E2[E2["B"] = 2] = "B";
        E2[E2["C"] = 3] = "C";
    })(E2 || (E2 = {}));
    console.log(E2.A, E2.B, E2.C);
    var FileAccess;
    (function (FileAccess) {
        // constant members
        FileAccess[FileAccess["None"] = 0] = "None";
        FileAccess[FileAccess["Read"] = 2] = "Read";
        FileAccess[FileAccess["Write"] = 4] = "Write";
        FileAccess[FileAccess["ReadWrite"] = 6] = "ReadWrite";
        // computed member
        FileAccess[FileAccess["G"] = "123".length] = "G";
    })(FileAccess || (FileAccess = {}));
    console.log(FileAccess.None, FileAccess.Read, FileAccess.Write, FileAccess.ReadWrite, FileAccess.G);
})();
/* Union enums and enum member types */
(function () {
    var ShapeKind;
    (function (ShapeKind) {
        ShapeKind[ShapeKind["Circle"] = 0] = "Circle";
        ShapeKind[ShapeKind["Square"] = 1] = "Square";
    })(ShapeKind || (ShapeKind = {}));
    var c = {
        kind: ShapeKind.Square,
        // kind: ShapeKind.Circle,
        //    ~~~~~~~~~~~~~~~~ Error!
        radius: 100,
    };
    var E;
    (function (E) {
        E[E["Foo"] = 0] = "Foo";
        E[E["Bar"] = 1] = "Bar";
    })(E || (E = {}));
    function f(x) {
        // if (x !== E.Foo || x !== E.Bar) {   // Silly comparison
        // if (x !== E.Foo && x !== E.Bar) {    // right comparison
        //             ~~~~~~~~~~~
        // Error! Operator '!==' cannot be applied to types 'E.Foo' and 'E.Bar'.
        // }
    }
})();
/* Enums at runtime */
(function () {
    var E;
    (function (E) {
        E[E["X"] = 0] = "X";
        E[E["Y"] = 1] = "Y";
        E[E["Z"] = 2] = "Z";
    })(E || (E = {}));
    function f(obj) {
        return obj.X;
    }
    // Works, since 'E' has a property named 'X' which is a number.
    f(E);
})();
/* Reverse mappings */
(function () {
    var Enum;
    (function (Enum) {
        Enum[Enum["A"] = 0] = "A";
    })(Enum || (Enum = {}));
    var a = Enum.A;
    var nameOfA = Enum[a]; // "A"
})();
/* const enums */
(function () {
})();
(function () {
    var directions = [0 /* Up */, 1 /* Down */, 2 /* Left */, 3 /* Right */];
})();
/* Ambient enums */
(function () {
    /*declare*/ var Enum;
    (function (Enum) {
        Enum[Enum["A"] = 1] = "A";
        Enum[Enum["B"] = 2] = "B";
        Enum[Enum["C"] = 2] = "C";
    })(Enum || (Enum = {}));
    console.log(Enum.A, Enum.B, Enum.C);
})();
