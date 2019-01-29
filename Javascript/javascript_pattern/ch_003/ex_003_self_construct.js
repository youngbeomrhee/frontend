/**
 * Created by YB on 2016-09-24.
 */
// new를 강제하는 방법
// 일반적인 생성자함수
function Waffle() {
    this.tastes = 'yummy';
}

// new를 강제하도록 하는 패턴
function GoodWaffle() {
    if(!(this instanceof GoodWaffle)) {
        return new GoodWaffle();
    }
    this.tastes = 'yummy';
}

var waffle = Waffle();
var waffle2 = new Waffle();
var waffle3 = GoodWaffle();
var waffle4 = new GoodWaffle();

console.dir(waffle);
console.dir(waffle2);
console.dir(waffle3);
console.dir(waffle4);
console.log();

debugger;

Waffle.prototype.wantAnother = true;
GoodWaffle.prototype.wantAnother = true;

console.dir(waffle);
console.dir(waffle2);
console.dir(waffle3);
console.dir(waffle4);
console.log();

console.log(waffle instanceof Waffle);
console.log(waffle2 instanceof Waffle);
console.log(waffle3 instanceof GoodWaffle);
console.log(waffle4 instanceof GoodWaffle);


