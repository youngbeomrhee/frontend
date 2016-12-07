/**
 * Created by yblee on 2016-12-06.
 */

/* DOM 접근은 비용이 비싸다. 접근 최소화 */
// 안티패턴
for (var i = 0; i < 100; i++) {
  document.getElementById('result').innerHTML += i + ', ';
}

// 지역 변수를 활용하는 개선안
var i, content = '';
for (var j = 0; j < 100; j++) {
  content += i + ', ';
}
document.getElementById('result').innerHTML += content;


// 안티패턴
var padding = document.getElementById('result').style.padding,
  margin = document.getElementById('result').style.margin;

// 개선안
var style = document.getElementById('result').style,
  padding = style.padding,
  margin = style.margin;

// Selector 사용 권장
// id 지정 권장(가장 빠른 방법)


/* DOM 조작 역시 비용이 비싸다 */
// 변경 사항들을 일괄 처리하거나, 실제 문서 트리 외부에서 변경 작업을 수행해야 한다.

// 안티패턴
var p, t, p2, t2;

p = document.createElement('p');
t = document.createTextNode('first paragraph');
p.appendChild(t);

document.body.appendChild(p);

p2 = document.createElement('p');
t2 = document.createTextNode('second paragraph');
p2.appendChild(t2);

document.body.appendChild(p2);


// 개선안
var p, t, p2, t2, frag;

frag = document.createDocumentFragment();

p = document.createElement('p');
t = document.createTextNode('first paragraph');
p.appendChild(t);
frag.appendChild(p);

p2 = document.createElement('p');
t2 = document.createTextNode('second paragraph');
p2.appendChild(t2);
frag.appendChild(p2);

document.body.appendChild(frag);


// 문서에 이미 존재하는 트리를 변경할때
document.body.innerHTML = '<p id="result">Old node</p>';
var oldNode = document.getElementById('result'),
  clone = oldNode.cloneNode(true);

// 복제본을 가지고 변경 작업을 처리한다.
clone.innerHTML = 'New node';

// 변경이 끝나고 나면 원래의 노드와 교체한다.
oldNode.parentNode.replaceChild(clone, oldNode);





