/**
 * Created by YB on 2016-11-12.
 */

/* HTML5 css 핸들링의 간소화 */
document.body.innerHTML = '<div class="a b c">div</div>';
var ele = document.querySelector('div');
ele.classList.remove('b');
ele.classList.add('b');
ele.classList.toggle('c');
ele.classList.toggle('c');
ele.classList.contains('c');

/* 포커스 관리 */
document.activeElement;

/* 커스텀 데이터 속성 */
document.body.innerHTML = '<div class="a b c" data-a="dataA" data-b="dataB" data-x="dataX">div</div>';
var ele = document.querySelector('div');
ele.dataset
// chrome, firefox에서만..


/* outerHTML */
document.body.innerHTML = '<div id="outerDiv"><div id="innerDiv">inner/outer HTML</div></div>';
var ele = document.querySelector('#outerDiv');
console.log(`ele.innerHTML : ${ele.innerHTML}`);
console.log(`ele.outerHTML : ${ele.outerHTML}`);
// IE 4+, Safari 4+, Chrome,Opera 8+, Firefox x

/* scrollIntoView */
document.body.innerHTML =
    `<div style="height:2000px;font-size: 300px;text-align:center;">
        <div id="div1" style="height:500px;outline:1px solid black;display:table;width: 100%;"><div style="display:table-cell;vertical-align:middle;height: 400px;">1</div></div>
        <div id="div2" style="height:500px;outline:1px solid black;display:table;width: 100%;"><div style="display:table-cell;vertical-align:middle;height: 400px;">2</div></div>
        <div id="div3" style="height:500px;outline:1px solid black;display:table;width: 100%;"><div style="display:table-cell;vertical-align:middle;height: 400px;">3</div></div>
        <div id="div4" style="height:500px;outline:1px solid black;display:table;width: 100%;"><div style="display:table-cell;vertical-align:middle;height: 400px;">4</div></div>
        <div id="div5" style="height:500px;outline:1px solid black;display:table;width: 100%;"><div style="display:table-cell;vertical-align:middle;height: 400px;">5</div></div>
    </div>`;

document.querySelector('#div3').scrollIntoView();
document.querySelector('#div2').scrollIntoView();
document.querySelector('#div4').scrollIntoView();

    /* 자식 node중 element node만 받기 */
document.body.children

/* contains : 부모요소에 포함되어 있는지 확인 */
document.contains(document.body);

