/**
 * Created by YB on 2016-12-10.
 */

/* eventPhase : event bubbling, capturing */
// https://developer.mozilla.org/en-US/docs/Web/API/Event/eventPhase

document.body.innerHTML = '<input type="button" value="Click me" onclick="debugger;">'

// this.value 와 value

// 이벤트 처리기의 scope
document.body.innerHTML =
    `<form method="post">
        <input type="text" name="username" value="">
        <input type="button" value="Echo Username" onclick="alert(username.value)">
     </form>   
    `


//
var obj = {
    a1: 1,
    a2: function() { debugger; }
};

obj.a2();

// 해당 함수 내에서 a1을 호출하는 방법

with(document) {
    with(obj) {
        console.log(a1);
    }
}



// 크로스 브라우저 이벤트 핸들러
var EventUtil = {
    addHandler: function (element, type, handler) {
        if (element.addEventListener) {
            element.addEventListener(type, handler, false);
        } else if (element.attachEvent) {
            element.attachEvent('on' + type, handler);
        } else {
            if(typeof element['on' + type] === 'function') {
                var oldHandler = element['on' + type];
                element['on' + type] = function() {
                    oldHandler();
                    handler();
                }
            } else {
                element['on' + type] = handler;
            }
        }
    },
    removeHandler: function (element, type, handler) {
        if (element.removeEventListener) {
            element.removeEventListener(type, handler, false);
        } else if (element.detachEvent) {
            element.detachEvent('on' + type, handler);
        } else {
            element["on" + type] = null;
        }
    }
}