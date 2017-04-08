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
