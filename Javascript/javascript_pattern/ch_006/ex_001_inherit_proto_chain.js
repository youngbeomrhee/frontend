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

// 아무 내용이 없는 자식 생성자
function Child(name) {}

function inherit(C, P) {
  C.prototype = new P();
}

// 상속의 마법
inherit(Child, Parent);

var c = new Child();
console.log(c.say());



