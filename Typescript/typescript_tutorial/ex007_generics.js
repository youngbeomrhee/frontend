"use strict";
(function () {
    function identity(arg) {
        return arg;
    }
    var val = identity(3);
    val = identity(5);
    // val = identity('str');
    // val = identity(true);
    // val = identity({});
});
(function () {
    function identity(arg) {
        return arg;
    }
    var val = identity(3);
    val = identity(5);
    // val = identity('str');
    // val = identity(true);
    // val = identity({});
    var val2 = identity('str');
    // val2 = identity(true);
    // val2 = identity({});
    var val3 = identity('str');
    // val3 = identity(true);
    // val3 = identity({});
});
/* Generic types */
(function () {
    function identity(arg) {
        return arg;
    }
    var myIdentity = identity;
})();
(function () {
})();
(function () {
})();
(function () {
})();
(function () {
})();
(function () {
})();
(function () {
})();
