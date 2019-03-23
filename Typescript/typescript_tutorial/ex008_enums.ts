
/* Numeric enums */
(()=>{
    enum Direction {
        Up = 1,
        Down,
        Left,
        Right,
    }
    console.log(Direction.Up, Direction.Down, Direction.Left, Direction.Right);     // 1 2 3 4
})();

(()=>{
    enum Direction {
        Up,
        Down,
        Left,
        Right,
    }
    console.log(Direction.Up, Direction.Down, Direction.Left, Direction.Right);     // 0 1 2 3
})();

(()=>{
    enum Response {
        No = 0,
        Yes = 1,
    }

    function respond(recipient: string, message: Response): void {
        // ...
        console.log(recipient, message);
    }

    respond("Princess Caroline", Response.Yes)

    /*
    enum E {
        A = getSomeValue(),
        B, // error! 'A' is not constant-initialized, so 'B' needs an initializer
    }
    */
})();


/* String enums */
(()=>{
    enum Direction {
        Up = "UP",
        Down = "DOWN",
        Left = "LEFT",
        Right = "RIGHT",
    }
})();


/* Heterogeneous enums */
(()=>{
    enum BooleanLikeHeterogeneousEnum {
        No = 0,
        Yes = "YES",
    }
})();

/* Computed and constant members */
(()=>{
    // E.X is constant:
    enum E { X }
    console.log(E.X);

    // All enum members in 'E1' and 'E2' are constant.

    enum E1 { X, Y, Z }
    console.log(E1.X, E1.Y, E1.Z);

    enum E2 {
        A = 1, B, C
    }
    console.log(E2.A, E2.B, E2.C);

    enum FileAccess {
        // constant members
        None,
        Read    = 1 << 1,
        Write   = 1 << 2,
        ReadWrite  = Read | Write,
        // computed member
        G = "123".length
    }

    console.log(FileAccess.None, FileAccess.Read, FileAccess.Write, FileAccess.ReadWrite, FileAccess.G);
})();


/* Union enums and enum member types */
(()=>{
    enum ShapeKind {
        Circle,
        Square,
    }

    interface Circle {
        kind: ShapeKind.Circle;
        radius: number;
    }

    interface Square {
        kind: ShapeKind.Square;
        sideLength: number;
    }

    let c: Circle = {
        kind: ShapeKind.Square,     // Error already defined as ShapeKind.Circle type
        // kind: ShapeKind.Circle,
        //    ~~~~~~~~~~~~~~~~ Error!
        radius: 100,
    }


    enum E {
        Foo,
        Bar,
    }

    function f(x: E) {
        // if (x !== E.Foo || x !== E.Bar) {   // Silly comparison
        // if (x !== E.Foo && x !== E.Bar) {    // right comparison
            //             ~~~~~~~~~~~
            // Error! Operator '!==' cannot be applied to types 'E.Foo' and 'E.Bar'.
        // }
    }
})();

/* Enums at runtime */
(()=>{
    enum E {
        X, Y, Z
    }

    function f(obj: { X: number }) {
        return obj.X;
    }

    // Works, since 'E' has a property named 'X' which is a number.
    f(E);
})();

/* Reverse mappings */
(()=>{
    enum Enum {
        A
    }
    let a = Enum.A;
    let nameOfA = Enum[a]; // "A"
})();

/* const enums */
(()=>{
    const enum Enum {
        A = 1,
        B = A * 2
    }
})();


(()=>{
    const enum Directions {
        Up,
        Down,
        Left,
        Right
    }

    let directions = [Directions.Up, Directions.Down, Directions.Left, Directions.Right]
})();


/* Ambient enums */
(()=>{
    /*declare*/ enum Enum {
        A = 1,
        B,
        C = 2
    }
    console.log(Enum.A, Enum.B, Enum.C)
})();

