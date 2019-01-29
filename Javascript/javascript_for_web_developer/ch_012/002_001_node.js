/**
 * Created by YB on 2016-11-19.
 */

/* NodeIterator */

document.body.innerHTML =
    `<div id="div">
        <p><b>Hello</b> world!</p>
        <ul>
            <li>List item1</li>
            <li>List item2</li>
            <li>List item3</li>
        </ul>    
    </div>
    `;


var div = document.querySelector('div');
var iterator = document.createNodeIterator(div, NodeFilter.SHOW_ELEMENT, null, false);

var node = iterator.nextNode();
while(node !== null) {
    console.log(node.tagName);
    node = iterator.nextNode();
}

/* li 요소만 방문 */
var filter = function (node) {
    return node.tagName.toLowerCase() === 'li' ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP;
};

var iterator = document.createNodeIterator(div, NodeFilter.SHOW_ELEMENT, filter, false);

var node = iterator.nextNode();
while(node !== null) {
    console.log(node);
    node = iterator.nextNode();
}

/* 범용적으로 바꾸기 */
var genFilter = function (eleName) {
    return function (node) {
        return node.tagName.toLowerCase() == eleName ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP;
    };
};

var liFilter = genFilter('li');

var iterator = document.createNodeIterator(div, NodeFilter.SHOW_ELEMENT, liFilter, false);

var node = iterator.nextNode();
while(node !== null) {
    console.log(node);
    node = iterator.nextNode();
}



/* TreeWalker */
// NodeIterator를 만들때와 동일한 파라미터를 가짐
var walker = document.createTreeWalker(div, NodeFilter.SHOW_ELEMENT, liFilter, false);

// 대체 가능
var node = walker.nextNode();
while(node !== null) {
    console.log(node);
    node = walker.nextNode();
}
// 차이점은 필터에 NodeFilter.FILTER_REJECT로 해당 노드 및 전체 서브트리를 건너뛸 수 있음

// 가장 큰 장점은 Tree내의 자유로운 이동
var div = document.getElementById('div1');
var walker = document.createTreeWalker(div, )

