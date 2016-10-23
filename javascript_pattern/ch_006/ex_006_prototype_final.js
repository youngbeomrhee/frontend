/**
 * Created by yblee on 2016-10-21.
 */
// 부모생성자
function Parent(name) {
  this.name = name || 'Adam';
}

// 생성자의 프로토타입에 기능을 추가
Parent.prototype.say = function () {
  return this.name;
}

// 자식 생성자
function Child(name) {
  this.name = name;
}

/*
// 아래와 같이 구현하면 prototype을 공유하지만 property는 상속받지 못한다.
function inherit(C, P) {
  C.prototype = P.prototype;
}
*/

// 아래와 같이 구현하면 prototype을
function inherit(C, P) {
  var F = function () {};
  F.prototype = P.prototype;
  C.prototype = new F();
  // 상위 클래스 저장
  C.uber = P.prototype;
  // 생성자 포인터 재설정
  C.prototype.constructor = C;
}

inherit(Child, Parent);

var c = new Child('Patrick');
console.log(`c.constructor.name : ${c.constructor.name}`);
console.log(`c.constructor === Child : ${c.constructor === Child}`);
console.log(`c.name : ${c.name}`);
console.log(`c.say() : ${c.say()}`);
console.log('# delete c.name');
delete c.name;
console.log(`c.say() : ${c.say()}`);
console.dir(c);

console.log(`c.constructor.uber === Parent.prototype : ${c.constructor.uber === Parent.prototype}`);
console.log(`c.constructor.uber.say() : ${c.constructor.uber.say()}`);
console.log(`c.constructor.uber.default = 'default name' : ${(c.constructor.uber.default = 'default name')}`);
console.log(`c.constructor.uber.say 재정의 : `, (c.constructor.uber.say = function() { return this.name || this.default;}));
console.log(`c.constructor.uber.say() : ${c.constructor.uber.say()}`);
