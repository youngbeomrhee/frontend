
(()=>{
    function identity(arg: number): number {
        return arg;
    }

    let val = identity(3);
        val = identity(5);
        // val = identity('str');
        // val = identity(true);
        // val = identity({});
});

(()=> {
    function identity<T>(arg: T): T {
        return arg;
    }

    let val = identity(3);
    val = identity(5);
    // val = identity('str');
    // val = identity(true);
    // val = identity({});

    let val2 = identity<string>('str');
    // val2 = identity(true);
    // val2 = identity({});

    let val3 = identity('str');
    // val3 = identity(true);
    // val3 = identity({});
});


/* Generic types */
(()=>{
    function identity<T>(arg: T): T {
        return arg;
    }

    let myIdentity: <T>(arg: T) => T = identity;
})();



(()=>{

})();

(()=>{

})();

(()=>{

})();

(()=>{

})();

(()=>{

})();

(()=>{

})();