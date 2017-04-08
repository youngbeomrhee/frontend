/**
 * Created by YB on 2016-05-21.
 */

function createObject(parentProto) {
    function Func() {}
    Func.prototype = parentProto;
    return new Func();
}



var inherit = (function() {
    var F = function() {};
    return function(C, P) {
        F.prototype = P.prototype;
        C.prototype = new F();
        C.super = P.prototype;
        C.prototype.constructor = C;
    }
}());

function Parent() {};

Parent.prototype.say = function() {
    console.log('hi');
}

function Child() {};

var justChild = new Child();

inherit(Child, Parent);

var inheritedChild = new Child();

inheritedChild.say();
justChild.say();
