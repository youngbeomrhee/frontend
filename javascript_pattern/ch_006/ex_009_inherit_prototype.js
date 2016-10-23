/**
 * Created by yblee on 2016-10-21.
 */
// 상속해줄 객체
function object(o) {
  function F() {}
  F.prototype = o;
  return new F();
}

var parent = {
  name: "Papa"
};

// 새로운 객체
var child = object(parent);

// test
console.log(child.name);  // Papa


// 생성자를 통한 상속
// 부모 생성자
function Person() {
  // 부모 생성자 자신의 프로퍼티
  this.name = "Adam";
}

// 프로토타입에 추가된 프로퍼티
Person.prototype.getName = function () {
  return this.name;
};

// Person 인스턴스를 생성한다.
var papa = new Person();

// 이 인스턴스를 상속한다.
var kid = object(papa);

// 부모 자기 자신의 프로퍼티와 프로토타입의 프로퍼티가 모두 상속되었는지 확인해보자
console.log(`kid.getName() : ${kid.getName()}`);
console.log(`kid.name : ${kid.name}`);
console.dir(kid);


// 프로토타입 객체만 상속받을 수 있도록 변경
var kid = object(Person.prototype);
console.log(`kid.getName() : ${kid.getName()}`);
console.log(`kid.name : ${kid.name}`);
console.dir(kid);



// Object.create() 사용
var kid = Object.create(papa, {name:'Patrick'});
console.log(`kid.getName() : ${kid.getName()}`);
console.log(`kid.name : ${kid.name}`);
console.dir(kid);


// Object.create()의 다른 예제
var child = Object.create(parent, {
  age: {value: 2}  // ECMA 5 descriptor
});
console.log(`child.hasOwnProperty("age") : ${child.hasOwnProperty("age")}`);
console.dir(child);

