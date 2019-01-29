/**
 * Created by yblee on 2016-10-21.
 */

var klass = function (Parent, props) {
  var Child, F, i;

  // 1.
  // 새로운 생성자
  Child = function () {
    if (Child.uber && Child.uber.hasOwnProperty("__construct")) {
      Child.uber.__construct.apply(this, arguments);
    }
    if (Child.prototype.hasOwnProperty("__construct")) {
      Child.prototype.__construct.apply(this, arguments);
    }
  };

  // 2.
  // 상속
  Parent = Parent || Object;
  F = function () {};
  F.prototype = Parent.prototype;
  Child.prototype = new F();
  Child.uber = Parent.prototype;
  Child.prototype.cunstoructor = Child;

  // 3.
  // 구현 메서드를 추가한다.
  for(i in props) {
    if(props.hasOwnProperty(i)) {
      Child.prototype[i] = props[i];
    }
  }

  // '클래스'를 반환한다
  return Child;
}

var Man = klass(null, {
  __construct: function (what) {
    console.log("Man's constructor");
    this.name = what;
  },
  getName: function () {
    return this.name;
  }
});

var first = new Man('Adam');  // Man's constructor가 출력된다.
console.log(`first.getName() : ${first.getName()}`);

// 이 클래스를 상속받아 SuperMan 클래스를 만들어보자.
var SuperMan = klass(Man, {
  __construct: function (what) {
    console.log("SuperMans's constructor");
  },
  getName: function () {
    var name = SuperMan.uber.getName.call(this);
    return "I am " + name;
  }
});

var clark = new SuperMan('Clark kent');
console.log(`clark.getName() : ${clark.getName()}`);
console.log(`clark instanceof Man : ${clark instanceof Man}`);
console.log(`clark instanceof SuperMan : ${clark instanceof SuperMan}`);



// console.log(` : ${}`);
