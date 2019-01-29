/**
 * Created by YB on 2016-05-07.
 */
var uniqueId = function(){
    if(!arguments.callee.id){
        arguments.callee.id = 0;
    }
    return arguments.callee.id++;
}

uniqueId();  // 0
uniqueId();  // 1
uniqueId();  // 2
// id를 0으로 초기화 할 수 있을까?

uniqueId.id = 0;

uniqueId();  // 0



/* Closure – Closure를 사용해서 값을 가지고 있을 때 */

var uniqueId = (function(){
    var id = 0;
    return function(){
        return id++;
    }
})();
uniqueId();  // 0
uniqueId();  // 1
uniqueId();  // 2
uniqueId();  // 3

// 0으로 초기화
uniqueId.id = 0 // ?
uniqueId();  // 4




/* Closure – 응용 : Private 변수 */

function DtoObj(initVal) {
    var val = initVal;

    this.getVal = function () {  // this는 새로 만들어진 객체를 가리킴
        return val;
    };

    this.setVal = function(pVal) {
        val = pVal;
    }
}

var dto = new DtoObj(3);

// dto 객체의 내부 변수는 getter를 통해서만 접근하여 값을 받을 수 있다.
console.log(dto.getVal()); // 3
// dto 객체의 내부 변수는 setter를 통해서만 접근하여 값을 바꿀 수 있다.
dto.setVal(4);
console.log(dto.getVal()); // 4
dto.val = 5;
console.log(dto.getVal()); // 4




