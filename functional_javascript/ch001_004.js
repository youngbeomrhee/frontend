/**
 * Created by YB on 2016-10-23.
 */
let mode;

mode = 'running';   // 이하 코드에서는 log() 함수가 아무런 메시지도 표시 안함
// mode = 'debug';   // 이하 코드에서는 log() 함수가 메시지 표시

// 공통으로 사용할 로그함수
function log(title, result) {
    if(mode==='debug') {
        if(arguments.length<2) {
            result = title;
            title = '';
        }
        console.log((title || '') + (JSON.stringify(result) || ''));
    }
}


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

var library = [{title: "SICP", isbn: "0262010771", ed: 1},
    {title: "SICP", isbn: "0262510871", ed: 2},
    {title: "Joy of Clojure", isbn: "1935182641", ed: 1}];

_.findWhere(library, {title: "SICP", ed: 2});

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

var isOdd = complement(isEven);

// isOdd(2);

// isOdd(413);


function plucker(FIELD) {
    return function(obj) {
        return (obj && obj[FIELD]);
    };
}

/* Chapter 4 - 고차원 함수 p.103 */

// console.log(`_.max([1, 2, 3, 4, 5]) => ${_.max([1, 2, 3, 4, 5])}`);
// console.log(`_.max([1, 2, 3, 4.75, 4.5]) => ${_.max([1, 2, 3, 4.75, 4.5])}`);
var people = [{name: 'Fred', age: 65}, {name: 'Lucy', age: 36}];

// console.log(`_.max(people, function(p) { return p.age; }) => ${_.max(people, function(p) { return p.age; })}`);
// log('_.max(people, function(p) { return p.age; }) => ', _.max(people, function(p) { return p.age; }));

/* 두 개의 인자로 값을 받아 둘중 최적(best-fit)의 값을 반환한다. */
function finder(valueFun, bestFun, coll) {
    return _.reduce(coll, function(best, current) {
        var bestValue = valueFun(best);
        var currentValue = valueFun(current);

        return (bestValue === bestFun(bestValue, currentValue)) ? best : current;
    });
}

/* finder 함수를 이용해서 언더스코어의 _.max와 같은 동작을 시뮬레이션 */
// log('finder(_.identity, Math.max, [1, 2, 3, 4, 5]) => ', finder(_.identity, Math.max, [1, 2, 3, 4, 5]));

// log('finder(plucker("age"), Math.max, people) => ', finder(plucker("age"), Math.max, people));

// log('finder(plucker("name"), function(x, y) { return (x.charAt(0) === "L") ? x : y }, people) => ', finder(plucker("name"), function(x, y) { return (x.charAt(0) === "L") ? x : y }, people));


function best(fun, coll) {
    return _.reduce(coll, function(x, y) {
        return fun(x, y) ? x : y;
    });
}

// log("best(function(x, y) { return x > y; }, [1,2,3,4,5]) => ", best(function(x, y) { return x > y; }, [1,2,3,4,5]));

function repeat(times, VALUE) {
    return _.map(_.range(times), function() { return VALUE; });
}

// log("repeat(4, 'Major') => ", repeat(4, 'Major'));
// log("repeat(3, {a:1}) => ", repeat(3, {a:1}));
// log("repeat(5, [1,2,3]) => ", repeat(5, [1,2,3]));

function repeatedly(times, fun) {
    return _.map(_.range(times), fun);
}

// log("repeatedly(7, function() { return Math.floor(Math.random()*10+1); }) => ", repeatedly(7, function() { return Math.floor(Math.random()*10+1); }));
// log("repeatedly(5, function() { return 'Odeley'; }) => ", repeatedly(5, function() { return 'Odeley'; }));


function iterateUntil(fun, check, init) {
    var ret = [];
    var result = fun(init);

    while (check(result)) {
        ret.push(result);
        result = fun(result);
    }

    return ret;
}

// log("iterateUntil(function(n) { return n+n; }, function(n) { return n <= 1024; }, 1) => ", iterateUntil(function(n) { return n+n; }, function(n) { return n <= 1024; }, 1));

/* repeatedly로 위와 같은 작업을 수행하려면 올바른 배열을 생성할 수 있도록 함수를 호출하기 전에 몇 번 호출해야 하는지 알아야 한다. */
// log("repeatedly(10, function(exp) { return Math.pow(2, exp+1); }) => ", repeatedly(10, function(exp) { return Math.pow(2, exp+1); }));
// log("repeatedly(3, function() { return 'Odelay'; }) => ", repeatedly(3, function() { return 'Odelay'; }));

function always(VALUE) {
    return function() {
        return VALUE;
    };
}

var f = always(function() {});

// log("f() === f() => ", f() === f());

var g = always(function () {});
// log("f() === g() => ", f() === g());

/* repeatedly에서 익명함수 대신에 always를 사용하면 코드가 더 명확해진다 */

// log("repeatedly(3, always('Odelay')) => ", repeatedly(3, always('Odelay')));

/**
 * 함수를 리턴하는 함수. 처음 실행시에 넘긴 인자를 다음번 실행시에 사용하도록 setting 한다.
 * 처음 실행시에 넘긴 NAME(메서드이름)과 METHOD를 다음 번 실행시에 사용.
 * 처음 invoker의 실행결과로 생성된 함수를 실행할때 넘기는 target의 메서드가 생성시에 넣어둔 이름에 해당하는 메서드인 경우에만 실행되는 함수를 반환
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

var rev = invoker('reverse', Array.prototype.reverse);

// log('_.map([[1, 2, 3]], rev) : ', _.map([[1, 2, 3]], rev));

var add100 = makeAdder(100);

// log("add100(38) => ", add100(38));

function uniqueString(len) {
    return Math.random().toString(36).substr(2, len);
}

// log("uniqueString(10) => ", uniqueString(10));

function uniqueStringPrefix(prefix) {
    return [prefix, new Date().getTime()].join('');
}

// log("uniqueStringPrefix('argento') => ", uniqueStringPrefix('argento'));

function makeUniqueStringFunction(start) {
    var COUNTER = start;

    return function(prefix) {
        return [prefix, COUNTER++].join('');
    }
}

var makeUniqueString = makeUniqueStringFunction(0);

// log("makeUniqueString('ghosts') => ", makeUniqueString('ghosts'));
// log("makeUniqueString('turkey') => ", makeUniqueString('turkey'));
// log("makeUniqueString('dari') => ", makeUniqueString('dari'));
// log("makeUniqueString('dari') => ", makeUniqueString('dari'));

/* 유사하지만 안전하지 않은 방식 */
var generator = {
    count: 0,
    uniqueString: function (prefix) {
        return [prefix, this.count++].join('');
    }
}

// log("generator.uniqueString('bohr') => ", generator.uniqueString('bohr'));
// log("generator.uniqueString('bohr') => ", generator.uniqueString('bohr'));

// 위의 코드는 함수형이 아니라는 점 외에도 안전하지 않다는 것이 단점
// count를 재할당
generator.count = 'gotcha';
// log("generator.uniqueString('bohr') => ", generator.uniqueString('bohr'));

// 동적으로 바인딩
// log("generator.uniqueString.call({count: 1337}, 'bohr') => ", generator.uniqueString.call({count: 1337}, 'bohr'));

/* 카운터를 숨기기 */
var omgenerator = (function (init) {
    var COUNTER = init;

    return {
        uniqueString: function (prefix) {
            return [prefix, COUNTER++].join('');
        }
    };
})(0);

// log("omgenerator.uniqueString('lichking-') => ", omgenerator.uniqueString('lichking-'));
// log("omgenerator.uniqueString('lichking-') => ", omgenerator.uniqueString('lichking-'));


/* 연산에 null이나 undefined 등이 포함될 경우, 아래처럼 잘못된 연산결과가 나올 수 있다 */

// var nums = [11, 12, 13, null, 15];
var nums = [1, 2, 3, null, 5];
// log("_.reduce(nums, function (total, n) { return total * n; }) => ", _.reduce(nums, function (total, n) { return total * n; }));

/* 기본값을 설정하는 함수를 사용 */
function defaults(d) {
    return function(o, k) {
        var val = fnull(_.identity, d[k]);
        return o && val(o[k]);
    };
}

/* 이 예제는 좋지 않은 예제 -> reduce 등의 함수가 사용되어 2개의 기본 값이 사용될 것이라는걸 전제하고 있다 */
function fnull(fun /*, defaults */) {
    var defaults = _.rest(arguments);

    return function(/* args */) {
        var args = _.map(arguments, function(e, i) {
            return existy(e) ? e : defaults[i];
        });

        return fun.apply(null, args);
    };
}

var safeMulti = fnull(function (total, n) {
    return total * n;
}, 1, 1);

// log("_.reduce(nums, safeMulti) => ", _.reduce(nums, safeMulti));



/* 아래와 같이 개선하는게 좋지 않을까? */
function fnullMine(fun, defaultVal) {
    return function(/* args */) {
        var args = _.map(arguments, function(e, i) {
            return existy(e) ? e : defaultVal;
        });

        return fun.apply(null, args);
    };
}

var safeMultiMine = fnullMine(function (total, n) {
    return total * n;
}, 1);

// log("_.reduce(nums, safeMultiMine) => ", _.reduce(nums, safeMultiMine));


/* fnull을 활용하면 설정 객체 문제를 간단히 해결할 수 있다 */
function doSomething(config) {
    var lookup = defaults({critical: 108});

    return lookup(config, 'critical');
}

// log("doSomething({whoCares: 42, critical: null}) => ", doSomething({whoCares: 42, critical: null}));
// log("doSomething({critical: 9}) => ", doSomething({critical: 9}));
// log("doSomething({}) => ", doSomething({}));



// true나 false를 반환하는 찬반형 함수들을 인자로 받아 검증 함수를 반환하는 함수
function checker(/* validators */) {
    // 처음 실행시에는 validation 할 함수리스트만 세팅
    var validators = _.toArray(arguments);
    return function(obj) {
        // 두 번째 실행시
        // reduce의 마지막 인자로 빈배열을 선언하여 해당 함수가 처음 실행될때 errs로 사용
        // 두 번째 순회부터는 실행결과가 errs로 사용됨
        return _.reduce(validators, function(errs, check) {
            if (check(obj)) {   // validation 통과시에는 현재 errs 넘김
                return errs;
            } else {    // 조건을 만족하지 못할 경우에는
                // return _.chain(errs).push(check.message).value();
                errs.push(check.message);
                return errs;
            }
        }, []);
    };
}
var alwaysPasses = checker(always(true), always(true));
// log("alwaysPasses({}) => ", alwaysPasses({}));

var fails = always(false);
fails.message = 'a failure in life';
var alwaysFails = checker(fails);

// log("alwaysFails({}) => ", alwaysFails({}));

// 검증을 통과하지 못했을때 보여줄 메시지와 검증찬반형 함수를 인자로 받아서
// 실행준비된 검증찬반형함수에 실패했을 때의 메시지를 'message' 프로퍼티에 담은 함수를 리턴하는 함수
function validator(message, /* 찬반형 */fun) {
    // 함수를 실행한 결과를
    var f = function(/* 인자 */) {
        return fun.apply(fun, arguments);
    };

    f['message'] = message;
    return f;
}

var gonnaFail = checker(validator('ZOMG!', always(false)));

// log("gonnaFail(100) => ", gonnaFail(100));

function aMap(obj) {
    return _.isObject(obj);
}

var checkCommand = checker(validator('must be a map', aMap));

// log("checkCommand({}) => ", checkCommand({}));

// log("checkCommand(42) => ", checkCommand(42));


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

var checkCommand = checker(validator('must be a map', aMap), hasKeys('msg', 'type'));

// log("checkCommand({msg: 'blah', type: 'display'}) => ", checkCommand({msg: 'blah', type: 'display'}));
// log("checkCommand(32) => ", checkCommand(32));
// log("checkCommand({}) => ", checkCommand({}));

/*
sum(1, 2, 3, 4, 5);
sum([1, 2, 3, 4, 5]);
safeSum(1, null, 3, 4, 5);
safeMultiply(1, null, 3, 4, 5);
checkObj(객체형인지 확인, 특정프로퍼티가 있는지 확인, 특정 프로퍼티의 값이 숫자인지 확인);
*/
/*
function sum() {
    var args = arguments;
    return Array.prototype.reduce.apply(args, function())
}*/

// log("checkCommand({msg: 'blah', type: 'display'}) => ", checkCommand({msg: 'blah', type: 'display'}));
// log("checkCommand(32) => ", checkCommand(32));
// log("checkCommand({}) => ", checkCommand({}));