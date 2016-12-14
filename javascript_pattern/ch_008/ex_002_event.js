/**
 * Created by yblee on 2016-12-06.
 */

document.body.innerHTML = '<button id="clickMe">Click me: 0</button>';

var b = document.getElementById('clickMe'), count = 0;

// 한 번 밖에 못쓰는 방법
b.onclick = function () {
  count += 1;
  b.innerHTML = 'Click me: ' + count;
};


document.body.innerHTML = '<button id="clickMe">Click me: 0</button>';

// addEventListener 사용
var b = document.getElementById('clickMe');

if(document.addEventListener) { // W3C
  b.addEventListener('click', myHandler, false);
} else if (document.attachEvent) {  // IE
  b.attachEvent('onclick', myHandler);
} else {  //
  b.onclick = myHandler;
}

function myHandler (e) {
  var src, parts;

  // 이벤트 객체와 이벤트가 발생한 엘리먼트를 가져온다.
  e = e || window.event;
  src = e.target || e.srcElement;

  if (src.nodeName.toLowerCase() !== 'button') {
    return;
  }


  // 버튼의 라벨을 변경한다.
  parts = src.innerHTML.split(': ');
  parts[1] = parseInt(parts[1], 10) + 1;
  src.innerHTML = parts[0] + ': ' + parts[1];

  // 이벤트가 상위노드로 전파되지 않게 한다.
  if (typeof e.stopPropagation === 'function') {
    e.stopPropagation();
  }
  if (typeof e.cancelBubble !== 'undefined') {
    e.cancelBubble = true;
  }

  // 기본 동작이 수행되지 않게 한다.
  if (typeof e.preventDefault === 'function') {
    e.preventDefault();
  }
  if (typeof e.returnValue !== 'undefined') {
    e.returnValue = false;
  }
}

document.body.innerHTML = `
  <div id="click-wrap">
    <button>Click me : 0</button>
    <button>Click me too : 0</button>
    <button>Click me three : 0</button>
  </div>
`;








