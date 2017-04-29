/**
 * Created by YB on 2016-10-23.
 */

// mode = 'running';   // 이하 코드에서는 log() 함수가 아무런 메시지도 표시 안함
mode = 'debug';   // 이하 코드에서는 log() 함수가 메시지 표시

/* 재귀 */
function myLength(ary) {
    if (_.isEmpty(ary))
        return 0;
    else
        return 1 + myLength(_.rest(ary));   // 꼬리재귀 최적화가 되지 않은 코드
}

function myLength2(ary) {
    if (ary.length < 1) {
        return 0;
    } else {
        return 1 + myLength(ary.slice(1));  // 꼬리재귀 최적화가 되지 않은 코
    }
}

log("myLength(_.range(10)) -> ", myLength(_.range(10)));
log("myLength([]) -> ", myLength([]));
log("myLength(_.range(1000)) -> ", myLength(_.range(1000)));

log("myLength2(_.range(10)) -> ", myLength(_.range(10)));
log("myLength2([]) -> ", myLength([]));
log("myLength2(_.range(1000)) -> ", myLength(_.range(1000)));


/* 재귀함수는 인자를 소비하지 않는다 */
// 골치 아픈 상황을 피하고 싶다면 재귀 함수에 주어진 인자는 바꾸지 않는 것이 좋다

var a = _.range(10);
log("myLength(a) -> ", myLength(a));
log("a -> ", a);


function cycle(times, ary) {
    if (times <= 0)
        return [];
    else
        return cat(ary, cycle(times - 1, ary));
}

log("cycle(2, [1, 2, 3]) -> ", cycle(2, [1, 2, 3]));
log("_.take(cycle(20, [1, 2, 3]), 11) -> ", _.take(cycle(20, [1, 2, 3]), 11));
log("_.first(cycle(20, [1, 2, 3]), 11) -> ", _.first(cycle(20, [1, 2, 3]), 11));

/* _.zip 함수의 반대 동작을 수행하는 unzip 함수 만들기 */

log("_.zip(['a', 'b', 'c'], [1, 2, 3]) -> ", _.zip(['a', 'b', 'c'], [1, 2, 3]));

// 아래의 배열을 unzip 하려면
var zipped1 = [['a', 1]];

function constructPair(pair, rests) {
    return [construct(_.first(pair), _.first(rests)),
        construct(second(pair),  second(rests))];
}

log("constructPair(['a', 1], [[], []]) -> ", constructPair(['a', 1], [[], []]));
log("_.zip(['a'], [1]) -> ", _.zip(['a'], [1]));
log("_.zip.apply(null, constructPair(['a', 1], [[], []])) -> ", _.zip.apply(null, constructPair(['a', 1], [[], []])));

log("constructPair(['a', 1], constructPair(['b', 2], constructPair(['c', 3], [[], []]))) -> ", constructPair(['a', 1], constructPair(['b', 2], constructPair(['c', 3], [[], []]))));

// quiz : unzip 3단계 구현?
// unzip(_.zip(['a', 'b', 'c'], [1, 2, 3], ['x', 'y', 'z']));   // [['a', 'b', 'c'], [1, 2, 3], ['x', 'y', 'z']]



/* construct가 어떻게 작동하는지 이해했다면 이를 기반으로 unzip이라는 재귀 함수를 만들 수 있다 */
function unzip(pairs) {
    if (_.isEmpty(pairs)) return [[],[]];

    return constructPair(_.first(pairs), unzip(_.rest(pairs)));
}

/* Quiz : 2단 unzip을 확장하여 단수에 상관없는 unzip 만들어보기 */



/* 재귀를 이용한 그래프 탐색 */
var influences = [
    ['Lisp', 'Smalltalk'],
    ['Lisp', 'Scheme'],
    ['Smalltalk', 'Self'],
    ['Scheme', 'JavaScript'],
    ['Scheme', 'Lua'],
    ['Self', 'Lua'],
    ['Self', 'JavaScript']];

// 전체 그래프 탐색
function nexts(graph, node) {
    if (_.isEmpty(graph)) return [];

    var pair = _.first(graph);      // graph의 첫 번째 인자(배열) 추출
    var from = _.first(pair);       // pair의 첫 번째 인자 추출(head)
    var to   = second(pair);        // pair의 두 번째 인자 추출(tail)
    var more = _.rest(graph);       // graph의 나머지 인자 추출

    if (_.isEqual(node, from)) {        // 탐색하려는 node가 head와 같으면
        return construct(to, nexts(more, node));    // 시작점을 배열에 담고 나머지 남은 인자들을 nexts로 넘겨서 다시 탐색
        // 최종적으로는 construct('a', construct('b', construct('c', construct('d', 'e')))); 와 같은 형태의 구조가 생성됨
    } else {        // 탐색하려는 node가 head가 아니면 새로운 탐색
        return nexts(more, node);   // 나머지 요소를 새로운 탐색대상으로 넘김
    }
}

log("nexts(influences, 'Lisp') -> ", nexts(influences, 'Lisp'));

/* Quiz : 다중 노드를 탐색하도록 */

/* 메모리에서 깊이 우선 재귀 탐색하기 */
/*
    graph : 검색대상 전체목록. 변화없음
    nodes : 검색이 필요한 목록. 늘어나거나 감소됨. 언제 멈출지를 확인할때 사용
    seen : 검색이 이미 끝난 목록. 점차 늘어남
*/
// TODO : 호출되고의 흐름을 인자 하나 하나 머리로 정리
function depthSearch(graph, nodes, seen) {
    if (_.isEmpty(nodes)) {
        return rev(seen);       // 더이상 탐색할 nodes가 없으면 그간 쌓인 seen stack을 rev를 통해 queue 형식으로 변경하고 종료
    }

    var node = _.first(nodes);  // 현재 검색에 사용할 대상
    var more = _.rest(nodes);   // 다음에 검색할 나머지 대상

    if (_.contains(seen, node)) {       // cache된 seen에 있는지 여부를 확인해서 있으면
        return depthSearch(graph, more, seen);  // 현재의 node가 이미 조회됐던 건이므로 나머지(more)만 검색대상으로 전달
    } else {        // cache된 seen에 없으면
        return depthSearch(graph,
            cat(nexts(graph, node), more),  // 검색해야 할 대상을 추가 후에 아직 검색하지 못한 나머지(more)도 검색대상으로 전달
            construct(node, seen));     // 현재 node도 이미 검색에 사용되었으므로 seen에 추가
    }
}

log("depthSearch(influences, ['Lisp'], []) -> ", depthSearch(influences, ['Lisp'], []));
log("depthSearch(influences, ['Smalltalk', 'Self'], []) -> ", depthSearch(influences, ['Smalltalk', 'Self'], []));
log("depthSearch(construct(['Lua', 'Io'], influences), ['Lisp'], []) -> ", depthSearch(construct(['Lua', 'Io'], influences), ['Lisp'], []));

/* 꼬리재귀를 활용한 myLength */
function tcLength(ary, n) {
    var l = n ? n : 0;

    if (_.isEmpty(ary))
        return l;
    else
        return tcLength(_.rest(ary), l + 1);    // 꼬리재귀최적화가 이뤄진 코드
}

log("tcLength(_.range(10)) -> ", tcLength(_.range(10)));
log("tcLength([]) -> ", tcLength([]));
log("tcLength(_.range(1000)) -> ", tcLength(_.range(1000)));



function andify(/* preds */) {
    var preds = _.toArray(arguments);

    return function(/* args */) {
        var args = _.toArray(arguments);

        var everything = function(ps, truth) {
            if (_.isEmpty(ps)) {
                return truth;
            } else {
                return _.every(args, _.first(ps)) && everything(_.rest(ps), truth);
            }
        };

        return everything(preds, true);
    };
}

var evenNums = andify(_.isNumber, isEven);

log("evenNums(1,2) -> ", evenNums(1,2));
log("evenNums(2,4,6,8) -> ", evenNums(2,4,6,8));
log("evenNums(2,4,6,8,9) -> ", evenNums(2,4,6,8,9));



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

var zeroOrOdd = orify(isOdd, zero);

log("zeroOrOdd() -> ", zeroOrOdd());
log("zeroOrOdd(0,2,4,5) -> ", zeroOrOdd(0,2,4,5));
log("zeroOrOdd(2,4,6) -> ", zeroOrOdd(2,4,6));



/* p.163. 상호재귀 */
function isEvenRec(n) {
    if (n === 0)
        return true;
    else
        return isOddRec(Math.abs(n) - 1);
}

function isOddRec(n) {
    if (n === 0)
        return false;
    else
        return isEvenRec(Math.abs(n) - 1);
}

log("isEvenRec(4) -> ", isEvenRec(4));
log("isEvenRec(5) -> ", isEvenRec(5));
log("isOddRec(4) -> ", isOddRec(4));
log("isOddRec(5) -> ", isOddRec(5));


function flat(ary) {
    if (_.isArray(ary)) {
        return cat.apply(null, _.map(ary, flat));
    } else {
        return [ary];
    }
}


log("flat([[1,2], [3,4]]) -> ", flat([[1,2], [3,4]]));
log("flat([[1,2], [3,4, [5, 6, [[[7]]], 8]]]) -> ", flat([[1,2], [3,4, [5, 6, [[[7]]], 8]]]));


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

log("influencedWithStrategy(postDepth, 'Lisp', influences) => ", influencedWithStrategy(postDepth, 'Lisp', influences));

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
