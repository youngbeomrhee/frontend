/**
 * Created by YB on 2016-11-04.
 */

// 부모 생성자
function CarMaker() {}

// 부모의 메서드
CarMaker.prototype.drive = function () {
    return 'Vroom, I have ' + this.doors + ' doors';
};

// 스태틱 factory 메서드
CarMaker.factory = function (type) {
    var constr = type,
        newcar;

    // 생성자가 존재하지 않으면 에러를 발생시킨다
    if (typeof CarMaker[constr] != 'function') {
        throw {
            name: 'Error',
            message: constr + " doesn't exist"
        };
    }

    // 생성자의 존재를 확인했으므로 부모를 상속한다.
    // 상속은 단 한 번만 실행하도록 한다.
    if (typeof CarMaker[constr].prototype.drive !== 'function') {
        CarMaker[constr].prototype = new CarMaker();
    }

    // 새로운 인스턴스를 생성한다.
    newcar = new CarMaker[constr]();

    // 다른 메서드 호출이 필요하면 여기서 실행한 후, 인스턴스를 반환한다.
    return newcar;
};

// 구체적인 자동차 메이커들을 선언한다.
CarMaker.Compact = function () {
    this.doors = 4;
};
CarMaker.Convertible = function () {
    this.doors = 2;
};
CarMaker.SUV = function () {
    this.doors = 24;
};

var corolla = CarMaker.factory('Compact');
var solstice = CarMaker.factory('Convertible');
var chrokee = CarMaker.factory('SUV');
console.log(`corolla.drive() : ${corolla.drive()}`);
console.log(`solstice.drive() : ${solstice.drive()}`);
console.log(`chrokee.drive() : ${chrokee.drive()}`);

console.log('\n### Object 역시 팩토리');
var o = new Object(),
    n = new Object(1),
    s = Object('1'),
    b = Object(true);

// 테스트
console.log(`o.constructor === Object : ${o.constructor === Object}`);
console.log(`n.constructor === Number : ${n.constructor === Number}`);
console.log(`s.constructor === String : ${s.constructor === String}`);
console.log(`b.constructor === Boolean : ${b.constructor === Boolean}`);

