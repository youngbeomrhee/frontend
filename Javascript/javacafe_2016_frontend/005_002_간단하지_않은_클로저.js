// 간단하지 않은 클로저

var outerValue = 'outerValue';

var later;

function outerFunction() {
    // 함수 내에 변수를 하나 선언한다. 이 변수의 유효 범위는 함수 내부로 제한이 되고,
    // 함수 외부에서는 접근할 수 없다.
    var innerValue = 'innerValue'

    // outerFunction() 내에 innerFunction()을 선언한다.
    function innerFunction() {
        console.log(outerValue);
        // innerValue는 있을까?
        console.log(innerValue);
    }

    // later 변수에 innerFunction의 참조를 저장한다.
    // later가 전역 변수이므로, later 변수를 사용하여
    // innerFunction() 함수를 나중에 호출할 수 있다.
    later = innerFunction;
}

// outerFunction을 실행한다. 이 함수는 내부적으로 innerFunction을 선언한 다음,
// 그 참조를 later 변수에 저장한다.
outerFunction();

// later 변수를 이용해서 innerFunction을 호출한다.
// innerFunction의 유효 범위는 outerFunction 내부로 제한되어 있기 때문에
// 외부에서 직접 호출하는 것은 불가능하다.
later();