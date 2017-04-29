/**
 * Created by whybe on 2017. 4. 22..
 */
/* p.69. 함수 */
let mode;

// mode = 'running';   // 이하 코드에서는 log() 함수가 아무런 메시지도 표시 안함
mode = 'debug';   // 이하 코드에서는 log() 함수가 메시지 표시

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


// ---------------------------- 함수형 자바스크립트 책 시작 ------------------------------------->

/* 고차원 함수 : 함수형 자바스크립트 p.103. */
/*
    고차원 함수는 상당히 구체적으로 정의할 수 있다
    1. 고차원 함수는 일급이다
    2. 함수를 인자로 받는다.
    3. 함수를 결과로 반환한다.
*/

/* p.103. 다른 함수를 인자로 취하는 함수 */

/* p.104. 함수 전달에 대한 고찰 : max, finder, best */

// underscore에서 제공하는 기본적인 max 함수 :
_.max([1, 2, 3, 4, 5]); // 5

// 소수 비교도 문제가 없다
_.max([1, 2, 3, 4.75, 4.5]);     // 4.75

// 그렇다면 객체를 비교해야 되는 경우는 어떨까?
var people = [{name: 'Fred', age: 65}, {name: 'Lucy', age: 36}];

// 아래와 같이 _.max는 비교대상을 고를 수 있도록 하는 함수를 받아서 사용할 수 있다
_.max(people, function(p) { return p.age; });

// 두 번째 인자 덕분에 숫자 외에도 임의의 객체를 비교할 수 있게 되면서 활용도가 넓어졌지만
// 여전히 제약이 있으며(>를 사용한 대소비교에 국한됨) 진정한 함수형도 아니다.


// 좀 더 범용적으로 활용 가능한 (추상화 되어 있는) 함수형으로 최적의 값을 반환하는 함수를 만들어 보자
/**
 * 최적의 값을 반환하는 finder 함수
 * @param valueFun : coll에서 사용할 값을 추출하는 함수
 * @param bestFun : 최적의 값을 찾는 함수
 * @param coll : 데이터로 사용될 컬럼
 * @returns {RETURN|*|!*}
 */
function finder(valueFun, bestFun, coll) {
    return _.reduce(coll, function(best, current) {
        var bestValue = valueFun(best);
        var currentValue = valueFun(current);

        return (bestValue === bestFun(bestValue, currentValue)) ? best : current;
    });
}

/* finder 함수를 이용해서 언더스코어의 _.max와 같은 동작을 시뮬레이션 할 수 있다 */
log('finder(_.identity, Math.max, [1, 2, 3, 4, 5]) => ', finder(_.identity, Math.max, [1, 2, 3, 4, 5]));

log('finder(plucker("age"), Math.max, people) => ', finder(plucker("age"), Math.max, people));

log('finder(plucker("name"), function(x, y) { return (x.charAt(0) === "L") ? x : y }, people) => ', finder(plucker("name"), function(x, y) { return (x.charAt(0) === "L") ? x : y }, people));

// TODO : 해당 영역에서 중복된 로직 찾아보기
// -> return (X === fun(A, B)) ? a : b
// 찬반형을 활용하여 true면 이전 값 false면 다음 값을 반환하는 로직이 중복된다

/*
    두 가지 전제만 지켜진다면 valueFun 함수는 없앨 수 있다
    1. 첫 번째 인자가 두 번째 인자보다 나을 때 최적의 값 함수는 true 를 반환한다.
    2. 최적의 값 함수(bestFun)는 자신의 인자를 어떻게 언랩하는지 알고 있다.
*/

// 위의 규격(API)를 지킨다는 전제하에 코드가 아래와 같이 간결해진다
function best(fun, coll) {
    return _.reduce(coll, function(x, y) {
        return fun(x, y) ? x : y;
    });
}

// 제대로 작동하는지 테스트
log("best(function(x, y) { return x > y; }, [1,2,3,4,5]) => ", best(function(x, y) { return x > y; }, [1,2,3,4,5]));


// TODO : finder, best로 3의 배수 중에서 제일 큰 수 뽑아내기
finder(_.identity, function(x, y) {
    if(x%3===0 && y%3===0) {
        return (x>y?x:y);
    } else if(x%3!==0 && y%3===0) {
        return y;
    } else if(x%3===0 && y%3!==0) {
        return x;
    }
}, [1,2,3,4,5,6,7,8,9,10]);

best(function(x, y) {
    if(x%3===0 && y%3===0) {
        return (x>y?true:false);
    } else if(x%3!==0 && y%3===0) {
        return false;
    } else if(x%3===0 && y%3!==0) {
        return true;
    }
}, [1,2,3,4,5,6,7,8,9,10]);

// TODO : 검사에 사용되는 데이터를 [1,2,4,5,7,8,10]와 같이 조건을 만족하는 값이 하나도 없는 경우에는 생각치 못한 결과가 나온다. 만족하는 값이 없는 경우에는 undefined가 나오도록 하려면 어떻게 하면 될까?
// 값 자체를 사용하는([1,2,3,4,5,6,7,8,9,10])에서는 불필요한 비교대상을 추출하는 로직(_.identity)이 사용되었음을 볼 수 있다.


/* p.106. 4.1.2 함수를 다른 인자로 전달하는 상황에 대한 더 깊은 고찰 : repeat, repeatedly, iterateUntil */

// 조금 전의 finder 함수에서 best라는 함수를 만들며 인자를 하나 줄였지만, 때로는 인자를 더 받는게 합리적일 경우도 있다.
// 서로 관련이 있는 세 가지 함수를 차례로 살펴본 다음에, 이들을 어떻게 더 일반적으로 만들 수 있는지 살펴보자.
// 이 과정에서 득실이 밣생한다.

// VALUE를 times 만큼 반복하는 배열을 리턴하는 함수
function repeat(times, VALUE) {
    return _.map(_.range(times), function() { return VALUE; });
}

log("repeat(4, 'Major') => ", repeat(4, 'Major'));
log("repeat(3, {a:1}) => ", repeat(3, {a:1}));
log("repeat(5, [1,2,3]) => ", repeat(5, [1,2,3]));


/* p.107. 값 대신 함수를 사용하라 */

// 조금 전 함수의 값(VALUE)을 반복하는 방식에서 동작(함수)을 반복하는 함수 만들기
function repeatedly(times, fun) {
    return _.map(_.range(times), fun);
}

log("repeatedly(7, function() { return Math.floor(Math.random()*10+1); }) => ", repeatedly(7, function() { return Math.floor(Math.random()*10+1); }));

// 원한다면 조금 전의 repeat 함수처럼 값을 반복하게 할수도 있다.
log("repeatedly(5, function() { return 'Odeley'; }) => ", repeatedly(5, function() { return 'Odeley'; }));

// TODO : repeatedly를 래핑해서 문자를 반복시키는 함수로 만들기
// 다음과 같이 나오면 성공 : iterateString(4, 'Odley'); -> ['Odley','Odley','Odley','Odley'];
function iterateString(times, string) {
    return repeatedly(times, function () {
        return string;
    });
}


/* p.108. 단언컨대 '값 대신 함수를 사용하라' - 종단점 지정하기 */
// repeat, repeatedly는 특정 횟수만큼 반복하기만 할뿐 종단점(종료지점)을 지정할수 없다.
// 계속 실행할 것인지 종료할 것인지 확인하는 함수(check)를 더 받아서 종단점을 지정하는 새로운 함수
function iterateUntil(fun, check, init) {
    var ret = [];
    var result = fun(init);

    while (check(result)) {     // check 조건을 만족하는 한 계속 실행
        ret.push(result);
        result = fun(result);
    }

    return ret;
}

log("iterateUntil(function(n) { return n+n; }, function(n) { return n <= 1024; }, 1) => ", iterateUntil(function(n) { return n+n; }, function(n) { return n <= 1024; }, 1));

// repeatedly로 동일한 작업을 수행하려면 함수를 호출하기 전에 몇 번 호출해야 하는지 알아야 한다.
log("repeatedly(10, function() { return n+n; }) => ", repeatedly(10, function(exp) { return Math.pow(2, exp+1); }));







