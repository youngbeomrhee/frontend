/**
 * Created by yblee on 2016-10-21.
 */
// 프로퍼티 복사를 통한 상속 패턴
// swallw copy(얕은 복사)
console.log('\n### 얕은 복사');
function extend(parent, child) {
  var i;
  child = child || {};
  for (i in parent) {
    if(parent.hasOwnProperty(i)) {
      child[i] = parent[i];
    }
  }
  return child;
}

var dad = {name: "Adam"};
var kid = extend(dad);
console.log(`kid.name : ${kid.name}`);

console.log('\n### 얕은 복사의 문제점');
var dad = {
  counts: [1, 2, 3],
  reads: {paper: true}
};
var kid = extend(dad);
kid.counts.push(4);
console.log(`dad.counts.toString() : ${dad.counts.toString()}`);
console.log(`dad.counts === kid.counts : ${dad.counts === kid.counts}`);

// deep copy(깊은 복사)
console.log('\n### 깊은 복사');
function extendDeep(parent, child) {
  var i,
      toStr = Object.prototype.toString,
      astr = "[object Array]";

  child = child || {};
  
  for (i in parent) {
    if(parent.hasOwnProperty(i)) {
      if (typeof parent[i] === "object") {
        child[i] = (toStr.call(parent[i]) === astr) ? [] : {};
        extendDeep(parent[i], child[i]);
      } else {
        child[i] = parent[i];
      }
    }
  }
  return child;
}
var dad = {
  counts: [1, 2, 3],
  reads: {paper: true}
};
var kid = extendDeep(dad);
kid.counts.push(4);
console.log(`dad.counts.toString() : ${dad.counts.toString()}`);
console.log(`dad.counts === kid.counts : ${dad.counts === kid.counts}`);

kid.reads.paper = false;
kid.reads.web = true;
console.log(`dad.reads.paper : ${dad.reads.paper}`);
console.log(`dad.reads === kid.reads : ${dad.reads === kid.reads}`);

