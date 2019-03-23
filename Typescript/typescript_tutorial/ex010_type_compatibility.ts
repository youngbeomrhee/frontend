
(()=>{
    interface Named {
        name: string;
    }

    class Person {
        name: string;
    }

    let p: Named;
    // OK, because of structural typing
    p = new Person();
})();


(()=>{
    interface Named {
        name: string;
    }

    let x: Named;
    // y's inferred type is { name: string; location: string; }
    let y = { name: "Alice", location: "Seattle" };
    x = y;

    function greet(n: Named) {
        console.log("Hello, " + n.name);
    }
    greet(y); // OK
})();

/* Comparing two functions */
(()=>{
    let x = (a: number) => 0;
    let y = (b: number, s: string) => 0;

    y = x; // OK
    // x = y; // Error
})();


(()=>{
    let x = () => ({name: "Alice"});
    let y = () => ({name: "Alice", location: "Seattle"});

    x = y; // OK
    // y = x; // Error, because x() lacks a location property
})();


/* Function Parameter Bivariance */
(()=>{
    enum EventType { Mouse, Keyboard }

    interface Event { timestamp: number; }
    interface MouseEvent extends Event { x: number; y: number }
    interface KeyEvent extends Event { keyCode: number }

    function listenEvent(eventType: EventType, handler: (n: Event) => void) {
        /* ... */
    }

    // Unsound, but useful and common
    // if you avoid error change the strictFunctionTypes: true flag to false
    // "strictFunctionTypes": true,           /* Enable strict checking of function types. */
    // listenEvent(EventType.Mouse, (e: MouseEvent) => console.log(e.x + "," + e.y));

    // Undesirable alternatives in presence of soundness
    listenEvent(EventType.Mouse, (e: Event) => console.log((<MouseEvent>e).x + "," + (<MouseEvent>e).y));
    listenEvent(EventType.Mouse, <(e: Event) => void>((e: MouseEvent) => console.log(e.x + "," + e.y)));

    // Still disallowed (clear error). Type safety enforced for wholly incompatible types
    // listenEvent(EventType.Mouse, (e: number) => console.log(e));
})();





/* Optional Parameters and Rest Parameters */
(()=>{
    function invokeLater(args: any[], callback: (...args: any[]) => void) {
        /* ... Invoke callback with 'args' ... */
    }

    // Unsound - invokeLater "might" provide any number of arguments
    invokeLater([1, 2], (x, y) => console.log(x + ", " + y));

    // Confusing (x and y are actually required) and undiscoverable
    invokeLater([1, 2], (x?, y?) => console.log(x + ", " + y));
})();


(()=>{
    enum Status { Ready, Waiting };
    enum Color { Red, Blue, Green };

    let status = Status.Ready;
    // status = Color.Green;  // Error
})();


(()=>{
    class Animal {
        feet: number;
        constructor(name: string, numFeet: number) { }
    }

    class Size {
        feet: number;
        constructor(numFeet: number) { }
    }

    let a: Animal;
    let s: Size;

    a = s;  // OK
    s = a;  // OK

    a = new Animal('lion', 8);
    s = new Size(8);
    a = s;
    s = a;
})();


(()=>{
    interface Empty<T> {
    }
    let x: Empty<number>;
    let y: Empty<string>;

    x = y;  // OK, because y matches structure of x
})();


(()=>{
    interface NotEmpty<T> {
        data: T;
    }
    let x: NotEmpty<number>;
    let y: NotEmpty<string>;

    // x = y;  // Error, because x and y are not compatible
})();


(()=>{
    let identity = function<T>(x: T): T {
        // ...
        return <T>x;
    }

    let reverse = function<U>(y: U): U {
        // ...
        return <U>y;
    }

    identity = reverse;  // OK, because (x: any) => any matches (y: any) => any
})();

