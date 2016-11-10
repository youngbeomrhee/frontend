/**
 * Created by yblee on 2016-11-02.
 */

// 노드 타입 표시
for(var key in Node) {
  if(key.indexOf('NODE')>-1) {
    console.log(key, Node[key]);
  }
}

// node type 정보만 가지고 있는 새로운 객체생성
var nodeTypes = (function() {
  var nodes = {};
  for(var key in Node) {
    (key.indexOf('NODE')>-1) && (nodes[Node[key]] = key);
  }
  return nodes;
})();


function convertToArray (nodes) {
  var array = null;
  // quirks 탐지 방법 중 하나
  try {
    array = Array.prototype.slice.call(nodes, 0);   // IE 이외, IE9+
  } catch (ex) {
    array = [];
    for (var i=0, len=nodes.length; i<len; i++) {
      array.push(nodes[i]);
    }
  }
  return array;
}

var bodyNode = convertToArray(document.body.childNodes);
console.dir(bodyNode);


// hasChildNodes() : 자식노드가 있는지 확인
console.log(`document.body.hasChildNodes() : ${document.body.hasChildNodes()}`);

// insertBefore
document.body.innerHTML = '<ul><li>1</li><li>2</li><li>3</li></ul>';
var newLi = document.createElement('li');
newLi.innerHTML = 'new';
var ul = document.querySelector('ul');
ul.insertBefore(newLi, ul.childNodes[0]);
ul.insertBefore(newLi, ul.childNodes[1]);
ul.insertBefore(newLi, null);
// 할당도 가능
var newNode = ul.insertBefore(newLi, null);

// replaceChild : 교체
var returndNode = ul.replaceChild(newLi, ul.childNodes[0]);

// removeChild : 제거
var returndNode = ul.removeChild(ul.childNodes[1]);



document.body.innerHTML = '<ul><li>1</li><li>2</li><li>3</li></ul>';

var ul = document.querySelector('ul');
var deepList = ul.cloneNode(true);
console.log(deepList);

var shallowList = ul.cloneNode(false);
console.log(shallowList);


