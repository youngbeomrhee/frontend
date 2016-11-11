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
document.body.innerHTML = '<div class="a b c" data-a="dataA" data-b="dataB">div</div>';
var ele = document.querySelector('div');
ele.dataset
// chrome, firefox에서만..

/* 자식 node중 element node만 받기 */
document.body.children

/* contains : 부모요소에 포함되어 있는지 확인 */
document.contains(document.body);

 

