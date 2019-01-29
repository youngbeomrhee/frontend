/**
 * Created by YB on 2016-10-22.
 */
console.log('\n### 메서드 빌려쓰기');

function f() {
    var args = [].slice.call(arguments, 1, 3);
    return args;
}

console.log(`f(1,2,3,4,5,6) : ${f(1,2,3,4,5,6)}`);

console.log('\n### this');

var one = {
    name: 'object',
    say: function (greet) {
        return greet + ', ' + this.name;
    }
};

console.log(`one.say('hi') : ${one.say('hi')}`);

var two = {
    name: 'another object'
};

console.log(`one.say.apply(two, ['hello']) : ${one.say.apply(two, ['hello'])}`);

// 함수를 변수에 할당하면 함수 안의 this는 전역 객체를 가리키게 된다
var say = one.say;
console.log(`say('hoho') : ${say('hoho')}`);

// 콜백 함수로 전달한 경우
var yetanother = {
    name: 'Yet another object',
    method: function (callback) {
        return callback('Hola');
    }
};
console.log(`yetanother.method(one.say) : ${yetanother.method(one.say)}`);

console.log('\n### bind');

function bind(o, m) {
    return function () {
        return m.apply(o, [].slice.call(arguments));
    };
}

var twosay = bind(two, one.say);
console.log(`twosay('yo') : ${twosay('yo')}`);


if(typeof Function.prototype.bind === 'undefined') {
    Function.prototype.bind = function (thisArg) {
        var fn = this,
            slice = Array.prototype.slice,
            args = slice.call(arguments, 1);
        return function () {
            return fn.apply(thisArg, args.concat(slice.call(arguments)));
        };
    };
}

var twosay2 = one.say.bind(two);
console.log(`twosay2('Bonjour') : ${twosay2('Bonjour')}`);

var twosay3 = one.say.bind(two, 'Enchante');
console.log(`twosay3() : ${twosay3()}`);