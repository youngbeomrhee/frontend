/**
 * Created by yblee on 2017-04-18.
 * 아래의 코드들은 안티패턴과 최적화 패턴을 다룹니다
 * 'TODO : '로 표기된 부분들은 과제이니 직접 구현해 보시면 됩니다.
 */
/*
  Javascript patterns 2장
*/


/* p.19. for 루프 */
// 최적화되지 않은 루프
for (var i = 0; i < document.querySelectorAll('*').length; i++) {
    console.log(document.querySelectorAll('*')[i]);
}

// 위의 코드의 문제점은 반복문이 돌때마다 DOM객체에 접근하게 된다.

// length를 캐쉬하여 최적화 할 수 있다.
var eles = document.querySelectorAll('*'),
    len = eles.length;
for (var i = 0; i < len; i++) {
    console.log(eles[i]);
}

// 두 코드의 성능 비교
// http://jindo.dev.naver.com/jsMatch/index.html?d=301



/* 책의 미세최적화는 엔진의 발전으로 내용 안맞음. 성능차이가 있더라도 미세한 수준이라 패스. */




/* p.24. 내장 생성자 프로토타입 확장하기 / 확장하지 않기

  Object.prototype.myMethod = ... 처럼 내장 생성자 함수의 프로토타입을 생성하는 일은 피해야 한다.
  확장하는 경우는 아래의 경우에만 권장된다.

 1. 해당 기능이 ECMAScript의 향후 버전이나 자바스크립트 구현에서 일관되게 내장 메서드로 구현될 예정이다.
    예를 들어 ECMAScript 5에 기술되었으나 아직 브라우저에 내장되지 않은 메서드라면 추가할 수 있다.
    이 경우에는 유용한 메서드를 미리 정의하는 것이라고 할 수 있다.
    - 예 : https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Object 에 실험단계로 나오는 많은 메서드들
 2. 이 프로퍼티 또는 메서드가 이미 존재하는지, 즉 이미 코드 어딘가에 구현되어 있거나, 지원 브라우저 중 일부 자바스크립트 엔진에 내장되어 있는지 확인한다.
 3. 이 변경사항을 명확히 문서화하고 팀 내에서 공유한다.
 */


/* p.27. eval is evil */
// eval은 성능상의 이슈(느림)와 보안상의 이슈(동적으로 스크립트 삽입 가능) 때문에 사용하지 않는 편이 좋다.
var obj = { name: 'whybe' },
    property = 'name';

// 안티패턴
console.log(eval('obj.' + property));

// 단순히 프로퍼티 이름이 동적으로 들어오는 경우 때문이라면 eval 필요없이 아래의 표기법을 쓰면 된다.
console.log(obj[property]);

// 위의 두 코드의 성능 비교
// http://jindo.dev.naver.com/jsMatch/index.html?d=303


// 이외에도 동적으로 코드를 실행할 수 있는 setTimeout, setInterval, new Function() 등의 함수가 있다
function myFunc() {
    console.log(arguments);
}

// 안티패턴
setTimeout('myFunc()', 1000);
setTimeout('myFunc(1, 2, 3)', 1000);

// 권장안
setTimeout(myFunc, 1000);
setTimeout(function () {
    myFunc(1, 2, 3);
}, 1000);


// eval과 Function의 차이
var evalVal1, evalVal2, evalVal3;

console.log('evalVal1 : ', evalVal1);
console.log('evalVal2 : ', evalVal2);
console.log('evalVal3 : ', evalVal3);

var jsstring = 'var evalVal1 = 1; console.log(evalVal1);';
eval(jsstring);   // 전역에 evalVal1이 생성

var jsstring = 'var evalVal2 = 2; console.log(evalVal2);';
(function () {
    eval(jsstring); // eval을 사용하더라도 즉시 실행함수 내부에서 실행되어 전역이 오염되지 않는다
})();

var jsstring = 'var evalVal3 = 3; console.log(evalVal3);';
new Function(jsstring)();   // 전역에서 실행되었지만 새로운 실행환경을 만들어줘서 전역이 오염되지 않는다

console.log('evalVal1 : ', evalVal1);   // 전역변수 오염
console.log('evalVal2 : ', evalVal2);
console.log('evalVal3 : ', evalVal3);



// eval을 사용할 경우와 Function을 사용할 경우의 scope 차이
(function () {
    var local = 1;
    eval('console.log(local);');
})();

// Function은 새로운 function을 생성한다.
(function () {
    var local = 1;
    Function('console.log(local);')();    // Function은 어디서 실행시키든 상관없이 실행환경(Execution Context)이 전역 유효범위를 바라본다
})();

/*
 주의: Function 생성자로 만든 함수는 그들의 생성 문맥(context)에 클로저(closure)를 만들지 않습니다.
 따라서 함수는 항상 전역 범위(global scope)로 생성됩니다.
 그들을 실행할 때, 함수는 Function 생성자가 호출됐던 범위가 아니라 오직 자신의 지역 변수 및 전역 변수에만 액세스할 수 있습니다, .
 이는 function 식을 위한 코드로 eval을 사용하는 것과 다릅니다.
 cf) https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Function
*/

/* p.29. 코딩 규칙 */
/*
 1. 들여쓰기 규칙 지키기
 2. 중괄호는 생략 가능해도 꼭 쓰기
 3. 여는 중괄호는 같은 행에 붙여 쓰기 -> 줄내림을 해서 중괄호를 열 경우 세미콜론 자동삽입으로 인해 아래와 같은 예상치 않은 결과를 일으킬 수 있다.
 */

(function () {
    return {
        a: 1
    }
})();

(function () {
    return
    {
        a: 1
    }
})();