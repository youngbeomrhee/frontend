/**
 * Created by yblee on 2017-04-18.
 */
// p.4. 객체의 프로퍼티 변경불가
const obj = {a: 1};
console.log(obj.a);

obj.a = 2;
console.log(obj.a);

Object.freeze(obj);
obj.a = 3;
console.log(obj.a);


