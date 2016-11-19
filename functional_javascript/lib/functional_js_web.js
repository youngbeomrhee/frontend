/**
 * Created by YB on 2016-10-23.
 */

// chapter01.js start ===============================================>

/**
 * 함수를 인자로 받아서 다른 함수를 리턴
 * @param fun
 * @returns {Function}
 */
function splat(fun) {
    return function(array) {
        return fun.apply(null, array);
    };
}

/*
var addArrayElements = splat(function(x, y) { return x + y });

addArrayElements([1, 2]);
//=> 3
*/
/**
 * splat과 반대로 작동. 함수를 인자로 받아 다른 함수로 리턴.
 * 반환되는 함수는 다수의 인자를 받을 수 있고 원래 함수를 주어진 인자들의 배열값으로 호출한다.
 * @param fun
 * @returns {Function}
 */
function unsplat(fun) {
    return function() {
        return fun.call(null, _.toArray(arguments));
    };
}

/*
var joinElements = unsplat(function(array) { return array.join(' ') });

joinElements(1, 2);
//=> "1 2"

joinElements('-', '$', '/', '!', ':');
//=> "- $ / ! :"
*/

function parseAge(age) {
    if (!_.isString(age)) throw new Error("Expecting a string");
    var a;

    console.log("Attempting to parse an age");

    a = parseInt(age, 10);

    if (_.isNaN(a)) {
        console.log(["Could not parse age:", age].join(' '));
        a = 0;
    }

    return a;
}

function fail(thing) {
    throw new Error(thing);
}

function warn(thing) {
    console.log(["WARNING:", thing].join(' '));
}

function note(thing) {
    console.log(["NOTE:", thing].join(' '));
}

function parseAge(age) {
    if (!_.isString(age)) fail("Expecting a string");
    var a;

    note("Attempting to parse an age");
    a = parseInt(age, 10);

    if (_.isNaN(a)) {
        warn(["Could not parse age:", age].join(' '));
        a = 0;
    }

    return a;
}

/*
var letters = ['a', 'b', 'c'];

letters[1];
//=> 'b'
*/

/**
 * 배열 인덱싱 동작을 추상화화 * @param a
 * @param index
 * @returns {*}
 */
function naiveNth(a, index) {
    return a[index];
}

/*
naiveNth('letters', 1);
//=> e
*/

function isIndexed(data) {
    return _.isArray(data) || _.isString(data);
}

/**
 * isIndexed 추상화를 이용해서 naiveNth의 추상화 구현
 * @param a
 * @param index
 * @returns {*}
 */
function nth(a, index) {
    if (!_.isNumber(index)) fail("Expected a number as the index");
    if (!isIndexed(a)) fail("Not supported on non-indexed type");
    if ((index < 0) || (index > a.length - 1))
        fail("Index value is out of bounds");

    return a[index];
}

/**
 * nth를 이용해서 다른 함수를 추상화
 * @param a
 * @returns {*}
 */
function second(a) {
    return nth(a, 1);
}

function compareLessThanOrEqual(x, y) {
    if (x < y) return -1;
    if (y < x) return  1;
    return 0;
}
// 이런 함수는 조건절(Boolean(true,false)로 판단)하는 경우에는 맞지 않다

/*
[2, 3, -1, -6, 0, -108, 42, 10].sort(compareLessThanOrEqual);
//=> [-108, -6, -1, 0, 2, 3, 10, 42]
*/
/**
 * compareLessThanOrEqual보다 아래처럼 찬반형(predicate) 형태로 구현하는 것이 더 바람직하다
 * @param x
 * @param y
 * @returns {boolean}
 */
function lessOrEqual(x, y) {
    return x <= y;
}

/**
 * compareLessThanOrEqual을 이제 기존 함수의 조합을 사용해서 만들 수 있다
 * @param pred
 * @returns {Function}
 */
function comparator(pred) {
    return function(x, y) {
        if (truthy(pred(x, y)))
            return -1;
        else if (truthy(pred(y, x)))
            return 1;
        else
            return 0;
    };
}



function lameCSV(str) {
    return _.reduce(str.split("\n"), function(table, row) {
        table.push(_.map(row.split(","), function(c) { return c.trim()}));
        return table;
    }, []);
};

/*
var peopleTable = lameCSV("name,age,hair\nMerble,35,red\nBob,64,blonde");

peopleTable;
//=> [["name",  "age",  "hair"],
//    ["Merble", "35",  "red"],
//    ["Bob",    "64",  "blonde"]]
*/

function selectNames(table) {
    return _.rest(_.map(table, _.first));
}

function selectAges(table) {
    return _.rest(_.map(table, second));
}

function selectHairColor(table) {
    return _.rest(_.map(table, function(row) {
        return nth(row, 2);
    }));
}

/*
var mergeResults = _.zip;
*/

function existy(x) { return x != null }

function truthy(x) { return (x !== false) && existy(x) }

function doWhen(cond, action) {
    if(truthy(cond))
        return action();
    else
        return undefined;
}

function executeIfHasField(target, name) {
    return doWhen(existy(target[name]), function() {
        var result = _.result(target, name);
        console.log(['The result is', result].join(' '));
        return result;
    });
}

// ===============================================> chapter01.js end





function lyricSegment(n) {
    return _.chain([])
        .push(n + " bottles of beer on the wall")
        .push(n + " bottles of beer")
        .push("Take one down, pass it around")
        .tap(function(lyrics) {
            if (n > 1)
                lyrics.push((n - 1) + " bottles of beer on the wall.");
            else
                lyrics.push("No more bottles of beer on the wall!");
        })
        .value();
}

function song(start, end, lyricGen) {
    return _.reduce(_.range(start,end,-1),
        function(acc,n) {
            return acc.concat(lyricGen(n));
        }, []);
}

function doubleAll(array) {
    return _.map(array, function(n) { return n*2 });
}

function average(array) {
    var sum = _.reduce(array, function(a, b) { return a+b });
    return sum / _.size(array);
}

/* grab only even numbers in nums */
function onlyEven(array) {
    return _.filter(array, function(n) {
        return (n%2) === 0;
    });
}

function allOf(/* funs */) {
    return _.reduceRight(arguments, function(truth, f) {
        return truth && f();
    }, true);
}

function anyOf(/* funs */) {
    return _.reduceRight(arguments, function(truth, f) {
        return truth || f();
    }, false);
}

function complement(pred) {
    return function() {
        return !pred.apply(null, _.toArray(arguments));
    };
}

function cat() {
    var head = _.first(arguments);
    if (existy(head))
        return head.concat.apply(head, _.rest(arguments));
    else
        return [];
}

function construct(head, tail) {
    return cat([head], _.toArray(tail));
}

// collection을 함수로 가공 처리한 결과(map 한) 배열로 catenate
function mapcat(fun, coll) {
    return cat.apply(null, _.map(coll, fun));
}

function butLast(coll) {
    return _.toArray(coll).slice(0, -1);
}

function interpose (inter, coll) {
    return butLast(mapcat(function(e) {
            return construct(e, [inter]);
        },
        coll));
}

function project(table, keys) {
    return _.map(table, function(obj) {
        return _.pick.apply(null, construct(obj, keys));
    });
}

function rename(obj, newNames) {
    return _.reduce(newNames, function(o, nu, old) {
            if (_.has(obj, old)) {
                o[nu] = obj[old];
                return o;
            }
            else
                return o;
        },
        _.omit.apply(null, construct(obj, _.keys(newNames))));
}

function as(table, newNames) {
    return _.map(table, function(obj) {
        return rename(obj, newNames);
    });
}

function restrict(table, pred) {
    return _.reduce(table, function(newTable, obj) {
        if (truthy(pred(obj)))
            return newTable;
        else
            return _.without(newTable, obj);
    }, table);
}

function makeEmptyObject() {
    return new Object();
}

function makeBindFun(resolver) {
    return function(k, v) {
        var stack = globals[k] || [];
        globals[k] = resolver(stack, v);
        return globals;
    };
}


function f() { return dynamicLookup('a'); };
function g() { stackBinder('a', 'g'); return f(); };

function strangeIdentity(n) {
    // intentionally strange
    for(var i=0; i<n; i++);
    return i;
}

function strangerIdentity(n) {
    // intentionally stranger still
    for(this['i'] = 0; this['i']<n; this['i']++);
    return this['i'];
}

function createScaleFunction(FACTOR) {
    return function(v) {
        return _.map(v, function(n) {
            return (n * FACTOR);
        });
    };
}

function createWeirdScaleFunction(FACTOR) {
    return function(v) {
        this['FACTOR'] = FACTOR;
        var captures = this;

        return _.map(v, _.bind(function(n) {
            return (n * this['FACTOR']);
        }, captures));
    };
}

function makeAdder(CAPTURED) {
    return function(free) {
        return free + CAPTURED;
    };
}

function averageDamp(FUN) {
    return function(n) {
        return average([n, FUN(n)]);
    }
}

// predicate(찬반형함수)를 받아서 실행 가능한 상태로 스텐바이
// 실행시점에는 받아온 인자를 모두 넘겨서 실행한 결과의 부정값을 리턴
function complement(PRED) {
    return function() {
        return !PRED.apply(null, _.toArray(arguments));
    };
}

function isEven(n) { return (n%2) === 0 }

function plucker(FIELD) {
    return function(obj) {
        return (obj && obj[FIELD]);
    };
}

function finder(valueFun, bestFun, coll) {
    return _.reduce(coll, function(best, current) {
        var bestValue = valueFun(best);
        var currentValue = valueFun(current);

        return (bestValue === bestFun(bestValue, currentValue)) ? best : current;
    });
}

function best(fun, coll) {
    return _.reduce(coll, function(x, y) {
        return fun(x, y) ? x : y;
    });
}

function repeat(times, VALUE) {
    return _.map(_.range(times), function() { return VALUE; });
}

function repeatedly(times, fun) {
    return _.map(_.range(times), fun);
}

function iterateUntil(fun, check, init) {
    var ret = [];
    var result = fun(init);

    while (check(result)) {
        ret.push(result);
        result = fun(result);
    }

    return ret;
}

function always(VALUE) {
    return function() {
        return VALUE;
    };
}

/**
 * 생성시에 넣어둔 메서드가 실행할때 넘어오는 target의 요소인 경우에만 실행되는 함수를 반환
 * @param NAME
 * @param METHOD
 * @returns {Function}
 */
function invoker (NAME, METHOD) {
    return function(target /* args ... */) {
        if (!existy(target)) fail("Must provide a target");

        var targetMethod = target[NAME];
        var args = _.rest(arguments);

        // targetMethod가 처음에 생성될때 넘겨준 함수와 동일한 경우에만 실행
        return doWhen((existy(targetMethod) && METHOD === targetMethod), function() {
            return targetMethod.apply(target, args);
        });
    };
}

function uniqueString(len) {
    return Math.random().toString(36).substr(2, len);
}

function uniqueStringPrefix(prefix) {
    return [prefix, new Date().getTime()].join('');
}

function makeUniqueStringFunction(start) {
    var COUNTER = start;

    return function(prefix) {
        return [prefix, COUNTER++].join('');
    }
}

function fnull(fun /*, defaults */) {
    var defaults = _.rest(arguments);

    return function(/* args */) {
        var args = _.map(arguments, function(e, i) {
            return existy(e) ? e : defaults[i];
        });

        return fun.apply(null, args);
    };
};

function defaults(d) {
    return function(o, k) {
        var val = fnull(_.identity, d[k]);
        return o && val(o[k]);
    };
}

function doSomething(config) {
    var lookup = defaults({critical: 108});

    return lookup(config, 'critical');
}

function checker(/* validators */) {
    // 처음 실행시에는 validation 할 함수리스트만 세팅
    var validators = _.toArray(arguments);
    return function(obj) {
        // 두 번째 실행시
        // validation 루프
        // reduce의 마지막 인자로 에러 정보를 담을 빈 배열 선언
        return _.reduce(validators, function(errs, check) {
            if (check(obj)) {   // validation 통과시에는 현재 errs 넘김
                return errs;
            } else {    // 조건을 만족하지 못할 경우에는
                return _.chain(errs).push(check.message).value();
            }
        }, []);
    };
}

// 검증을 통과하지 못했을때 보여줄 메시지와 검증찬반형 함수를 인자로 받아서
// 실행준비된 검증찬반형함수에 실패했을 때의 메시지를 'message' 프로퍼티에 넣어서 리턴
function validator(message, /* 찬반형 */fun) {
    // 함수를 실행한 결과를
    var f = function(/* args */) {
        return fun.apply(fun, arguments);
    };

    f['message'] = message;
    return f;
}

function aMap(obj) {
    return _.isObject(obj);
}

function hasKeys() {
    var KEYS = _.toArray(arguments);

    var fun = function(obj) {
        return _.every(KEYS, function(k) {
            return _.has(obj, k);
        });
    };

    fun.message = cat(["Must have values for keys:"], KEYS).join(" ");
    return fun;
}


function dispatch(/* funs */) {
    var funs = _.toArray(arguments);
    var size = funs.length;

    return function(target /*, args */) {
        var ret = undefined;
        var args = _.rest(arguments);

        for (var funIndex = 0; funIndex < size; funIndex++) {
            var fun = funs[funIndex];
            ret = fun.apply(fun, construct(target, args));

            if (existy(ret)) return ret;
        }

        return ret;
    };
}

/*
 var str = dispatch(invoker('toString', Array.prototype.toString),
 invoker('toString', String.prototype.toString));

 console.log(`str('a') : ${str('a')}`);
 console.log(`str(_.range(10)) : ${str(_.range(10))}`);

 Object.prototype.stringify = function() {
 return Object.keys(this).map((key)=> key + ' : ' + this[key]).join(', ');
 };

 var toStr = dispatch(
 invoker('toString', Array.prototype.toString),
 invoker('toString', String.prototype.toString),
 invoker('stringify', Object.prototype.stringify),
 invoker('toString', Boolean.prototype.toString),
 invoker('toString', Number.prototype.toString)
 );


 console.log(`toStr(1) : ${toStr(1)}`);
 console.log(`toStr('a') : ${toStr('a')}`);
 console.log(`toStr(_.range(10)) : ${toStr(_.range(10))}`);
 console.log(`toStr({a:1, b:2, c:'str'}) : ${toStr({a:1, b:2, c:'str'})}`);
 console.log(`toStr(false) : ${toStr(false)}`);


 var polyToString = dispatch(
 function(s) { return _.isString(s) ? s : undefined },
 function(s) { return _.isArray(s) ? stringifyArray(s) : undefined },
 function(s) { return _.isObject(s) ? JSON.stringify(s) : undefined },
 function(s) { return s.toString() }
 );


 console.log(`polyToString(1) : ${polyToString(1)}`);
 console.log(`polyToString('a') : ${polyToString('a')}`);
 console.log(`polyToString(_.range(10)) : ${polyToString(_.range(10))}`);
 console.log(`polyToString({a:1, b:2, c:'str'}) : ${polyToString({a:1, b:2, c:'str'})}`);
 console.log(`polyToString(false) : ${polyToString(false)}`);

 */


function stringReverse(s) {
    if (!_.isString(s)) return undefined;
    return s.split('').reverse().join("");
}

/*
 // dispatch로 만든 함수를 dispatch의 인자로 제공함으로써 유연성을 극대화할 수 있다
 var sillyReverse = dispatch(rev, fjs.always("Can't reverse"));

 console.log(`sillyReverse([1,2,3]) : ${sillyReverse([1,2,3])}`);
 console.log(`sillyReverse('asdfas') : ${sillyReverse('asdfas')}`);
 console.log(`sillyReverse(234) : ${sillyReverse(234)}`);
 */

// 수동적으로 명령을 분류하는 switch 문을 dispatch로 대체할 수 있다.
function notify(msg) {
    return '# notify : ' + msg;
}

function changeView(target) {
    return target + ' has changed';
}

function performCommandHardcoded(command) {
    var result;

    switch (command.type)
    {
        case 'notify':
            result = notify(command.message);
            break;
        case 'join':
            result = changeView(command.target);
            break;
        default:
            return command.type;
            break;
    }

    return result;
}

/*
console.log(`performCommandHardcoded({type: 'notify', message: 'hi!'}) : ${performCommandHardcoded({type: 'notify', message: 'hi!'})}`);
console.log(`performCommandHardcoded({type: 'join', target: 'waiting-room!'}) : ${performCommandHardcoded({type: 'join', target: 'waiting-room!'})}`);
console.log(`performCommandHardcoded({type: 'wat'}) : ${performCommandHardcoded({type: 'wat'})}`);
*/

function isa(type, action) {
    return function(obj) {
        if (type === obj.type)
            return action(obj);
    }
}

var performCommand = dispatch(
    isa('notify', function(obj) { return notify(obj.message); }),
    isa('join', function(obj) { return changeView(obj.target); }),
    function(obj) { return obj.type; }
)


/*
console.log(`performCommand({type: 'notify', message: 'hi!'}) : ${performCommandHardcoded({type: 'notify', message: 'hi!'})}`);
console.log(`performCommand({type: 'join', target: 'waiting-room!'}) : ${performCommandHardcoded({type: 'join', target: 'waiting-room!'})}`);
console.log(`performCommand({type: 'wat'}) : ${performCommandHardcoded({type: 'wat'})}`);
*/

// performCommandHardcoded 함수의 기능을 확장하려면 switch 문 자체를 고쳐야 하지만 dispatch 함수를 쓰면 간단하게 새 기능을 추가할 수 있다.
var performAdminCommand = dispatch(
  isa('kill', /* function (obj) { return shutdown(obj.hostname) }} */ (obj)=>'shutdown '+obj.hostname),
  performCommand
);

/*
console.log(`performAdminCommand({type: 'kill', hostname: 'localhost'}) : ${performAdminCommand({type: 'kill', hostname: 'localhost'})}`);
console.log(`performAdminCommand({type: 'flail'}) : ${performAdminCommand({type: 'flail'})}`);
console.log(`performAdminCommand({type: 'join', target: 'foo'}) : ${performAdminCommand({type: 'join', target: 'foo'})}`);
*/

// 두 개 이상의 dispatch가 연결된 dispatch 체인에서 특정 명령을 오버라이드해서 그 명령이 수행되지 않도록 할 수도 있다.
var performTrialUserCommand = dispatch(
  isa('join', function (obj) { console.log('Cannot join until approved'); }),
  performCommand
);

/*
console.log(`performTrialUserCommand({type: 'join', target: 'foo'}) : ${performTrialUserCommand({type: 'join', target: 'foo'})}`);
console.log(`performTrialUserCommand({type: 'notify', message: 'Hi new user'}) : ${performTrialUserCommand({type: 'notify', message: 'Hi new user'})}`);
*/


function rightAwayInvoker() {
    var args = _.toArray(arguments);
    var method = args.shift();
    var target = args.shift();

    return method.apply(target, args);
}

function leftCurryDiv(n) {
    return function(d) {
        return n/d;
    };
}

function rightCurryDiv(d) {
    return function(n) {
        return n/d;
    };
}

function curry(fun) {
    return function(arg) {
        return fun(arg);
    };
}

function curry2(fun) {
    return function(secondArg) {
        return function(firstArg) {
            return fun(firstArg, secondArg);
        };
    };
}

function div(n, d) { return n / d }

function songToString(song) {
    return [song.artist, song.track].join(" - ");
}

function curry3(fun) {
    return function(last) {
        return function(middle) {
            return function(first) {
                return fun(first, middle, last);
            };
        };
    };
};

function toHex(n) {
    var hex = n.toString(16);
    return (hex.length < 2) ? [0, hex].join(''): hex;
}

function rgbToHexString(r, g, b) {
    return ["#", toHex(r), toHex(g), toHex(b)].join('');
}

/* 커링을 이용한 플루언트 API */
var greaterThan = curry2(function (lhs, rhs) { return lhs > rhs });
var lessThan = curry2(function (lhs, rhs) { return lhs < rhs });

var withinRange = checker(
  validator('arg must be a integer', Number.isInteger),
  validator('arg must be greater than 10', greaterThan(10)),
  validator('arg must be less than 20', lessThan(20))
);

/*
console.log(`withinRange(15) : ${withinRange(15)}`);
console.log(`withinRange(1) : ${withinRange(1)}`);
console.log(`withinRange(100) : ${withinRange(100)}`);
console.log(`withinRange('str') : ${withinRange('str')}`);
*/

function divPart(n) {
    return function(d) {
        return n / d;
    };
}

/*
var over10Part = divPart(10);
console.log(`over10Part(2) : ${over10Part(2)}`);
*/

// 첫 번째 인자를 부분 적용하는 함수 예제
function partial1(fun, arg1) {
    // 처음 실행 결과로 실행될 함수(fun)과 첫 번째 파라미터(arg1)이 고정됨
    return function(/* args */) {
        var args = construct(arg1, arguments);
        return fun.apply(fun, args);
    };
}

/*
var over10part1 = partial1(div, 10);
console.log(`over10part1(5) : ${over10part1(5)}`);
*/

// 두 개의 인자를 부분 적용하는 함수
function partial2(fun, arg1, arg2) {
    return function(/* args */) {
        var args = cat([arg1, arg2], arguments);
        return fun.apply(fun, args);
    };
}

/*
var div10By2 = partial2(div, 10, 2);
console.log(`div10By2() : ${div10By2()}`);
*/


// 임의의 수의 인자를 부분 적용
function partial(fun /*, pargs */) {
    var pargs = _.rest(arguments);

    // 몇 몇 인자를 캡처해서 그들을 최종 호출 시 자신의 인자 앞에 붙여 사용하도록 함수를 반환
    return function(/* arguments */) {
        var args = cat(pargs, _.toArray(arguments));
        return fun.apply(fun, args);
    };
};

/*
var over10Partial = partial(div, 10);
console.log(`over10Partial(2) : ${over10Partial(2)}`);

var div10By2 = partial(div, 10, 2);
console.log(`div10By2() : ${div10By2()}`);

// 실제 연산에 사용될 함수가 사용하는 인자 수를 초과할 경우에 나머지 인자들은 무시된다.
var div10By2By4By5000Partial = partial(div, 10, 2, 4, 5000);
console.log(`div10By2By4By5000Partial() : ${div10By2By4By5000Partial()}`);
*/

// 반환된 에러 배열이 비었다는 것은 전혀 에러가 발생하지 않았음을 가리킨다.
// validator는 함수 인자 수동 검증과 같은 다양한 용도로 활용할 수 있다.
// console.log(`validator('arg must be a map', aMap)(42) : ${validator('arg must be a map', aMap)(42)}`);

var zero = validator('cannot be zero', function (n) { return 0 === n });
var number = validator('arg must be a number', _.isNumber);

// 제곱을 구하는 함수
function sqr(n) {
    if (!number(n)) throw new Error(number.message);
    if (zero(n))    throw new Error(zero.message);

    return n * n;
}

/*
console.log(`sqr(10) : ${sqr(10)}`);
console.log(`sqr(0) : ${sqr(0)}`);
console.log(`sqr('') : ${sqr('')}`);
*/

// 핵심적인 계산 로직과는 독립적으로 선행조건을 추가하도록 부분 적용을 이용할 수 있다.
// 후행조건에도 사용될 수 있다
function condition1(/* validators */) {
    // 검사에 사용될 validation 함수들을 추가
    var validators = _.toArray(arguments);
    return function(fun, arg) {
        // validators를 하나하나 확인하면서 에러배열에 메시지 삽입
        // validators interface : 실행 결과는 Boolean, 실패시(return false) 프로퍼티에 담길 message
        // function validator(message, /* 찬반형 */fun) { return function(){};}
        var errors = mapcat(function(isValid) {
            return isValid(arg) ? [] : [isValid.message];
        }, validators);

        if (!_.isEmpty(errors))
            throw new Error(errors.join(", "));

        // 모든 validation 통과시에 함수 실행
        return fun(arg);
    };
}

function conditionAll(/* validators */) {
    // 검사에 사용될 validation 함수들을 추가
    var validators = _.toArray(arguments);
    return function(fun) {
        // validators를 하나하나 확인하면서 에러배열에 메시지 삽입
        // validators interface : 실행 결과는 Boolean, 실패시(return false) 프로퍼티에 담길 message
        // function validator(message, /* 찬반형 */fun) { return function(){};}
        var args = Array.prototype.slice.call(arguments, 0);
        for (var i = 0; i < args.length; i++) {
            var arg = args[i];

            var errors = mapcat(function(isValid) {
                return isValid(arg) ? [] : [isValid.message];
            }, validators);

            if (!_.isEmpty(errors))
                throw new Error(errors.join(", "));
        }

        // 모든 validation 통과시에 함수 실행
        return fun.apply(args);
    };
}


function checkArgsLength(argsLen) {
    return arguments.length === argsLen;
}

function paramIsInteger() {
    Array.prototype.every.call(arguments, (arg)=>Number.isInteger(arg));
}


var sqrPre = condition1(
  validator('arg must not be zero', complement(zero)),  // validator('msg', validator('msg2', func))의 형태
  validator('arg must be a number', _.isNumber)
);

/*
// sqrPre가 제대로 동작하는지 검증
console.log(`sqrPre(_.identity, 10) : ${sqrPre(_.identity, 10)}`);
console.log(`sqrPre(_.identity, '') : ${sqrPre(_.identity, '')}`);
console.log(`sqrPre(_.identity, 0) : ${sqrPre(_.identity, 0)}`);
*/

// 불안정한 sqr 정의 버젼
function uncheckedSqr(n) { return n * n };
// console.log(`uncheckedSqr('') : ${uncheckedSqr('')}`);

// 안전한 sqr 정의 버젼
// 핵심 계산 과정과 검증 단계가 분리된 sqr 버젼
var checkedSqr = partial1(sqrPre, uncheckedSqr);
// => sqrPre(uncheckedSqr, 실행시에 넘어올 arguments)
/*
console.log(`checkedSqr(10) : ${checkedSqr(10)}`);
console.log(`checkedSqr('') : ${checkedSqr('')}`);
console.log(`checkedSqr(0) : ${checkedSqr(0)}`);
*/

// ... 이어서
// 함수에 조건을 적용하지 않도록 조건 확인 기능을 완전히 제거할 수 있으며 심지어 나중에 새로운 검증을 혼합할 수도 있다.
var sillySquare = partial1(
  condition1(validator('shoud be even', isEven)),   // condition1은 검증에 사용될 여러 validator를 받아서 조건에 문제가 없으면 실행
  checkedSqr
);

/*
console.log(`sillySquare(10) : ${sillySquare(10)}`);
console.log(`sillySquare(11) : ${sillySquare(11)}`);
console.log(`sillySquare('') : ${sillySquare('')}`);
console.log(`sillySquare(0) : ${sillySquare(0)}`);
*/

// 함수의 인자 2개를 validation
var validArgs = conditionAll(
    validator('인자는 2개입니다', checkArgsLength(2)),
    validator('모든 인자는 정수형이어야 합니다.', paramIsInteger)
);



var validateCommand = condition1(
  validator('arg must be a map', _.isObject),
  validator('arg must have the correct keys', hasKeys('msg', 'type'))
);

var createCommand = partial(validateCommand, _.identity);

/*
console.log(`createCommand({}) : ${createCommand({})}`);
console.log(`createCommand(21) : ${createCommand(21)}`);
console.log(`createCommand({msg: "", type: ""}) : ${createCommand({msg: "", type: ""})}`);
*/

var createLaunchCommand = partial1(
  condition1(
    validator('arg must have the count down', hasKeys('countDown'))
  ), createCommand
);

/*
console.log(`createLaunchCommand({msg: '', type: ''}) : ${createLaunchCommand({msg: '', type: ''})}`);
console.log(`createLaunchCommand({msg: '', type: '', countDown: 10}) : ${createLaunchCommand({msg: '', type: '', countDown: 10})}`);
*/

/* 함수의 끝을 서로 연결하는 함수 조립 */
// 한 쪽으로 데이터를 넣으면 반대편으로 완전히 새로운 데이터가 나올 수 있도록 함수의 파이프라인 만들기

// !rhk _.isString 사이에서 파이프라인이 만들어짐
!_.isString(name);

function isntString(str) {
    return !_.isString(str);
}

// console.log(`isntString(1) : ${isntString(1)}`);

// 언더스코어의 _.compose 함수를 이용해서 함수를 조립
// _.compose : Returns the composition of a list of functions, where each function consumes the return value of the function that follows
var isntString = _.compose(function (x) { return !x }, _.isString);

// console.log(`isntString([]) : ${isntString([])}`);

// ! 연산자를 함수로 캡슐화
function not(x) { return !x }

var isntString = _.compose(not, _.isString);

/*
console.log(`isntString('str') : ${isntString('str')}`);
console.log(`isntString(1) : ${isntString(1)}`);
console.log(`isntString([]) : ${isntString([])}`);
*/

// 이전에 정의한 mapcat 함수를 다음과 같이 정의할 수 있다.
var composedMapcat = _.compose(splat(cat), _.map);

// console.log(`composedMapcat([[1,2], [3,4], [5]]) : ${composedMapcat([[1,2], [3,4], [5]])}`);

/* 조립을 이용해서 선행조건과 후행조건 만들기 */
var sqrPost = condition1(
    validator('result shoud be a number', _.isNumber),
    validator('result shoud not be zero', complement(zero)),
    validator('result shoud be positive', greaterThan(0))
);

// console.log(`sqrPost(_.identity, 0) : ${sqrPost(_.identity, 0)}`);
// console.log(`sqrPost(_.identity, -1) : ${sqrPost(_.identity, -1)}`);
// console.log(`sqrPost(_.identity, '') : ${sqrPost(_.identity, '')}`);
// console.log(`sqrPost(_.identity, 100) : ${sqrPost(_.identity, 100)}`);

var megaCheckedSqr = _.compose(partial(sqrPost, _.identity), checkedSqr);

// console.log(`megaCheckedSqr(10) : ${megaCheckedSqr(10)}`);
// console.log(`megaCheckedSqr(0) : ${megaCheckedSqr(0)}`);
// console.log(`megaCheckedSqr(NaN) : ${megaCheckedSqr(NaN)}`);



/* 재귀 */
function myLength(ary) {
    if (_.isEmpty(ary))
        return 0;
    else
        return 1 + myLength(_.rest(ary));
}

function cycle(times, ary) {
    if (times <= 0)
        return [];
    else
        return cat(ary, cycle(times - 1, ary));
}

function constructPair(pair, rests) {
    return [construct(_.first(pair), _.first(rests)),
        construct(second(pair),  second(rests))];
}

function unzip(pairs) {
    if (_.isEmpty(pairs)) return [[],[]];

    return constructPair(_.first(pairs), unzip(_.rest(pairs)));
}

function nexts(graph, node) {
    if (_.isEmpty(graph)) return [];

    var pair = _.first(graph);
    var from = _.first(pair);
    var to   = second(pair);
    var more = _.rest(graph);

    if (_.isEqual(node, from))
        return construct(to, nexts(more, node));
    else
        return nexts(more, node);
}

function depthSearch(graph, nodes, seen) {
    if (_.isEmpty(nodes)) return rev(seen);

    var node = _.first(nodes);
    var more = _.rest(nodes);

    if (_.contains(seen, node))
        return depthSearch(graph, more, seen);
    else
        return depthSearch(graph,
            cat(nexts(graph, node), more),
            construct(node, seen));
}

function tcLength(ary, n) {
    var l = n ? n : 0;

    if (_.isEmpty(ary))
        return l;
    else
        return tcLength(_.rest(ary), l + 1);
}

function andify(/* preds */) {
    var preds = _.toArray(arguments);

    return function(/* args */) {
        var args = _.toArray(arguments);

        var everything = function(ps, truth) {
            if (_.isEmpty(ps))
                return truth;
            else
                return _.every(args, _.first(ps))
                    && everything(_.rest(ps), truth);
        };

        return everything(preds, true);
    };
}

function orify(/* preds */) {
    var preds = _.toArray(arguments);

    return function(/* args */) {
        var args = _.toArray(arguments);

        var something = function(ps, truth) {
            if (_.isEmpty(ps))
                return truth;
            else
                return _.some(args, _.first(ps))
                    || something(_.rest(ps), truth);
        };

        return something(preds, false);
    };
}

function evenSteven(n) {
    if (n === 0)
        return true;
    else
        return oddJohn(Math.abs(n) - 1);
}

function oddJohn(n) {
    if (n === 0)
        return false;
    else
        return evenSteven(Math.abs(n) - 1);
}

function flat(ary) {
    if (_.isArray(ary))
        return cat.apply(cat, _.map(ary, flat));
    else
        return [ary];
}

function deepClone(obj) {
    if (!existy(obj) || !_.isObject(obj))
        return obj;

    var temp = new obj.constructor();
    for (var key in obj)
        if (obj.hasOwnProperty(key))
            temp[key] = deepClone(obj[key]);

    return temp;
}

function visit(mapFun, resultFun, ary) {
    if (_.isArray(ary))
        return resultFun(_.map(ary, mapFun));
    else
        return resultFun(ary);
}

function postDepth(fun, ary) {
    return visit(partial1(postDepth, fun), fun, ary);
}

function preDepth(fun, ary) {
    return visit(partial1(preDepth, fun), fun, fun(ary));
}

function influencedWithStrategy(strategy, lang, graph) {
    var results = [];

    strategy(function(x) {
        if (_.isArray(x) && _.first(x) === lang)
            results.push(second(x));

        return x;
    }, graph);

    return results;
}

function evenOline(n) {
    if (n === 0)
        return true;
    else
        return partial1(oddOline, Math.abs(n) - 1);
}

function oddOline(n) {
    if (n === 0)
        return false;
    else
        return partial1(evenOline, Math.abs(n) - 1);
}

function trampoline(fun /*, args */) {
    var result = fun.apply(fun, _.rest(arguments));

    while (_.isFunction(result)) {
        result = result();
    }

    return result;
}

function isEvenSafe(n) {
    if (n === 0)
        return true;
    else
        return trampoline(partial1(oddOline, Math.abs(n) - 1));
}

function isOddSafe(n) {
    if (n === 0)
        return false;
    else
        return trampoline(partial1(evenOline, Math.abs(n) - 1));
}

function generator(seed, current, step) {
    return {
        head: current(seed),
        tail: function() {
            console.log("forced");
            return generator(step(seed), current, step);
        }
    };
}

function genHead(gen) { return gen.head }
function genTail(gen) { return gen.tail() }

function genTake(n, gen) {
    var doTake = function(x, g, ret) {
        if (x === 0)
            return ret;
        else
            return partial(doTake, x-1, genTail(g), cat(ret, genHead(g)));
    };

    return trampoline(doTake, n, gen, []);
}

function asyncGetAny(interval, urls, onsuccess, onfailure) {
    var n = urls.length;

    var looper = function(i) {
        setTimeout(function() {
            if (i >= n) {
                onfailure("failed");
                return;
            }

            $.get(urls[i], onsuccess)
                .always(function() { console.log("try: " + urls[i]) })
                .fail(function() {
                    looper(i + 1);
                });
        }, interval);
    }

    looper(0);
    return "go";
}

function influenced(graph, node) {
    return _.map(groupFrom(graph)[node], second);
}


function randString(len) {
    var ascii = repeatedly(len,  partial1(rand, 26));

    return _.map(ascii, function(n) {
        return n.toString(36);
    }).join('');
}

PI = 3.14;

function areaOfACircle(radius) {
    return PI * sqr(radius);
}

function generateRandomCharacter() {
    return rand(26).toString(36);
}

function generateString(charGen, len) {
    return repeatedly(len, charGen).join('');
}

function skipTake(n, coll) {
    var ret = [];
    var sz = _.size(coll);

    for(var index = 0; index < sz; index += n) {
        ret.push(coll[index]);
    }

    return ret;
}

function summ(ary) {
    var result = 0;
    var sz = ary.length;

    for (var i = 0; i < sz; i++)
        result += ary[i];

    return result;
}

function summRec(ary, seed) {
    if (_.isEmpty(ary))
        return seed;
    else
        return summRec(_.rest(ary), _.first(ary) + seed);
}

function deepFreeze(obj) {
    if (!Object.isFrozen(obj))
        Object.freeze(obj);

    for (var key in obj) {
        if (!obj.hasOwnProperty(key) || !_.isObject(obj[key]))
            continue;

        deepFreeze(obj[key]);
    }
}


function merge(/*args*/) {
    return _.extend.apply(null, construct({}, arguments));
}

function Point(x, y) {
    this._x = x;
    this._y = y;
}

Point.prototype = {
    withX: function(val) {
        return new Point(val, this._y);
    },
    withY: function(val) {
        return new Point(this._x, val);
    }
};

function Queue(elems) {
    this._q = elems;
}

Queue.prototype = {
    enqueue: function(thing) {
        return new Queue(cat(this._q, [thing]));
    }
};

var SaferQueue = function(elems) {
    this._q = _.clone(elems);
}

SaferQueue.prototype = {
    enqueue: function(thing) {
        return new SaferQueue(cat(this._q, [thing]));
    }
};

function queue() {
    return new SaferQueue(_.toArray(arguments));
}

function Container(init) {
    this._value = init;
};

Container.prototype = {
    update: function(fun /*, args */) {
        var args = _.rest(arguments);
        var oldValue = this._value;

        this._value = fun.apply(this, construct(oldValue, args));

        return this._value;
    }
};

function createPerson() {
    var firstName = "";
    var lastName = "";
    var age = 0;

    return {
        setFirstName: function(fn) {
            firstName = fn;
            return this;
        },
        setLastName: function(ln) {
            lastName = ln;
            return this;
        },
        setAge: function(a) {
            age = a;
            return this;
        },
        toString: function() {
            return [firstName, lastName, age].join(' ');
        }
    };
}

var TITLE_KEY = 'titel';


function LazyChain(obj) {
    this._calls  = [];
    this._target = obj;
}

LazyChain.prototype.invoke = function(methodName /*, args */) {
    var args = _.rest(arguments);

    this._calls.push(function(target) {
        var meth = target[methodName];

        return meth.apply(target, args);
    });

    return this;
};

LazyChain.prototype.force = function() {
    return _.reduce(this._calls, function(target, thunk) {
        return thunk(target);
    }, this._target);
};

LazyChain.prototype.tap = function(fun) {
    this._calls.push(function(target) {
        fun(target);
        return target;
    });

    return this;
}

function LazyChainChainChain(obj) {
    var isLC = (obj instanceof LazyChain);

    this._calls  = isLC ? cat(obj._calls, []) : [];
    this._target = isLC ? obj._target : obj;
}

LazyChainChainChain.prototype = LazyChain.prototype;
/*

var longing = $.Deferred();

function go() {
    var d = $.Deferred();

    $.when("")
        .then(function() {
            setTimeout(function() {
                console.log("sub-task 1");
            }, 5000)
        })
        .then(function() {
            setTimeout(function() {
                console.log("sub-task 2");
            }, 10000)
        })
        .then(function() {
            setTimeout(function() {
                d.resolve("done done done done");
            }, 15000)
        })

    return d.promise();
}
*/

function pipeline(seed /*, args */) {
    return _.reduce(_.rest(arguments),
        function(l,r) { return r(l); },
        seed);
};

function fifth(a) {
    return pipeline(a
        , _.rest
        , _.rest
        , _.rest
        , _.rest
        , _.first);
}

function negativeFifth(a) {
    return pipeline(a
        , fifth
        , function(n) { return -n });
}

function firstEditions(table) {
    return pipeline(table
        , function(t) { return as(t, {ed: 'edition'}) }
        , function(t) { return project(t, ['title', 'edition', 'isbn']) }
        , function(t) { return restrict(t, function(book) {
            return book.edition === 1;
        });
        });
}

var RQL = {
    select: curry2(project),
    as: curry2(as),
    where: curry2(restrict)
};

function allFirstEditions(table) {
    return pipeline(table
        , RQL.as({ed: 'edition'})
        , RQL.select(['title', 'edition', 'isbn'])
        , RQL.where(function(book) {
            return book.edition === 1;
        }));
}

function actions(acts, done) {
    return function (seed) {
        var init = { values: [], state: seed };

        var intermediate = _.reduce(acts, function (stateObj, action) {
            var result = action(stateObj.state);
            var values = cat(stateObj.values, [result.answer]);

            return { values: values, state: result.state };
        }, init);

        var keep = _.filter(intermediate.values, existy);

        return done(keep, intermediate.state);
    };
};

function mSqr() {
    return function(state) {
        var ans = sqr(state);
        return {answer: ans, state: ans};
    }
}

var doubleSquareAction = actions(
    [mSqr(),
        mSqr()],
    function(values) {
        return values;
    });


function mNote() {
    return function(state) {
        note(state);
        return {answer: undefined, state: state};
    }
}

function mNeg() {
    return function(state) {
        return {answer: -state, state: -state};
    }
}

var negativeSqrAction = actions([mSqr(), mNote(), mNeg()],
    function(_, state) {
        return state;
    });

function lift(answerFun, stateFun) {
    return function(/* args */) {
        var args = _.toArray(arguments);

        return function(state) {
            var ans = answerFun.apply(null, construct(state, args));
            var s = stateFun ? stateFun(state) : ans;

            return {answer: ans, state: s};
        };
    };
};

var mSqr2  = lift(sqr);
var mNote2 = lift(note, _.identity);
var mNeg2  = lift(function(n) { return -n });

var negativeSqrAction2 = actions([mSqr2(), mNote2(), mNeg2()],
    function(_, state) {
        return state;
    });

var push = lift(function(stack, e) { return construct(e, stack) });

var pop = lift(_.first, _.rest);

var stackAction = actions([
        push(1),
        push(2),
        pop()
    ],
    function(values, state) {
        return values;
    });

function lazyChain(obj) {
    var calls = [];

    return {
        invoke: function(methodName /* args */) {
            var args = _.rest(arguments);

            calls.push(function(target) {
                var meth = target[methodName];

                return meth.apply(target, args);
            });

            return this;
        },
        force:  function() {
            return _.reduce(calls, function(ret, thunk) {
                return thunk(ret);
            }, obj);
        }
    };
}

function deferredSort(ary) {
    return lazyChain(ary).invoke('sort');
}


function force(thunk) {
    return thunk.force();
}

var validateTriples  = validator(
    "Each array should have three elements",
    function (arrays) {
        return _.every(arrays, function(a) {
            return a.length === 3;
        });
    });

var validateTripleStore = partial1(condition1(validateTriples), _.identity);

function postProcess(arrays) {
    return _.map(arrays, second);
}

function processTriples(data) {
    return pipeline(data
        , JSON.parse
        , validateTripleStore
        , deferredSort
        , force
        , postProcess
        , invoker('sort', Array.prototype.sort)
        , str);
}

var reportDataPackets = _.compose(
    function(s) { $('#result').text(s) },
    processTriples);

function polyToString(obj) {
    if (obj instanceof String)
        return obj;
    else if (obj instanceof Array)
        return stringifyArray(obj);

    return obj.toString();
}

function stringifyArray(ary) {
    return ["[", _.map(ary, polyToString).join(","), "]"].join('');
}

var polyToString = dispatch(
    function(s) { return _.isString(s) ? s : undefined },
    function(s) { return _.isArray(s) ? stringifyArray(s) : undefined },
    function(s) { return _.isObject(s) ? JSON.stringify(s) : undefined },
    function(s) { return s.toString() });

Container.prototype.toString = function() {
    return ["@<", polyToString(this._value), ">"].join('');
}


/*
function ContainerClass() {}
function ObservedContainerClass() {}
function HoleClass() {}
function CASClass() {}
function TableBaseClass() {}

ObservedContainerClass.prototype = new ContainerClass();
HoleClass.prototype = new ObservedContainerClass();
CASClass.prototype = new HoleClass();
TableBaseClass.prototype = new HoleClass();

var ContainerClass = Class.extend({
    init: function(val) {
        this._value = val;
    },
});

var c = new ContainerClass(42);

c;
//=> {_value: 42 ...}

c instanceof Class;
//=> true

var ObservedContainerClass = ContainerClass.extend({
    observe: function(f) { note("set observer") },
    notify: function() { note("notifying observers") }
});

var HoleClass = ObservedContainerClass.extend({
    init: function(val) { this.setValue(val) },
    setValue: function(val) {
        this._value = val;
        this.notify();
        return val;
    }
});

var CASClass = HoleClass.extend({
    swap: function(oldVal, newVal) {
        if (!_.isEqual(oldVal, this._value)) fail("No match");

        return this.setValue(newVal);
    }
});
*/

function Container(val) {
    this._value = val;
    this.init(val);
}

Container.prototype.init = _.identity;

var HoleMixin = {
    setValue: function(newValue) {
        var oldVal  = this._value;

        this.validate(newValue);
        this._value = newValue;
        this.notify(oldVal, newValue);
        return this._value;
    }
};

var Hole = function(val) {
    Container.call(this, val);
}

var ObserverMixin = (function() {
    var _watchers = [];

    return {
        watch: function(fun) {
            _watchers.push(fun);
            return _.size(_watchers);
        },
        notify: function(oldVal, newVal) {
            _.each(_watchers, function(watcher) {
                watcher.call(this, oldVal, newVal);
            });

            return _.size(_watchers);
        }
    };
}());

var ValidateMixin = {
    addValidator: function(fun) {
        this._validator = fun;
    },
    init: function(val) {
        this.validate(val);
    },
    validate: function(val) {
        if (existy(this._validator) &&
            !this._validator(val))
            fail("Attempted to set invalid value " + polyToString(val));
    }
};

_.extend(Hole.prototype
    , HoleMixin
    , ValidateMixin
    , ObserverMixin);

var SwapMixin = {
    swap: function(fun /* , args... */) {
        var args = _.rest(arguments)
        var newValue = fun.apply(this, construct(this._value, args));

        return this.setValue(newValue);
    }
};

var SnapshotMixin = {
    snapshot: function() {
        return deepClone(this._value);
    }
};

_.extend(Hole.prototype
    , HoleMixin
    , ValidateMixin
    , ObserverMixin
    , SwapMixin
    , SnapshotMixin);

var CAS = function(val) {
    Hole.call(this, val);
}

var CASMixin = {
    swap: function(oldVal, f) {
        if (this._value === oldVal) {
            this.setValue(f(this._value));
            return this._value;
        }
        else {
            return undefined;
        }
    }
};

_.extend(CAS.prototype
    , HoleMixin
    , ValidateMixin
    , ObserverMixin
    , SwapMixin
    , CASMixin
    , SnapshotMixin);

function contain(value) {
    return new Container(value);
}

function hole(val /*, validator */) {
    var h = new Hole();
    var v = _.toArray(arguments)[1];

    if (v) h.addValidator(v);

    h.setValue(val);

    return h;
}

var swap = invoker('swap', Hole.prototype.swap);

function cas(val /*, args */) {
    var h = hole.apply(this, arguments);
    var c = new CAS(val);
    c._validator = h._validator;

    return c;
}

var compareAndSwap = invoker('swap', CAS.prototype.swap);

function snapshot(o) { return o.snapshot() }
function addWatcher(o, fun) { o.watch(fun) }
