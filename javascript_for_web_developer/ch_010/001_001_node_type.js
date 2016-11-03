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





