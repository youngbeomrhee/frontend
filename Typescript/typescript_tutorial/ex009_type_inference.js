"use strict";
(function () {
    var x = [0, 1, null];
    // let zoo = [new Rhino(), new Elephant(), new Snake()];    // cannot inference
    // let zoo: Animal[] = [new Rhino(), new Elephant(), new Snake()];    // specified as Animal type
})();
(function () {
    window.onmousedown = function (mouseEvent) {
        // console.log(mouseEvent.clickTime);  //<- Error
    };
})();
(function () {
    window.onmousedown = function (mouseEvent) {
        console.log(mouseEvent.button); //<- Now, no error is given
    };
})();
(function () {
    /*
    function createZoo(): Animal[] {
        return [new Rhino(), new Elephant(), new Snake()];
    }
    */
})();
