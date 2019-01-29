/**
 * Created by YB on 2016-10-08.
 */

function Sandbox() {
    // arguments를 배열로 바꾼다.
    var args = Array.prototype.slice.call(arguments),
        // 마지막 인자는 콜백 함수
        callback = args.pop(),
        // 모듈은 배열로 전달할 수도 있고 개별 인자로 전달될 수도 있다.
        modules = (args[0] && typeof args[0]==='string') ? args : args[0],
        i;

    // 함수가 생성자로 호출되도록 보장한다.
    if(!(this instanceof Sandbox)) {
        return new Sandbox(modules, callback);
    }

    // this에 필요한 프로퍼티들을 추가한다.
    this.a = 1;
    this.b = 2;

    // 코어 'this' 객체에 모듈을 추가한다
    // 모듈이 없거나 '*'이면 사용 가능한 모듈을 사용한다는 의미다.
    if(!modules || modules==='*' || modules[0]==='*') {
        modules = [];
        for (i in Sandbox.modules) {
            if(Sandbox.modules.hasOwnProperty(i)) {
                modules.push(i);
            }
        }
    }

    // 필요한 모듈을 초기화한다.
    for (i = 0; i < modules.length; i++) {
        Sandbox.modules[modules[i]](this);
    }

    // 콜백 함수를 호출한다.
    callback(this);
}

// 필요한 프로토타입 프로퍼티들을 추가한다.
Sandbox.prototype = {
    name: 'My Application',
    version: '1.0',
    getName: function () {
        return this.name;
    }
};

Sandbox.modules = {};

Sandbox.modules.dom = function (box) {
    box.getElement = function () {
        console.log('getElement has called');
    };
    box.getStyle = function () {
        console.log('getStyle has called');
    };
    box.sameName = function () {
        console.log('dom.sameName has called');
    };
    box.foo = 'bar';
}

Sandbox.modules.event = function (box) {
    // 필요에 따라 다음과 같이 Sandbox 프로토타입에 접근할 수 있다.
    // box.constructor.prototype.m = 'mmm';
    box.attachEvent = function () {
        console.log('attachEvent has called');
    };
    box.detachEvent = function () {
        console.log('detachEvent has called');
    };
    box.sameName = function () {
        console.log('event.sameName has called');
    };
}

Sandbox.modules.ajax = function (box) {
    box.makeRequest = function () {
        console.log('makeRequest has called');
    };
    box.getResponse = function () {
        console.log('getResponse has called');
    };
}

Sandbox(['dom','event'], function (box) {
    box.getElement();
    box.sameName();
})

