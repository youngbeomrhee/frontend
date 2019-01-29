/**
 * Created by YB on 2016-10-23.
 */

mode = 'running';   // 이하 코드에서는 log() 함수가 아무런 메시지도 표시 안함
// mode = 'debug';   // 이하 코드에서는 log() 함수가 메시지 표시


// 여러 invoker를 조립할 수 있는 함수
function dispatch(/* invokers */) {
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

var str = dispatch(invoker('toString', Array.prototype.toString), invoker('toString', String.prototype.toString));

log("str('a') -> ", str('a'));
log("str(_.range(10)) -> ", str(_.range(10)));


// 해당함수를 응용하여 자료형에 따른 toString 함수를 구현할 수 있다.
Object.prototype.stringify = function() {
    return Object.keys(this).map((key)=> key + ' : ' + this[key]).join(', ');
};


var toStr = dispatch(
    invoker('toString', Boolean.prototype.toString),
    invoker('toString', Number.prototype.toString),
    invoker('toString', Array.prototype.toString),
    invoker('toString', String.prototype.toString),
    invoker('stringify', Object.prototype.stringify)
);

log("toStr(1) -> ", toStr(1));
log("toStr('a') -> ", toStr('a'));
log("toStr(_.range(10)) -> ", toStr(_.range(10)));
log("toStr({a:1, b:2, c:'str'}) -> ", toStr({a:1, b:2, c:'str'}));
log("toStr(false) -> ", toStr(false));


// 아래 함수를 이용해서 dispatch의 규칙에 관여할 수 있다.
function stringReverse(s) {
    if (!_.isString(s)) return undefined;
    return s.split('').reverse().join("");
}

log("stringReverse('abc') -> ", stringReverse('abc'));
log("stringReverse(1) -> ", stringReverse(1));


// stringReverse에 Array#reverse 메서드를 이용해서 rev라는 새로운 다형적 함수를 만들 수 있다.
var rev = dispatch(invoker('reverse', Array.prototype.reverse), stringReverse);

log("rev([1, 2, 3]) -> ", rev([1, 2, 3]));
log("rev('abc') -> ", rev('abc'));


// dispatch로 만든 함수를 dispatch의 인자로 제공함으로써 유연성을 극대화할 수 있다
var sillyReverse = dispatch(rev, always("Can't reverse"));

log("sillyReverse([1,2,3]) -> ", sillyReverse([1,2,3]));
log("sillyReverse('asdfas') -> ", sillyReverse('asdfas'));
log("sillyReverse(234) -> ", sillyReverse(234));



// 수동적으로 명령을 분류하는 switch 문을 dispatch로 대체할 수 있다.
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

function notify(msg) {
    return '# notify : ' + msg;
}

function changeView(target) {
    return target + ' has changed';
}

log("performCommandHardcoded({type: 'notify', message: 'hi!'}) -> ", performCommandHardcoded({type: 'notify', message: 'hi!'}));
log("performCommandHardcoded({type: 'join', target: 'waiting-room!'}) -> ", performCommandHardcoded({type: 'join', target: 'waiting-room!'}));
log("performCommandHardcoded({type: 'wat'}) -> ", performCommandHardcoded({type: 'wat'}));


/* 다음 예제처럼 dispatch를 이용해서 switch를 사용하던 기존의 패턴을 깔끔하게 제거할 수 있다. */
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


log("performCommand({type: 'notify', message: 'hi!'}) -> ", performCommand({type: 'notify', message: 'hi!'}));
log("performCommand({type: 'join', target: 'waiting-room!'}) -> ", performCommand({type: 'join', target: 'waiting-room!'}));
log("performCommand({type: 'wat'}) -> ", performCommand({type: 'wat'}));


// performCommandHardcoded 함수의 기능을 확장하려면 switch 문 자체를 고쳐야 하지만 dispatch 함수를 쓰면 간단하게 새 기능을 추가할 수 있다.
var performAdminCommand = dispatch(
  isa('kill', obj => 'shutdown '+obj.hostname),
  performCommand
);


log("performAdminCommand({type: 'kill', hostname: 'localhost'}) -> ", performAdminCommand({type: 'kill', hostname: 'localhost'}));
log("performAdminCommand({type: 'flail'}) -> ", performAdminCommand({type: 'flail'}));
log("performAdminCommand({type: 'join', target: 'foo'}) -> ", performAdminCommand({type: 'join', target: 'foo'}));


// 두 개 이상의 dispatch가 연결된 dispatch 체인에서 특정 명령을 오버라이드해서 그 명령이 수행되지 않도록 할 수도 있다.
var performTrialUserCommand = dispatch(
  isa('join', function (obj) { log('Cannot join until approved'); }),
  performCommand
);


log("performTrialUserCommand({type: 'join', target: 'foo'}) -> ", performTrialUserCommand({type: 'join', target: 'foo'}));
log("performTrialUserCommand({type: 'notify', message: 'Hi new user'}) -> ", performTrialUserCommand({type: 'notify', message: 'Hi new user'}));


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
log("validator('arg must be a map', aMap)(42) -> ", validator('arg must be a map', aMap)(42));

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

log("sqr(10) -> ", sqr(10));
// log("sqr(0) -> ", sqr(0));   // 오류발생
// log("sqr('') -> ", sqr(''));   // 오류발생

// 핵심적인 계산 로직과는 독립적으로 선행조건, 후행조건을 추가하도록 부분 적용을 이용할 수 있다.
// 처음 실행시에는 validator 들을 setting, 실제 런타임 때는 실행시킬 함수와 파라미터를 넘겨서 파라미터가 모든 조건을 만족하는 경우에만 함수를 실행하게 만들 수 있다.
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



var sqrPre = condition1(
  validator('arg must not be zero', complement(zero)),
  validator('arg must be a number', _.isNumber)
);


log("sqrPre(_.identity, 10) -> ", sqrPre(_.identity, 10));
// log("sqrPre(_.identity, '') -> ", sqrPre(_.identity, ''));
// log("sqrPre(_.identity, 0) -> ", sqrPre(_.identity, 0));
log("sqrPre(_.identity, 0) -> ", sqrPre(sqr, 3));


/* 불안정한 sqr 버젼 */
function uncheckedSqr (n) { return n*n; }
log("uncheckedSqr('') -> ", uncheckedSqr(''));

/* 기존의 함수를 변경하지 않고 그대로 사용하면서 안전한 함수를 만들 수 있다. */
var checkedSqr = partial1(sqrPre, uncheckedSqr);

log("checkedSqr(10) -> ", checkedSqr(10));
// log("checkedSqr('') -> ", checkedSqr(''));   // 오류
// log("checkedSqr(0) -> ", checkedSqr(0));   // 오류

/* 새로운 검증을 혼합할수도 있다. */
/* 다른 함수를 조립하는 함수는 자기 자신도 조립에 사용될 수 있어야 한다. */
var sillySquare = partial1(
  condition1(validator('should be even', isEven)),
  checkedSqr
);

log("sillySquare(10) -> ", sillySquare(10));
// log("sillySquare(11) -> ", sillySquare(11));   // 오류
// log("sillySquare('') -> ", sillySquare(''));   // 오류
// log("sillySquare(0) -> ", sillySquare(0));   // 오류

/* 4장에서 살펴본 커맨드 객체 생성 로직에 지금까지 확인한 검증 기능을 적용 */
var validateCommand = condition1(
  validator('arg must be a map', _.isObject),
  validator('arg must have the correct keys', hasKeys('msg', 'type'))
);

var createCommand = partial(validateCommand, _.identity);
var createCommand2 = partial(validateCommand, console.log);

// log(createCommand({}));  // 오류
// log("createCommand(21) -> ", createCommand(21));
log("{msg: '', type: ''} -> ", {msg: '', type: ''});
// createCommand2({msg: '', type: ''});


var createLaunchCommand = partial1(
  condition1(
    validator('arg must have the count down', hasKeys('countDown'))),
    createCommand
);

// log("createLaunchCommand({msg: '', type: ''}) -> ", createLaunchCommand({msg: '', type: ''}));   // 오류
log("createLaunchCommand({msg: '', type: '', countDown: 10}) -> ", createLaunchCommand({msg: '', type: '', countDown: 10}));

/* quiz 필수키도 실행시에 받을 수 있게 바꿔보기 */




/* 함수의 끝을 서로 연결하는 함수 조립 방법 */
// 한 쪽으로 데이터를 넣으면 반대편으로 완전히 새로운 데이터가 나올 수 있도록 함수의 파이프라인 만들기
// !과 _.isString 사이에서 파이프라인이 만들어짐
function isntString(str) {
    return !_.isString(str);
}

log("isntString(1) => ", isntString(1));

/* 언더스코어의 _.compose 함수를 이용해서 함수를 조립하는 방법도 있다 */
var isntString = _.compose(function (x) { return !x; }, _.isString);
log("isntString([]) => ", isntString([]));

/* ! 연산자를 다음과 같이 함수로 캡슐화할 수 있다. */

function not(x) { return !x; }
var isntString = _.compose(not, _.isString);


/* mapcat 함수를 재정의 할 수 있다 */
var composedMapcat = _.compose(splat(cat), _.map);

log("composedMapcat([[1,2], [3,4], [5]], _.identity) => ", composedMapcat([[1,2], [3,4], [5]], _.identity));


/* 조립을 이용해서 선행조건과 후행조건 만들기 */
var sqrPost = condition1(
    validator('result shoud be a number', _.isNumber),
    validator('result shoud not be zero', complement(zero)),
    validator('result shoud be greater than 10', greaterThan(10))
);

// log("sqrPost(_.identity, 0) => ", sqrPost(_.identity, 0));
// log("sqrPost(_.identity, -1) => ", sqrPost(_.identity, -1));
// log("sqrPost(_.identity, '') => ", sqrPost(_.identity, ''));
log("sqrPost(_.identity, 100) => ", sqrPost(_.identity, 100));

/* 후행검사를 위해서 _.compose 함수를 사용할 수 있다 */
var megaCheckedSqr = _.compose(partial(sqrPost, _.identity), checkedSqr);

log("megaCheckedSqr(10) => ", megaCheckedSqr(10));
// log("megaCheckedSqr(0) => ", megaCheckedSqr(0));
// log("megaCheckedSqr(NaN) => ", megaCheckedSqr(NaN));
// log("megaCheckedSqr(10) => ", megaCheckedSqr(2));
