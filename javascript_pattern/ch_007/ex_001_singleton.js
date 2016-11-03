/**
 * Created by yblee on 2016-11-03.
 */

console.log('\n### 스태틱 프로퍼티에 인스턴스 저장하기');
function Universe () {
  // 이미 instance가 존재하는가?
  if (typeof Universe.instance === 'object') {
    return Universe.instance;
  }

  // 이미 생성된 instance가 없으면 instance를 캐시
  Universe.instance = this;
}

var uni = new Universe();
var uni2 = new Universe();

console.log(`uni === uni2 : ${uni === uni2}`);

Universe.instance = null;
var uni3 = new Universe();
console.log(`uni === uni2 : ${uni === uni2}`);
console.log(`uni === uni3 : ${uni === uni3}`);

console.log('\n### 클로저에 인스턴스 저장하기');
function Universe2() {
  // 캐싱된 인스턴스
  var instance = this;

  // 생성자를 재작성한다.
  Universe2 = function () {
    return instance;
  }
}

var uni = new Universe2();
var uni2 = new Universe2();
console.log(`uni === uni2 : ${uni === uni2}`);

Universe2.instance = null;
var uni3 = new Universe2();
console.log(`uni === uni2 : ${uni === uni2}`);
console.log(`uni === uni3 : ${uni === uni3}`);


// 이런 방식의 문제점
console.log('\n### 이런 방식의 문제점');
function Universe3() {
  // 캐싱된 인스턴스
  var instance = this;

  // 생성자를 재작성한다.
  Universe3 = function () {
    return instance;
  }
}

Universe3.prototype.nothing = true;

var uni = new Universe3();

// 첫 번째 객체가 만들어진 이후
// 다시 프로토타입에 추가한다.
Universe3.prototype.everything = true;
var uni2 = new Universe3();

// 테스트
// 인스턴스가 하나도 생성되기 이전의 프로토타입 객체만 연결된다.
console.log(`uni.nothing : ${uni.nothing}`);
console.log(`uni2.nothing : ${uni2.nothing}`);
console.log(`uni.everything : ${uni.everything}`);
console.log(`uni2.everything : ${uni2.everything}`);

// 이 구문은 문제가 없어 보인다.
console.log(`uni.constructor.name : ${uni.constructor.name}`);

// 그러나 이상하다.
// uni.constructor가 더이상 Universe() 생성자와 같지 않은 이유는 uni.constructor가 재정의된 생성자가 아닌 원본 생성자를 가리키고 있기 때문
console.log(`uni.constructor === Universe3 : ${uni.constructor === Universe3}`);

console.log('\n### 프로토타입과 생성자 포인터 재지정을 통한 문제해결');
function Universe4 () {
  // 캐싱된 인스턴스
  var instance;

  // 생성자를 재작성한다.
  Universe4 = function Universe4() {
    return instance;
  };

  // prototype 프로퍼티를 변경한다.
  Universe4.prototype = this;

  // instance
  instance = new Universe4();

  // 생성자 포인터를 재지정한다.
  instance.constructor = Universe4;

  return instance;
}

// 테스트
// prototype을 갱신하고 인스턴서를 만든다.
Universe4.prototype.nothing = true;
var uni = new Universe4();

// 첫 번째 객체가 만들어진 이후
// 다시 프로토타입에 추가한다.
Universe4.prototype.everything = true;
var uni2 = new Universe4();

console.log(`uni.nothing : ${uni.nothing}`);
console.log(`uni2.nothing : ${uni2.nothing}`);
console.log(`uni.everything : ${uni.everything}`);
console.log(`uni2.everything : ${uni2.everything}`);

console.log(`uni.constructor.name : ${uni.constructor.name}`);
console.log(`uni.constructor === Universe4 : ${uni.constructor === Universe4}`);

console.log('\n ### 생성자와 인스턴스를 즉시싫행함수로 감싸기');
var Universe5;
(function () {
  var instance;

  Universe5 = function Universe5() {
    if (instance) {
      return instance;
    }
    instance = this;
  };
})();


// 테스트
// prototype을 갱신하고 인스턴서를 만든다.
Universe5.prototype.nothing = true;
var uni = new Universe5();

// 첫 번째 객체가 만들어진 이후
// 다시 프로토타입에 추가한다.
Universe5.prototype.everything = true;
var uni2 = new Universe5();

console.log(`uni.nothing : ${uni.nothing}`);
console.log(`uni2.nothing : ${uni2.nothing}`);
console.log(`uni.everything : ${uni.everything}`);
console.log(`uni2.everything : ${uni2.everything}`);

console.log(`uni.constructor.name : ${uni.constructor.name}`);
console.log(`uni.constructor === Universe5 : ${uni.constructor === Universe5}`);



