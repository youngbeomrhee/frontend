/**
 * Created by yblee on 2016-10-21.
 */
// 생성자 빌려쓰기를 적용한 다중 상속
function Cat() {
  this.legs = 4;
  this.say = function () {
    return 'meaowww';
  }
}

function Bird() {
  this.wings = 2;
  this.fly = true;
}

function CatWings() {
  Cat.apply(this);
  Bird.apply(this);
}

var jane = new CatWings();
console.dir(jane);


