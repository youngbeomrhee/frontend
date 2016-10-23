/**
 * Created by yblee on 2016-10-21.
 */
// ES6의 class를 사용하면 지금까지의 코드가 매우 간단해진다.
class Parent {
  constructor(name) {
    this.name = name || 'Adam';
  }
  say() {
    return this.name;
  }
}

class Child extends Parent {
  constructor(name) {
    super();
    this.name = name;
  }
}

var c = new Child('Patrick');

console.log(`c.say() : ${c.say()}`);

console.dir(c);