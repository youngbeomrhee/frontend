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
  this.say = function() {   // 이름이 같은 경우 덮어씌어진다
    return 'beapbeap';
  }
}

function CatWings() {
  Cat.apply(this);
  Bird.apply(this);
}

var jane = new CatWings();
console.log(`CatWings has "${jane.legs}" legs and "${jane.wings}" wings and sounds '${jane.say()}'.`);

