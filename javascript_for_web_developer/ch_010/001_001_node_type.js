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


/* cloneNode deep or shallow */
document.body.innerHTML = '<ul><li>1</li><li>2</li><li>3</li></ul>';

var ul = document.querySelector('ul');
var deepList = ul.cloneNode(true);
console.log(deepList);

var shallowList = ul.cloneNode(false);
console.log(shallowList);


/* getAttribute, setAttribute */
document.body.innerHTML = '<div id="myDiv" class="content"></div>';
console.log(`document.querySelector('div').getAttribute('id') : ${document.querySelector('div').getAttribute('id')}`);


/* 동적스크립트 */
window.location = "about:blank";
console.log(`_ : ${_}`);

function loadScript (url) {
  var script = document.createElement('script');
  script.type = 'text/javascript';
  script.src = url;
  document.body.appendChild(script);
}

loadScript('https://cdnjs.cloudflare.com/ajax/libs/underscore.js/1.8.3/underscore-min.js');

console.log(`_ : ${_}`);

/* 동적 css */
function loadStyles (url) {
  var link = document.createElement('link');
  link.rel = "stylesheet";
  link.type = 'text/css';
  link.href = url;
  var head = document.getElementsByTagName("head")[0];
  head.appendChild(link);
}

document.body.innerHTML =
    `<table class="table table-bordered">
        <tr>
          <th>h1</th>
          <th>h2</th>
          <th>h3</th>
        </tr>
        <tr>
          <td>1-1</td>
          <td>1-2</td>
          <td>1-3</td>
        </tr>
        <tr>
          <td>2-1</td>
          <td>2-2</td>
          <td>2-3</td>
        </tr>
    </table>`;

loadStyles('https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css');



