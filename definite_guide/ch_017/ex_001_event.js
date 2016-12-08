/**
 * Created by yblee on 2016-12-08.
 */

// 이벤트 핸들러가 등록된 element에 새로운 핸들러를 추가하는 방법
document.body.innerHTML = `<div onclick="console.log('default event handler has called')">Click me</div>`;
var oldEveHandle = document.querySelector('div').onclick;
document.querySelector('div').onclick = function () { oldEveHandle(); console.log('event handler added has called') };


