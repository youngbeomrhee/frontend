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
  Parent.apply(this, arguments);
}

var c = new Child('Patrick');
console.log(c.name);
console.log(c.say);
console.dir(c);


