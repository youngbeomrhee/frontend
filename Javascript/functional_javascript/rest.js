/**
 * Created by YB on 2016-10-23.
 */

mode = 'running';   // 이하 코드에서는 log() 함수가 아무런 메시지도 표시 안함
// mode = 'debug';   // 이하 코드에서는 log() 함수가 메시지 표시

function dispatch(/* funs */) {
    var funs = _.toArray(arguments);
    var size = funs.length;

    return function(target /*, args */) {
        var ret = undefined;
        var args = _.rest(arguments);

        for (var funIndex = 0; funIndex < size; funIndex++) {
            var fun = funs[funIndex];
            // 핵심 API
            ret = fun.apply(fun, construct(target, args));

            if (existy(ret)) return ret;
        }

        return ret;
    };
}

var str = dispatch(invoker('toString', Array.prototype.toString), invoker('toString', String.prototype.toString));

// console.log(`str('a') : ${str('a')}`);
// console.log(`str(_.range(10)) : ${str(_.range(10))}`);

/*
Object.prototype.stringify = function() {
    return Object.keys(this).map((key)=> key + ' : ' + this[key]).join(', ');
};
*/

var toStr = dispatch(
    invoker('toString', Array.prototype.toString),
    invoker('toString', String.prototype.toString),
    invoker('stringify', Object.prototype.stringify),
    invoker('toString', Boolean.prototype.toString),
    invoker('toString', Number.prototype.toString)
);

// console.log(`toStr(1) : ${toStr(1)}`);
// console.log(`toStr('a') : ${toStr('a')}`);
// console.log(`toStr(_.range(10)) : ${toStr(_.range(10))}`);
// console.log(`toStr({a:1, b:2, c:'str'}) : ${toStr({a:1, b:2, c:'str'})}`);
// console.log(`toStr(false) : ${toStr(false)}`);


/* 뒤에 나옴
var polyToString = dispatch(
    function(s) { return _.isString(s) ? s : undefined },
    function(s) { return _.isArray(s) ? stringifyArray(s) : undefined },
    function(s) { return _.isObject(s) ? JSON.stringify(s) : undefined },
    function(s) { return s.toString() }
);
*/


// console.log(`polyToString(1) : ${polyToString(1)}`);
// console.log(`polyToString('a') : ${polyToString('a')}`);
// console.log(`polyToString(_.range(10)) : ${polyToString(_.range(10))}`);
// console.log(`polyToString({a:1, b:2, c:'str'}) : ${polyToString({a:1, b:2, c:'str'})}`);
// console.log(`polyToString(false) : ${polyToString(false)}`);


function stringReverse(s) {
    if (!_.isString(s)) return undefined;
    return s.split('').reverse().join("");
}

// dispatch로 만든 함수를 dispatch의 인자로 제공함으로써 유연성을 극대화할 수 있다
var sillyReverse = dispatch(rev, always("Can't reverse"));

// console.log(`sillyReverse([1,2,3]) : ${sillyReverse([1,2,3])}`);
// console.log(`sillyReverse('asdfas') : ${sillyReverse('asdfas')}`);
// console.log(`sillyReverse(234) : ${sillyReverse(234)}`);

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
    };
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

// log("performAdminCommand({type: 'kill', hostname: 'localhost'}) => ", performAdminCommand({type: 'kill', hostname: 'localhost'}));
// log("performAdminCommand({type: 'flail'}) => ", performAdminCommand({type: 'flail'}));
// log("performAdminCommand({type: 'join', target: 'foo'}) => ", performAdminCommand({type: 'join', target: 'foo'}));

// 두 개 이상의 dispatch가 연결된 dispatch 체인에서 특정 명령을 오버라이드해서 그 명령이 수행되지 않도록 할 수도 있다.
var performTrialUserCommand = dispatch(
  isa('join', function (obj) { console.log('Cannot join until approved'); }),
  performCommand
);

// log("performTrialUserCommand({type: 'join', target: 'foo'}) => ", performTrialUserCommand({type: 'join', target: 'foo'}));
// log("performTrialUserCommand({type: 'notify', message: 'Hi new user'}) => ", performTrialUserCommand({type: 'notify', message: 'Hi new user'}));

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
    validator('result shoud be greater than 100', greaterThan(100))
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

// console.log(`myLength(_.range(10)) : ${myLength(_.range(10))}`);
// console.log(`myLength([]) : ${myLength([])}`);
// console.log(`myLength(_.range(1000)) : ${myLength(_.range(1000))}`);

// 골치 아픈 상황을 피하고 싶다면 재귀 함수에 주어진 인자는 바꾸지 않는 것이 좋다
// var a = _.range(10);
// console.log(`myLength(a) : ${myLength(a)}`);
// console.log(a);
// a = [];
// console.log(`myLength(a) : ${myLength(a)}`);



/* 재귀함수는 인자를 소비하지 않는다 */

function cycle(times, ary) {
    if (times <= 0)
        return [];
    else
        return cat(ary, cycle(times - 1, ary));
}

// console.log(`cycle(2, [1, 2, 3]) : ${cycle(2, [1, 2, 3])}`);
// console.log(`_.take(cycle(20, [1, 2, 3]), 11) : ${_.take(cycle(20, [1, 2, 3]), 11)}`);


/* _.zip 함수의 반대 동작을 수행하는 unzip 함수 만들기 */

// var zipped1 = [['a', 1]];

function constructPair(pair, rests) {
    return [construct(_.first(pair), _.first(rests)),
        construct(second(pair),  second(rests))];
}

// console.log(constructPair(['a', 1], [[], []]));
// console.log(`_.zip(['a'], [1]) : ${_.zip(['a'], [1])}`);
// console.log(`_.zip.apply(null, constructPair(['a', 1], [[], []])) : ${_.zip.apply(null, constructPair(['a', 1], [[], []]))}`);

/*
console.log(
    constructPair(['a', 1],
        constructPair(['b', 2],
            constructPair(['c', 3], [[], []])))
);
*/

function unzip(pairs) {
    if (_.isEmpty(pairs)) return [[],[]];

    return constructPair(_.first(pairs), unzip(_.rest(pairs)));
}


/* 재귀를 이용한 그래프 탐색 */

var influences = [
    ['Lisp', 'Smalltalk'],
    ['Lisp', 'Scheme'],
    ['Smalltalk', 'Self'],
    ['Scheme', 'JavaScript'],
    ['Scheme', 'Lua'],
    ['Self', 'Lua'],
    ['Self', 'JavaScript']];


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

// console.log(`nexts(influences, 'Lisp') : ${nexts(influences, 'Lisp')}`);



/* 메모리에서 깊이 우선 재귀 탐색하기 */

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


// console.log(`depthSearch(influences, ['Lisp'], []) : ${depthSearch(influences, ['Lisp'], [])}`);
// console.log(`depthSearch(influences, ['Smalltalk', 'Self'], []) : ${depthSearch(influences, ['Smalltalk', 'Self'], [])}`);
// console.log(`depthSearch(construct(['Lua', 'Io'], influences), ['Lisp'], []) : ${depthSearch(construct(['Lua', 'Io'], influences), ['Lisp'], [])}`);


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

// _.random 함수의 시작점을 1로 고정
var rand = partial1(_.random, 1);

// 1~10까지의 랜덤수 출력
// console.log(`rand(10) : ${rand(10)}`);

// partial1을 사용하여 나머지 파라미터도 10으로 고정한 함수를 10번 실행시키기
// console.log(`repeatedly(10, partial1(rand, 10)) : ${repeatedly(10, partial1(rand, 10))}`);


// 소문자 랜덤 아스키 코드 생성기
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
// console.log(`areaOfACircle(3) : ${areaOfACircle(3)}`);

PI = 'Magnum';
// console.log(`areaOfACircle(3) : ${areaOfACircle(3)}`);



/*Separating the Pure from the Impure*/

function generateRandomCharacter() {
    return rand(26).toString(36);
}

function generateString(charGen, len) {
    return repeatedly(len, charGen).join('');
}

// console.log(`generateString(generateRandomCharacter, 20) : ${generateString(generateRandomCharacter, 20)}`);

// generateString이 더 고차원 함수이기 때문에 아래와 같이 partial 사용 가능
var composedRandomString = partial1(generateString, generateRandomCharacter);

// console.log(`composedRandomString(10) : ${composedRandomString(10)}`);

// 이제 캡슐화한 순수한 함수 부분만 독립적으로 테스트 가능
/*
describe('generateString', function () {
    var result = generateString(always('a'), 10);

    it('should return a string of a specific length', function () {
        expect(result.constructor).toBe(String);
        expect(result.length).toBe(10);
    });

    it('should return a string congruent with its char generator', function () {
        expect(result).toEqual('aaaaaaaaaa');
    });
});
*/


/* 비순수한 함수의 프로퍼티 테스트 */
/*
describe('generateRandomCharacter', function () {
    var result = repeatedly(10000, generateRandomCharacter);

    it('should return only strings of length 1', function () {
        expect(_.every(result, _.isString)).toBeTruthy();
        expect(_.every(result, function (s) { return s.length === 1; })).toBeTruthy();
    });

    it('should return a string of only lowercase ASCII letters or digits', function () {
        expect(_.every(result, function (s) {
            return /[a-z0-9]/.test(s)
        }));
        expect(_.any(result, function (s) { return /[A-Z]/.test(s); })).toBeFalsy();
    });
});
*/


/* 순수성 */
/* second 함수를 예로 들어보자
function second(a) {
    return nth(a, 1);
}
*/

// nth 함수는 순수한 함수이므로 어떤 배열값과 인덱스값을 제공했을 때 항상 일정한 결과값을 반환
nth(['a', 'b', 'c'], 1);
nth(['a', 'b', 'c'], 1);

// 사용된 배열의 인덱스나 값을 바꾸지도 않음
var a = ['a', 'b', 'c'];

// console.log(`nth(a, 1) : ${nth(a, 1)}`);

// console.log(`a === a : ${a === a}`);

nth(a, 1);

// console.log(`_.isEqual(a, ['a', 'b', 'c']) : ${_.isEqual(a, ['a', 'b', 'c'])}`);


// 불안요소 : nth 함수가 순수하지 않은 객체, 배열, 심지어 비순수한 함수를 반환할 수 있다는 사실
// console.log(`nth([{a: 1}, {b: 2}], 0) : ${nth([{a: 1}, {b: 2}], 0)}`);
// console.log(`nth([function () { console.log('blah'); }], 0) : ${nth([function () { console.log('blah'); }], 0)}`);

// 외부 값에 의존하지 않도록 엄격하게 순수한 함수를 정의하고 사용함으로써 문제 해결
function second (a) {
    return a[1];
}

function second (a) {
    return _.first(_.rest(a));
}

// 극단적인 대체
/*
function second () {
    return 'b';
}
*/


// console.log(`second(['a', 'b', 'c'], 1) : ${second(['a', 'b', 'c'], 1)}`);


/* 순수성과 멱등의 관계 */
// someFun(arg) = _.compose(someFun, someFun)(arg);
// f(f(x)) = f(x);

// second 함수는 멱등이 아니다.
var a = [1, [10, 20, 30], 3];

var secondTwice = _.compose(second, second);

// console.log(`second(a) === secondTwice(a) : ${second(a) === secondTwice(a)}`);

// _.identity는 대표적인 멱등함수
var dissociativeIdentity = _.compose(_.identity, _.identity);

// console.log(`_.identity(42) === dissociativeIdentity(42) : ${_.identity(42) === dissociativeIdentity(42)}`);

// Math.abs도 멱등
// console.log(`Math.abs(-42) === Math.abs(Math.abs(-42)) : ${Math.abs(-42) === Math.abs(Math.abs(-42))}`);


/* 불변성 */


/* 숲에서 나무가 쓰러질 때 소리가 나는가? */
// 넘기는 배열이 변화되지 않고 원하는 결과만 나온다면 내부가 어떻게 구현되어 있는지는 상관없다
function skipTake(n, coll) {
    var ret = [];
    var sz = _.size(coll);

    for(var index = 0; index < sz; index += n) {
        ret.push(coll[index]);
    }

    return ret;
}

// console.log(`skipTake(2, [1, 2, 3, 4]) : ${skipTake(2, [1, 2, 3, 4])}`);
// console.log(`skipTake(3, _.range(20)) : ${skipTake(3, _.range(20))}`);

/*
 숲에서 나무가 쓰러질 때 소리가 나는가?
 순수 함수는 변경할 수 없는 반환값을 만들기 위해 특정 지역 데이터를 변경해도 되는 걸까?
 - Rich Hickey
 */



/* 불변성과 재귀의 관계 */

// local variable의 변이를 이용한 summ 함수
function summ(array) {
    var result = 0;
    var sz = array.length;

    for (var i = 0; i < sz; i++)
        result += array[i];

    return result;
}
// i, result 두 개의 지역 변수를 변이시킨다는 것이 문제. 전통적인 함수형 언어의 지역 변수는 실제 변수가 아니라 변할 수 없는 값이다.
// console.log(`summ(_.range(1, 11)) : ${summ(_.range(1, 11))}`);


// 재귀 버젼으로 구현
function summRec(array, seed) {
    if (_.isEmpty(array))
        return seed;
    else
        return summRec(_.rest(array), _.first(array) + seed);
}

// console.log(`summRec([], 0) : ${summRec([], 0)}`);
// console.log(`summRec(_.range(1, 11), 0) : ${summRec(_.range(1, 11), 0)}`);


/* 방어적인 얼리기와 복제 */

function deepFreeze(obj) {
    if (!Object.isFrozen(obj))
        Object.freeze(obj);

    for (var key in obj) {
        if (!obj.hasOwnProperty(key) || !_.isObject(obj[key]))
            continue;

        deepFreeze(obj[key]);
    }
}


/* 함수 수준에서 불변성 유지하기 */

// 공통적인 패턴 : 함수가 어떤 컬렉션을 인자로 받아 다른 컬렉션을 만든다

var freq = curry2(_.countBy)(_.identity);

// _.countBy는 비파괴 동작 함수이므로 _.countBy와 _.identity를 연결한 결과도 순수한 함수
var a = repeatedly(1000, partial1(rand, 2));
var copy = _.clone(a);

freq(a);
// console.log(`_.isEqual(a, copy) : ${_.isEqual(a, copy)}`);

// 순수한 함수로 만든 결과 역시 순수한 함수
freq(skipTake(2, a));
// console.log(`_.isEqual(a, copy) : ${_.isEqual(a, copy)}`);

// 하지만 순수성을 꼭 유지할 필요는 없으며 오히려 객체의 내용을 바꿔야 할 때도 있다.
// _.extend 함수는 여러 객체를 왼쪽에서 오른쪽으로 병합해서 한 개의 객체를 만든다.
var person = {fname: 'Simon'};

_.extend(person, {lname: "Petrikov"}, {age: 28}, {age: 100});

// console.log(person);

// _.extend의 문제는 인자목록의 첫 번째 객체를 변이시킨다는 점
// _.extend는 순수함수가 아니지만 조금만 고쳐도 새로운 추상화를 만들 수 있다.

// 객체를 확장(extend) 하기 보다는 병합(merge) 하기
function merge(/*args*/) {
    return _.extend.apply(null, construct({}, arguments));
}

var person = {fname: 'Simon'};

var mergedPerson = merge(person, {lname: "Petrikov"}, {age: 28}, {age: 100});

// console.log(mergedPerson);
// console.log(person);



/* 객체의 불변성 관찰 */

function Point(x, y) {
    this._x = x;
    this._y = y;
}

// 두 개의 변경(change) 메서드 생성. 이 메서드들을 사용하여 불변성 정책을 유지할 수 있다.
Point.prototype = {
    withX: function(val) {
        return new Point(val, this._y);
    },
    withY: function(val) {
        return new Point(this._x, val);
    }
};

var p = new Point(0, 1);

// console.log(p.withX(1000));

// _x 필드는 바뀌지 않는다.
// console.log(p);

// 불변성의 객체는 생성할때 값을 받으며 그 이후로는 값을 바꿀 수 없어야 한다.
// 또한 불변성의 객체에 수행하는 모든 동작의 결과로 (기존의 인스턴스가 아닌) 새로운 인스턴스가 반환되어야 한다.
// 이와 같은 규칙을 준수하면 변이 때문에 발생하는 문제를 최소화할 수 있으며 자연스럽게 다음과 같이 멋진 체이닝 API가 만들어질 것이다.
// console.log((new Point(0, 1).withX(100).withY(-100)));
// console.log(p);
// 정리 : 불변성 객체는 생성시에 자신의 값을 채운 이후로는 절대 바뀌지 않는다.
// 불변성 객체에 행하는 모든 동작의 결과로 새로운 객체가 반환된다.


// 또 다른 문제

function Queue(elems) {
    this._q = elems;
}

Queue.prototype = {
    enqueue: function(thing) {
        return new Queue(cat(this._q, [thing]));
    }
};

var seed = [1, 2, 3];

var q = new Queue(seed);

// console.log(q);

// enqueue를 호출하면 새로운 인스턴스 반환
var q2 = q.enqueue(108);

// console.log(q);
// console.log(q2);

// 하지만 엉뚱한 곳에서 사건이 발생한다.
seed.push(10000);

// console.log(q);
// console.log(q2);

// 인스턴스를 생성할 때 방어적인 복제를 사용하지 않고 직접 값을 참조했기 때문에 발생하는 문제

var SaferQueue = function(elems) {
    this._q = _.clone(elems);
}

// 새로운 요소 집합 수준에서 불변성을 유지하는 것이 가장 바람직하다
SaferQueue.prototype = {
    enqueue: function(thing) {
        return new SaferQueue(cat(this._q, [thing]));
    }
};

// 불변성을 깨뜨리지 않는 함수인 cat을 이용하면 SaferQueue 인스턴스 간에 참조를 공유하는 문제를 제거할 수 있다.
var seed = [1, 2, 3];
var q = new SaferQueue(seed);

var q2 = q.enqueue(36);
seed.push(1000);

// console.log('q : ', q);
// console.log('q2 : ', q2);


// new를 강제하는 패턴
function queue() {
    return new SaferQueue(_.toArray(arguments));
}

var q = queue(1, 2, 3);

// 또한 invoker 함수를 이용해서 enqueue로 위임할 함수를 만들 수 있다.
var enqueue = invoker('enqueue', SaferQueue.prototype.enqueue);

var q2 = enqueue(q, 42);
// console.log('q : ', q);
// console.log('q2 : ', q2);


/* 변화 제어 정책 */

function Container(init) {
    this._value = init;
};

var aNumber = new Container(42);

// console.log('aNumber : ', aNumber);

// update 메서드 추가
Container.prototype = {
    update: function(fun /*, args */) {
        var args = _.rest(arguments);
        var oldValue = this._value;

        this._value = fun.apply(this, construct(oldValue, args));

        return this._value;
    }
};

var aNumber = new Container(15);
// aNumber.update(function (n) { return n+1; });
// console.log('aNumber : ', aNumber);

// 여러 인자를 갖는 예제
// aNumber.update(function (n, x, y, z) { return n/x/y/z; }, 2, 2, 2);
// console.log('aNumber : ', aNumber);

// 정상적이지 않은 상황
// aNumber.update(_.compose(megaCheckedSqr, always(0)));


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

/*
console.log(
    createPerson()
        .setFirstName('Mike')
        .setLastName('Fogus')
        .setAge(108)
        .toString()
);
*/


// _.chain : Returns a wrapped object.
//  Calling methods on this object will continue to return wrapped objects until value is called.

/*
console.log(
    _.chain(library)
        .pluck('title')
        .sort()
);
*/

/*
console.log(
    _.chain(library)
        .pluck('title')
        .sort()
        .value()
);
*/


var TITLE_KEY = 'titel';

// ... 꽤 많은 코드

/*
console.log(
    _.chain(library)
        .pluck(TITLE_KEY)
        .sort()
        .value()
);
*/

// Invokes interceptor with the object, and then returns object. The primary purpose of this method is to "tap into" a method chain, in order to perform operations on intermediate results within the chain.

/*
_.chain(library)
    .tap(function (o) { console.log(o); })
    .pluck(TITLE_KEY)
    .sort()
    .value();
*/

/*
_.chain(library)
    .pluck(TITLE_KEY)
    .tap(function (o) { console.log(o); })
    .sort()
    .value();
*/

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

/* Ch.9 클래스를 이용하지 않는 프로그래밍 */


/* 9.1. 데이터지향 */

function lazyChain(initData) {
    var calls = [];     // force가 호출됐을때 실행할 함수를 배열에 넣어둠

    return {
        invoke: function(methodName /* args */) {   // invoke를 실행할때 method를 넘겨줌
            var args = _.rest(arguments);

            calls.push(function(target) {   // 나중에 실행할 수 있는 함수를 calls 배열에 넣어줌
                var meth = target[methodName];  // 넘어온 target(데이터)의 메서드 추출

                return meth.apply(target, args);    // 실행시 넘어온 target과 invoke 시점에 미리 넣어둔 args를 둘 다 넘기면서 메서드 실행
            });

            return this;
        },
        force:  function() {
            return _.reduce(calls, function(ret, thunk) {   // ret : memo, thunk : calls 배열에 들어있는 함수
                return thunk(ret);
            }, initData);
        }
    };
}

var lazyOp = lazyChain([2, 1, 3])
    .invoke('concat', [7, 7, 8, 9, 0])
    .invoke('sort');

// console.log(lazyOp.force());


/* 9.1.1. 함수를 이용하는 프로그래밍 */

// 체인정의과정. 게으른 체인은 함수로 특정한 인스턴스의 액션을 정의하지만 객체의 종류와 관계없이 동작하는 게으른 동작을 구현하는 방법도 있다.
function deferredSort(ary) {
    return lazyChain(ary).invoke('sort');
}

// 다음 예제처럼 함수 호출을 이용해서 게으르게 배열을 정렬하는 동작을 만들 수 있다.
var deferredSorts = _.map([[2, 1, 3], [7, 7, 1], [0, 9, 5]], deferredSort);

// 함수를 이용해서 메서드 호출을 캡슐화하는 방식으로 성크를 호출한다.
function force(thunk) {
    return thunk.force();
}

// 이제 원하는 대로 게으른 체인을 호출할 수 있다.
// console.log(_.map(deferredSorts, force));

// 메서드 호출 대신 함수형 애플리케이션 형식을 이용하는 덕분에 원자 단위로 데이터 처리를 하는 다양한 함수를 정의해서 사용할 수 있다.
var validateTriples  = validator(
    "Each array should have three elements",
    function (arrays) {
        return _.every(arrays, function(a) {
            return a.length === 3;
        });
    });

var validateTripleStore = partial1(condition1(validateTriples), _.identity);

// console.log(validateTripleStore([[2, 1, 3], [7, 7, 1], [0, 9, 5]]));
// console.log(validateTripleStore([[2, 1, 3], [7, 7, 1], [0, 9, 5, 7, 7, 7, 7, 7, 7]]));

// (반드시 게으르게 동작해야 하는 것은 아니지만) 게으르게 동작하는 다른 처리 과정도 정의할 수 있다.
function postProcess(arrays) {
    return _.map(arrays, second);
}

// 지금까지 정의한 함수로 도메인 전용의 고수준 동작을 정의할 수 있다.
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

// processTriples("[[2, 1, 3], [7, 7, 1], [0, 9, 5]]");
// processTriples("[[2, 1, 3], [7, 7, 1], [0, 9, 5, 7, 7, 7, 7, 7, 7]]");

// 비슷한 검증을 요구하는 다양한 파이프라인에서 검증 함수를 재활용
/*
$.get("http://djhkjhkdj.com", function (data) {
    $('#result').text(processTriples(data));
});
*/

// 결국 리포트 로직을 추상화해서 더 일반적인 검증 과정을 만들 수 있다
var reportDataPackets = _.compose(
    function(s) { console.log(s) },
    processTriples);

// reportDataPackets("[[2, 1, 3], [7, 7, 1], [0, 9, 5]]");

// 지금까지 완성한 함수를 원하는 곳에서 자유롭게 활용할 수 있다
// $.get("http://djhkjhkdj.com", reportDataPackets);


/* 9.2 믹스인 */
// 인자로 받은 객체를 문자열 표현으로 반환
function oldPolyToString(obj) {
    if (obj instanceof String)
        return obj;
    else if (obj instanceof Array)
        return oldStringifyArray(obj);

    return obj.toString();
}

function oldStringifyArray(ary) {
    return ["[", _.map(ary, oldPolyToString).join(","), "]"].join('');
}

// console.log(`oldPolyToString([1, 2, 3]) : ${oldPolyToString([1, 2, 3])}`);
// console.log(`oldPolyToString([1, 2, [3, 4]]) : ${oldPolyToString([1, 2, [3, 4]])}`);

// 더 다양한 객체를 처리하기 위해서 if 대신에 dispatch를 활용
var oldPolyToString2 = dispatch(
    function(s) { return _.isString(s) ? s : undefined },
    function(s) { return _.isArray(s) ? oldStringifyArray(s) : undefined },
    function(s) { return s.toString() });

// console.log(`oldPolyToString2(42) : ${oldPolyToString2(42)}`);
// console.log(`oldPolyToString2([1, 2, [3, 4]]) : ${oldPolyToString2([1, 2, [3, 4]])}`);
// console.log(`oldPolyToString2('a') : ${oldPolyToString2('a')}`);

// 객체에 #toString 구현이 제대로 되어 있지 않으면 코드가 작동하지 않을 수 있다.
// console.log(`oldPolyToString2({a: 1, b: 2}) : ${oldPolyToString2({a: 1, b: 2})}`);


function stringifyArray(ary) {
    return ["[", _.map(ary, polyToString).join(","), "]"].join('');
}

function isNull(p) {
    return p === null;
}

function isUndefined(p) {
    return p === undefined;
}


var polyToString = dispatch(
    function(s) { return _.isString(s) ? s : undefined },
    function(s) { return _.isArray(s) ? stringifyArray(s) : undefined },
    function(s) { return _.isObject(s) ? JSON.stringify(s) : undefined },   // 추가된 부분
    function(s) { return isNull(s) ? 'null' : undefined },
    function(s) { return isUndefined(s) ? 'undefined' : undefined },
    function(s) { return s.toString() }
);


// console.log(`polyToString(1) : ${polyToString(1)}`);
// console.log(`polyToString('a') : ${polyToString('a')}`);
// console.log(`polyToString(_.range(10)) : ${polyToString(_.range(10))}`);
// console.log(`polyToString({a:1, b:2, c:'str'}) : ${polyToString({a:1, b:2, c:'str'})}`);
// console.log(`polyToString(false) : ${polyToString(false)}`);

// console.log(`polyToString([1, 2, {a: 42, b: [4, 5, 6]}, 77]) : ${polyToString([1, 2, {a: 42, b: [4, 5, 6]}, 77])}`);

// 이런 방식은 Container 같은 생성자를 사용했을때 문제가 있다
// console.log(`polyToString(new Container(_.range(5))) : ${polyToString(new Container(_.range(5)))}`);

// 믹스인 기반 확장을 살펴보기 전에 확인할 두 가지 옵션
// 1. 코어 프로토타입이 변경됨.
// 2. 클래스 계층이 생김



/* 9.2.1 코어 프로토타입 개조 */

// 문자열 전용 메서드를 Container의 prototype에 부착
Container.prototype.toString = function() {
    return ["@<", polyToString(this._value), ">"].join('');
}

// console.log(`(new Container(42)).toString() : ${(new Container(42)).toString()}`);
// console.log(`(new Container({a: 42, b: [1, 2, 3]})).toString() : ${(new Container({a: 42, b: [1, 2, 3]})).toString()}`);

// 코어 오브젝트에 어떤 기능을 추가하려면 코어 프로토타입을 건드리는 수밖에 없다? -> 절대로 하면 안된다
/*
Array.prototype.toString = function () {
    return "DON'T DO THIS";
}
*/

// console.log(`[1, 2, 3].toString() : ${[1, 2, 3].toString()}`);
// console.log(`[1, 2, 3].toString() : ${[1, 2, 3].toString()}`);

// 커스텀 형식을 대신할 별도의 함수를 이용하는 것이 좋다.


/* 9.2.2 클래스 계층 */

function ContainerClass() {}
function ObservedContainerClass() {}
function HoleClass() {}
function CASClass() {}
function TableBaseClass() {}

ObservedContainerClass.prototype = new ContainerClass();
HoleClass.prototype = new ObservedContainerClass();
CASClass.prototype = new HoleClass();
TableBaseClass.prototype = new HoleClass();

// console.log(`(new CASClass()) instanceof HoleClass : ${(new CASClass()) instanceof HoleClass}`);
// console.log(`(new TableBaseClass()) instanceof HoleClass : ${(new TableBaseClass()) instanceof HoleClass}`);
// console.log(`(new HoleClass()) instanceof CASClass : ${(new HoleClass()) instanceof CASClass}`);


(function(){
    var initializing = false, fnTest = /xyz/.test(function(){xyz;}) ? /\b_super\b/ : /.*/;
    // The base Class implementation (does nothing)
    this.Class = function(){};

    // Create a new Class that inherits from this class
    Class.extend = function(prop) {
        var _super = this.prototype;

        // Instantiate a base class (but only create the instance,
        // don't run the init constructor)
        initializing = true;
        var prototype = new this();
        initializing = false;

        // Copy the properties over onto the new prototype
        for (var name in prop) {
            // Check if we're overwriting an existing function
            prototype[name] = typeof prop[name] == "function" &&
            typeof _super[name] == "function" && fnTest.test(prop[name]) ?
                (function(name, fn){
                    return function() {
                        var tmp = this._super;

                        // Add a new ._super() method that is the same method
                        // but on the super-class
                        this._super = _super[name];

                        // The method only need to be bound temporarily, so we
                        // remove it when we're done executing
                        var ret = fn.apply(this, arguments);
                        this._super = tmp;

                        return ret;
                    };
                })(name, prop[name]) :
                prop[name];
        }

        // The dummy class constructor
        function Class() {
            // All construction is actually done in the init method
            if ( !initializing && this.init )
                this.init.apply(this, arguments);
        }

        // Populate our constructed prototype object
        Class.prototype = prototype;

        // Enforce the constructor to be what we expect
        Class.prototype.constructor = Class;

        // And make this class extendable
        Class.extend = arguments.callee;

        return Class;
    };
})();


var ContainerClass = Class.extend({
    init: function(val) {
        this._value = val;
    },
});

// var c = new ContainerClass(42);

// console.log('c : ', c);
//=> {_value: 42 ...}

// console.log(`c instanceof Class : ${c instanceof Class}`);
//=> true


// ContainerClass는 단순히 값을 유지하는 반면 ObservedContainerClass는 추가적인 기능을 제공
var ObservedContainerClass = ContainerClass.extend({
    observe: function(f) { note("set observer") },
    notify: function() { note("notifying observers") }
});

// 물론 ObservedContainerClass가 자체적으로 처리하는 일은 많지 않다.
// 다음처럼 값을 설정하거나 통지하는 기능을 추가할 수 있다.
var HoleClass = ObservedContainerClass.extend({
    init: function(val) { this.setValue(val) },
    setValue: function(val) {
        this._value = val;
        this.notify();
        return val;
    }
});

// 이제 계층 구조에서 추가된 기능을 새로운 HoleClass 인스턴스에서 이용할 수 있다
// var h = new HoleClass(42);

// h.observe(null);

// console.log(`h.setValue(108) : ${h.setValue(108)}`);

// 가장 하위계층에는 다음처럼 새 기능을 추가할 수 있다
var CASClass = HoleClass.extend({
    swap: function(oldVal, newVal) {
        if (!_.isEqual(oldVal, this._value)) fail("No match");

        return this.setValue(newVal);
    }
});

// var c = new CASClass(42);

// console.log(`c.swap(42, 43) : ${c.swap(42, 43)}`);

// console.log(`c.swap('not the value', 44) : ${c.swap('not the value', 44)}`);


function Container2(val) {
    this._value = val;
    this.init(val);
}

Container2.prototype.init = _.identity;

// var c2 = new Container2(42);

// console.log('c2 :', c2);


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
    Container2.call(this, val);
}

// var h = new Hole(42);

// Hole 형식을 완성하려면 직접 구현하거나 아니면 ObserverMixin과 ValidateMixin을 혼합해야 한다
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
        if (existy(this._validator) && !this._validator(val))
            fail("Attempted to set invalid value " + polyToString(val));
    }
};

// 두 가지 믹스인을 준비했으므로 다음처럼 Hole 형식의 요구사항을 모두 만족할 수 있다.
_.extend(Hole.prototype
    , HoleMixin
    , ValidateMixin
    , ObserverMixin);

var h = new Hole(42);

// 항상 실패로 끝나는 검증자를 추가
// h.addValidator(always(false));
// h.setValue(9);

/*

// 짝수만 허용하는 검증자 추가
h.addValidator(isEven);
// h.setValue(9);
h.setValue(108);
// console.dir(h);

// watch 메서드를 이용해서 감시자 추가
h.watch(function (old, nu) {
    note(["changing", old, "to", nu].join(' '));
});

h.setValue(42);

// 감시자 추가
h.watch(function (old, nu) {
    note(["Veranderende", old, "to", nu].join(' '));
});

h.setValue(36);
*/


/* 9.2.5 믹스인 확장을 이용해서 새 기능 추가 */
/*
- 프로토콜
확장 프로토콜 : setValue 메서드와 _value 프로퍼티를 반드시 제공해야 한다.
인터페이스 프로토콜 : swap 메서드 제공
*/
var SwapMixin = {
    swap: function(fun /* , args... */) {
        var args = _.rest(arguments)
        var newValue = fun.apply(this, construct(this._value, args));

        return this.setValue(newValue);
    }
};

var o = {_value: 0, setValue: _.identity};
_.extend(o, SwapMixin);
// console.log(`o.swap(construct, [1, 2, 3]) : ${o.swap(construct, [1, 2, 3])}`);

// Hole 인스턴스에서 안전하게 값을 검출하는 방식을 제공하는 또 다른 믹스인 SnapshotMixin 구현
var SnapshotMixin = {
    snapshot: function() {
        return deepClone(this._value);
    }
};

// Hole의 새 규격명세
_.extend(Hole.prototype
    , HoleMixin
    , ValidateMixin
    , ObserverMixin
    , SwapMixin
    , SnapshotMixin);

var h = new Hole(42);
h.swap(always(99));
// console.log(`h.snapshot() : ${h.snapshot()}`);



/* 9.2.6 믹스인 믹싱을 이용한 새로운 형식 */
// 비교 후 교환 기능을 수행하는 CAS. 즉, 기존 값이 무엇인지 알고 있어야만 형식에 변화를 줄 수 있다.
var CAS = function(val) {
    Hole.call(this, val);
}

// CASMixin은 SwapMixin의 swap 메서드를 오버라이드한다는 점이 흥미롭다
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

// SwapMixin을 CASMixin으로 대체할수도 있지만 _.extend가 오버라이드를 처리할 수 있게 믹스인 배치 순서를 활용한다.
// 현시점에서는 CASMixin이 SwapMixin의 기능을 모두 포함하고 있지만 나중에 SwapMixin의 swap 기능이 확장될 수 있기 때문에 확장 체인에 SwapMixin을 남겨둔다
_.extend(CAS.prototype
    , HoleMixin
    , ValidateMixin
    , ObserverMixin
    , SwapMixin
    , CASMixin
    , SnapshotMixin);

var c = new CAS(42);

/*
c.swap(42, always(-1));
console.log(`c.snapshot() : ${c.snapshot()}`);

c.swap('not the value', always(100000));
console.log(`c.snapshot() : ${c.snapshot()}`);
*/



/* 9.2.7 메서드는 저수준 동작이다 */

// 컨테이너 형식에 접근하고 컨테이너를 조작하는 함수형 API
function contain(value) {
    return new Container2(value);
}

contain(42);

// Hole 함수형 API
function hole(val /*, validator */) {
    var h = new Hole();
    var v = _.toArray(arguments)[1];

    if (v) h.addValidator(v);

    h.setValue(val);

    return h;
}

// 많은 검증로직을 hole 함수 내부로 캡슐화했다. 따라서 원하는 대로 저수준 메서드를 조립할 수 있다.
// Hole 생성자와 addValidator 메서드를 합친 것에 비해 훨씬 간단하게 hole 함수를 이용할 수 있다.


// var x = hole(42, always(false));
// setValue는 Hole 타입의 메서드이므로 외부로 기능을 노출할 이유가 없다. 따라서 swap과 snapshot 함수만 노출한다.

var swap = invoker('swap', Hole.prototype.swap);

// swap 함수는 첫 번째 인자로 대상 객체를 받으며 여타 호출자에 종속된 메서드처럼 동작한다.
var x = hole(42);

// console.log(`swap(x, sqr) : ${swap(x, sqr)}`);

// Hole과 비슷한 방법으로 CAS 형식의 기능을 노출시킬 수 있다.
function cas(val /*, args */) {
    var h = hole.apply(this, arguments);
    var c = new CAS(val);
    c._validator = h._validator;

    return c;
}

var compareAndSwap = invoker('swap', CAS.prototype.swap);


// 일반적인 위임을 이용해서 나머지 컨테이너 함수를 구현할 수 있다.
function snapshot(o) { return o.snapshot() }
function addWatcher(o, fun) { o.watch(fun) }

var x = hole(42);

/*
addWatcher(x, note);

console.log(`swap(x, sqr) : ${swap(x, sqr)}`);

var y = cas(9, isOdd);

console.log(`compareAndSwap(y, 9, always(1)) : ${compareAndSwap(y, 9, always(1))}`);
console.log(`snapshot(y) : ${snapshot(y)}`);
*/

