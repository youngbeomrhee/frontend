/**
 * Created by whybe on 2017. 4. 22..
 */
/* p.69. 함수 */

// 함수 선언문 vs. 함수 표현식 -> 호이스팅의 차이가 생김
console.log(funcDeclaration);
console.log(funcExpression);

function funcDeclaration() {
    console.log(innerFuncDeclaration);
    console.log(innerFuncExpression);
    function innerFuncDeclaration() {}
    var innerFuncExpression = function () {};
}
var funcExpression = function () {};




/* p.81. 함수 반환하기 : 함수를 반환하는 함수 */

// 가장 흔한 카운터 예제
// 특징 : 처음 실행할 때만 실행하고 그 이후로는 실행되지 않는다.
function setNext(initVal) {
    // 아래 줄은 처음에만 실행되고 그 이후로는 실행되지 않는다. 그래서 처음 실행시에 무언가를 세팅할때 쓰인다
    var useLater = initVal || 0;
    return function (param) {
        console.log(++useLater);
    }
}

var next = setNext();
next();
next();
next();


var next = setNext(2);
next();
next();
next();


// 함수형 맛보기
function handleTwo(fun) {
    return function(x, y) {
        return fun.call(null, x, y);
    };
}

var adder = handleTwo(function(x, y) { return x + y; });

adder(1,2);
adder(4,2);
adder(3,6);

var devider = handleTwo(function(x, y) { return x / y; });

devider(2,4);
devider(4,2);
devider(3,9);


// 받아오는 인수의 갯수와 상관없게 만들기
var handleAll = function (fun) {
    return function () {
        return fun.call(null, ...arguments);
    }
};

var addAll = handleAll(function () { return Array.prototype.reduce.call(arguments, function(prev, next) { return prev + next} ) });


/* p.84. 즉시 실행 함수 */
// 기본형식
(function () {
    console.log('한 번만 실행하면 되는 로직을 실행');
})();



/* p.85. 즉시 실행 함수의 매개변수 */
(function (global) {
    // 전역 객체를 'global'로 참조
    console.log(global === window);
})(this);


// 일종의 sandbox 패턴이 된다
(function (jq, us) {
    // 이렇게 사용하면 전역 scope와 다른 새로운 scope이 생긴다
    console.log(Boolean(jq.ajax));
    console.log(Boolean(us.map));
})($, _);


// p.86. 즉시 실행 함수의 반환 값
var initVal = (function () {
    var result = '이런 저런 연산/통신 끝에 받아오는 값';
    return result;
})();
console.log(initVal);


// p.88. 즉시 객체 초기화
({
    // 여기에 설정 값(설정 상수)들을 정의할 수 있다
    maxwidth: 600,
    maxheight: 400,

    // 유틸리티 메서드 또한 정의할 수 있다.
    gimmeMax: function () {
        return this.maxwidth + ' x ' + this.maxheight;
    },

    // 초기화
    init: function () {
        console.log(this.gimmeMax());
        // 더 많은 초기화 작업들..
    }
}).init();


/* p.92. 함수 프로퍼티 - 메모이제이션(Memoization) 패턴 */
var myFunc = function (param) {
    var result;
    if (!myFunc.cache[param]) {
        console.log(param + '(으)로 비용이 많이 드는 연산 수행');
        result = param + ' 연산결과';
        myFunc.cache[param] = result;
    } else {
        console.log(param + '(으)로 cache 된 결과 사용');
        result = myFunc.cache[param]
    }
    return result;
};

// 캐시 저장공간
myFunc.cache = {};

// TODO : 일반적으로 cache를 외부로 노출시키는건 좋은 패턴이 아니다. 외부에서 접근할 수 없는 형식으로 바꿔보자
// -> 정답
var myFunc = (function () {
    var cache = {};
    return function(param) {
        var result;
        if (!cache[param]) {
            console.log(param + '(으)로 비용이 많이 드는 연산 수행');
            result = param + ' 연산결과';
            cache[param] = result;
        } else {
            console.log(param + '(으)로 cache 된 결과 사용');
            result = cache[param];
        }
        return result;
    }
})();


/* p.94. 4.9 설정 객체 패턴 */
// addPerson() 함수를 TDD 스타일로 만들어보기