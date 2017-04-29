/**
 * Created by YB on 2016-10-23.
 */

mode = 'running';   // 이하 코드에서는 log() 함수가 아무런 메시지도 표시 안함
// mode = 'debug';   // 이하 코드에서는 log() 함수가 메시지 표시

/* 입력 인자에 따라 반환값을 예상할 수 있다면 여러 동작을 더 쉽게 조립할 수 있다. */
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

log(`createPerson()
        .setFirstName('Mike')
        .setLastName('Fogus')
        .setAge(108)
        .toString() -> `,
    createPerson()
        .setFirstName('Mike')
        .setLastName('Fogus')
        .setAge(108)
        .toString()
);

// _.chain : Returns a wrapped object.
//  Calling methods on this object will continue to return wrapped objects until value is called.

// 종단메서드(.value())를 만나기 전까지는 wrapper 객체만을 리턴한다
log(`_.chain(library)
  .pluck('title')
  .sort() -> `,
    _.chain(library)
        .pluck('title')
        .sort()
);

log(`_.chain(library)
        .pluck('title')
        .sort()
        .value() -> `,
    _.chain(library)
        .pluck('title')
        .sort()
        .value()
);


// 예상하지 못한 결과가 나올 때도 있다.
var TITLE_KEY = 'titel';

// ... 꽤 많은 코드

log(`_.chain(library)
        .pluck(TITLE_KEY)
        .sort()
        .value() -> `,
    _.chain(library)
        .pluck(TITLE_KEY)
        .sort()
        .value()
);

// Invokes interceptor with the object, and then returns object. The primary purpose of this method is to "tap into" a method chain, in order to perform operations on intermediate results within the chain.

// 디버깅을 위해 함수를 호출하는 시점의 객체를 확인할 수 있는 tap이라는 메서드가 제공된다.
// 아래 코드는 중간값을 검사했을 때 문제가 없어 보일 수 있다.
log(`_.chain(library)
  .tap(function (o) { log("o -> ", o); })
  .pluck(TITLE_KEY)
  .sort()
  .value() -> `, _.chain(library)
  .tap(function (o) { log("o -> ", o); })
  .pluck(TITLE_KEY)
  .sort()
  .value()
);


// tap의 위치를 바꿔서 어느 로직에 문제가 있는지 확인해 볼 수 있다.
// 해당 메서드를 통해 제어할 수 있는 코드 벙위에 문제가 있음이 밝혀졌다.
log(`_.chain(library)
    .pluck(TITLE_KEY)
    .tap(function (o) { log("o -> ", o); })
    .sort()
    .value() -> `, _.chain(library)
  .pluck(TITLE_KEY)
  .tap(function (o) { log("o -> ", o); })
  .sort()
  .value()
);
// _.tap() 메서드는 특정 대상에 행하는 동작을 유연하게 묘사하고자 할 때 특히, _.chain을 유용하게 사용할 수 있다.
// 하지만 _.chain은 게으리지 않다는 한계가 있다.
// .value() 함수를 이용해서 명시적으로 감싼 값을 요청하지 않았음에도 (이전의) 체인의 모든 호출이 실행됐다.


// 6장에서 구현한 trampoline 기법을 이용해서 _.value를 호출할 때까지 대상 메서드를 호출하지 않는 게으른 _.chain을 구현할 수 있다.
function LazyChain(obj) {
    this._calls  = [];
    this._target = obj;
}

// 6장의 trampoline은 묵시적인 호출 체인으로 동작했지만 LazyChain은 명시적인 배열로 동작한다.
LazyChain.prototype.invoke = function(methodName /*, args */) {
    var args = _.rest(arguments);

    this._calls.push(function(target) {
        var meth = target[methodName];

        return meth.apply(target, args);
    });

    return this;
};

// 메서드 구조 확인
log("new LazyChain([2, 1, 3]).invoke('sort')._calls -> ", new LazyChain([2, 1, 3]).invoke('sort')._calls);

// 나중에 실행할 수 있도록 어떤 동작을 감싸는 함수를 성크(thunk)라고 부른다. _calls에 저장된 성크는 이후로 발생할 메서드 호출을 수신할 객체 역할을 하는 중간 대상을 필요로 한다.

// 직접 실행해보기
// log("new LazyChain([2, 1, 3]).invoke('sort')._calls[0]() -> ", new LazyChain([2, 1, 3]).invoke('sort')._calls[0]());
// ERROR : Uncaught TypeError: Cannot read property 'sort' of undefined

// 제대로 동작하도록 하기 위해서는 원래 배열을 인자로 전달할 필요가 있다
log("new LazyChain([2, 1, 3]).invoke('sort')._calls[0]() -> ", new LazyChain([2, 1, 3]).invoke('sort')._calls[0]([2, 1, 3]));

// 초기 성크뿐만 아니라 _calls 배열의 모든 중간 호출에 루프백 인자를 제공하는 함수 생성
// (보통 계속 실행 가능한 상태로 wrapping 된) this._target을 thunk로 실행한 객체를 계속 리턴 받는 형식
LazyChain.prototype.force = function() {
    return _.reduce(this._calls, function(target, thunk) {
        return thunk(target);
    }, this._target);
};

// 실행
log("new LazyChain([2,1,3]).invoke('sort').force() -> ", new LazyChain([2,1,3]).invoke('sort').force());


// 메서드 체인에 링크 추가
// 호출이 일어날 때마다 형식이 바뀔 수 있다는 사실만 주의한다면 원하는 수만큼 체인을 연결할 수 있다.
log(`new LazyChain([2, 1, 3])
  .invoke('concat', [8, 5, 7, 6])
  .invoke('sort')
  .invoke('join', ' ')
  .force() -> `, new LazyChain([2, 1, 3])
  .invoke('concat', [8, 5, 7, 6])
  .invoke('sort')
  .invoke('join', ' ')
  .force());


// 게으른 버젼의 tap 메서드
// 미리 function을 세팅해두고 실행시점(force 실행)에 받아온 target을 실행만 하고 다시 target을 리턴
LazyChain.prototype.tap = function(fun) {
    this._calls.push(function(target) {
        fun(target);
        return target;
    });

    return this;
}

log(`new LazyChain([2, 1, 3])
  .invoke('sort')
  .tap(log)
  .invoke('join', ' ')
  .force() -> `, new LazyChain([2, 1, 3])
  .invoke('sort')
  .tap(log)
  .force());


// force를 호출하지 않으면 처리가 지연된다
var deferredSort = new LazyChain([2, 1, 3])
  .invoke('sort')
  .tap(log);
log('... 약간의 시간이 흐른 후');

log("deferredSort.force() -> ", deferredSort.force());


// LazyChain을 다른 LazyChain과 연결해서 간단히 연장하는 방법
function LazyChainChainChain(obj) {
    var isLC = (obj instanceof LazyChain);

    this._calls  = isLC ? cat(obj._calls, []) : [];
    this._target = isLC ? obj._target : obj;
}

LazyChainChainChain.prototype = LazyChain.prototype;


// jQuery에서 제공하는 promise는 LazyChain, LazyChainChainChain과 비슷하게 동작하지만 조금 다른 점도 있다

// deferred 객체를 받아오는 방법
var longing = $.Deferred();

// promise를 끄집어낼 수 있다.
var promise = longing.promise();

// state 메서드로 현재의 동작 상태를 확인할 수 있다.
log("promise.state() -> ", promise.state());

// 간단히 멈춤 상태를 해결할 수 있다.
longing.resolve('<3');

log("promise.state() -> ", promise.state());

// 이제 프로미스가 실행되었으므로 값에 접근할 수 있다.
promise.done(log);


// 프로미스 체인 예제
function go() {
    var d = $.Deferred();

    $.when('')
        .then(function() {
            setTimeout(function() {
                log("sub-task 1");
            }, 5000)
        })
        .then(function() {
            setTimeout(function() {
                log("sub-task 2");
            }, 3000)
        })
        .then(function() {
            setTimeout(function() {
                d.resolve("done done done done");
            }, 1000)
        })

    return d.promise();
}

// 실행
var yearning = go().done(log);
log("yearning.state() -> ", yearning.state());


// 메서드 체이닝의 여러 가지 문제 중 가장 큰 문제는 체인 호출이 일어나면서 어떤 공통 레퍼런스를 변이시킬 수 있다는 점
// 이와 달리 함수형 API는 레퍼런스가 아닌 값으로 작동하므로 데이터를 섬세하게(때로는 섬세하지 않게) 변경하면서 새로운 결과를 반환한다.
// 원래 데이터는 함수를 수행한 다음에도 그대로 남아 있는 것이 가장 이상적
// 함수형에서는 데이터값을 입력받아서 비파괴적으로 변형한 다음에 새로운 데이터를 반환하는 식으로 호출 체인이 일어난다.

// 파이프라인 API 예
log(`pipeline([2, 3, null, 1, 42, false],
_.compact,
  _.initial,
  _.rest,
  rev
) -> `, pipeline([2, 3, null, 1, 42, false],
_.compact,
  _.initial,
  _.rest,
  rev
));

// 위의 파이프라인을 다음처럼 중첩 호출로 표현할 수 있다.
log("rev(_.rest(_.initial(_.compact([2, 3, null, 1, 42, false])))) -> ", rev(_.rest(_.initial(_.compact([2, 3, null, 1, 42, false])))));
// -> LazyChain#force와 상당히 비슷한 구조

function pipeline(seed /*, args */) {
    return _.reduce(_.rest(arguments),
        function(l,r) { return r(l); },
        seed);
};


// pipeline 작동원리
log("pipeline() -> ", pipeline());
log("pipeline(42) -> ", pipeline(42));
log("pipeline(42, function (n) { return -n; }) -> ", pipeline(42, function (n) { return -n; }));


// 파이프라인을 함수(또는 성크) 내부로 캡슐화해서 파이프라인을 게으르게 만들 수 있다.
function fifth(a) {
    return pipeline(a
        , _.rest
        , _.rest
        , _.rest
        , _.rest
        , _.first);
}

// 데이터를 제공해서 파이프라인을 실행할 수 있다.
log("fifth([1, 2, 3, 4, 5]) -> ", fifth([1, 2, 3, 4, 5]));


// 파이프라인을 추상화한 다음에 다른 파이프라인에 추가할 수 있다는 점은 파이프라인의 매우 강력한 기능이다.
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

log("firstEditions(library) => ", firstEditions(library));

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
//-> {_value: 42 ...}

// console.log(`c instanceof Class : ${c instanceof Class}`);
//-> true


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

