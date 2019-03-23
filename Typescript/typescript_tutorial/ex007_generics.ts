/* Hello World of Generics */
// 특정한 타입을 지정하는 경우
(()=>{
    function identity(arg: number): number {
        return arg;
    }

    let val = identity(3);
        val = identity(5);
        // val = identity('str');   // 선언시 지정한 타입이 아니므로 에러
        // val = identity(true);
        // val = identity({});
});

// 모든 타입을 지정하는 경우 => 타입지정의 의미가 없다
(()=>{
    function identity(arg: any): any {
        return arg;
    }

    // 모든 타입으로 지정가능하기 때문에 타입지정의 의미가 없다
    let val = identity(3);
        val = identity(5);
        val = identity('str');
        val = identity(true);
        val = identity({});
});

// The way of capturing the type of the argument
(()=> {
    function identity<T>(arg: T): T {
        return arg;
    }

    let val = identity(3);
    val = identity(5);
    // val = identity('str');   // 초기에 할당한 타입이 아니므로 에러
    // val = identity(true);
    // val = identity({});

    // a call with type argument
    let val2 = identity<string>('myStr');
    // val2 = identity(true);
    // val2 = identity({});

    // type argument inference
    let val3 = identity('myStr');
    // val3 = identity(true);
    // val3 = identity({});

});


/* Generic type variables */
(()=>{
    function identity<T>(arg: T): T {
        return arg;
    }

    function loggingIdentity<T>(arg: T): T {
        // console.log(arg.length);  // 오류 : T는 .length 메소드를 가지고 있지 않습니다.
        return arg;
    }

    function loggingIdentity2<T>(arg: T[]): T[] {
        console.log(arg.length);  // Array는 .length 멤버가 있습니다. 오류 없음.
        return arg;
    }

    function loggingIdentity3<T>(arg: Array<T>): Array<T> {
        console.log(arg.length);  // Array는 .length 멤버가 있습니다. 오류 없음.
        return arg;
    }

    const logging = loggingIdentity([1, 2, 3]);
    const logging1 = loggingIdentity(2);
    const logging2 = loggingIdentity2([1, 2, 3]);
    const logging3 = loggingIdentity3([1, 2, 3]);
})();


/* Generic Types */
// 함수 자체의 타입과 제네릭 인터페이스를 만드는 방법

//
(()=>{
    function identity<T>(arg: T): T {
        return arg;
    }

    let myIdentity: <T>(arg: T) => T = identity;
})();

// 파라미터이 이름이 달라도 무방
(()=>{
    function identity<T>(arg: T): T {
        return arg;
    }

    let myIdentity: <U>(arg: U) => U = identity;
})();

// as object literal type
(()=>{
    function identity<T>(arg: T): T {
        return arg;
    }

    let myIdentity: {<T>(arg: T): T} = identity;

})();

// 인터페이스 정의
(()=>{
    interface GenericIdentityFn {
        <T>(arg: T): T;
    }

    function identity<T>(arg: T): T {
        return arg;
    }

    let myIdentity: GenericIdentityFn = identity;
})();

// Generic 매개변수를 인터페이스의 매개변수로 지정
(()=>{
    interface GenericIdentityFn<T> {
        (arg: T): T;
    }

    function identity<T>(arg: T): T {
        return arg;
    }

    let myIdentity: GenericIdentityFn<number> = identity;
})();



/* Generic Classes */
(()=>{
    class GenericNumber<T> {
        zeroValue: T;
        add: (x: T, y: T) => T;
    }

    let myGenericNumber = new GenericNumber<number>();
    myGenericNumber.zeroValue = 0;
    myGenericNumber.add = function(x, y) { return x + y; };

    // 다른 타입도 지정 가능
    let stringNumeric = new GenericNumber<string>();
    stringNumeric.zeroValue = "";
    stringNumeric.add = function(x, y) { return x + y; };

    console.log(stringNumeric.add(stringNumeric.zeroValue, "test"));
})();


/* Generic Constraints */
(()=>{
    interface Lengthwise {
        length: number;
    }

    function loggingIdentity<T extends Lengthwise>(arg: T): T {
        console.log(arg.length);  // 이제 .length 프로퍼티가 있으므로 더이상 오류가 없습니다.
        return arg;
    }

    // loggingIdentity(2);
    loggingIdentity({length: 10, value: 3});
})();


/* Using Type Parameters in Generic Constraints */
(()=>{
    function getProperty<T, K extends keyof T >(obj: T, key: K) {
        return obj[key];
    }

    let x = { a: 1, b: 2, c: 3, d: 4 };

    getProperty(x, "a"); // 오류 없음
    // getProperty(x, "m"); // 오류 : 타입 'm'의 인수를 'a' | 'b' | 'c' | 'd' 에 할당 할 수 없습니다.
})();



/* Using Class Types in Generics */
(()=>{
    function create<T>(c: {new(): T; }): T {
        return new c();
    }
})();

(()=>{
    class BeeKeeper {
        hasMask: boolean;
    }

    class ZooKeeper {
        nametag: string;
    }

    class Animal {
        numLegs: number;
    }

    class Bee extends Animal {
        keeper: BeeKeeper;
    }

    class Lion extends Animal {
        keeper: ZooKeeper;
    }

    function createInstance<A extends Animal>(c: new () => A): A {
        return new c();
    }

    function createInstance2<A extends Animal>(c: new ()): A {
        return new c();
    }

    createInstance(Lion).keeper.nametag;  // 타입 체크!
    createInstance(Bee).keeper.hasMask;   // 타입 체크!
})();

(()=>{
})();

