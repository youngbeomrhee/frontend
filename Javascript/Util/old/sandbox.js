/**
 * Created by yblee on 2016-06-14.
 */

function Sandbox() {
    "use strict";
    // arguments를 배열로 바꾼다.
    var args = Array.prototype.slice.call(arguments),
        callback = args.pop(),
        modules = (args[0] && typeof args[0] === 'string') ? args : args[0],
        i;

    // 함수가 생성자로 호출되도록 보장(new를 강제하지 않는 패턴)
    if(!(this instanceof Sandbox)) {
        return new Sandbox(modules, callback);
    }

    // this에 필요한 프로퍼티들을 추가
    this.a = 1;
    this.b = 2;

    // "this객체에 모듈을 추가"
    // 모듈이 없거나 "*"(전부)이면 사용 가능한 모든 모듈을 사용한다는 의미입니다.
    if(!modules || modules === '*' || modules[0] === '*') {
        modules = [];
        for (i in Sandbox.Modules) {
            if(Sandbox.modules.hasOwnProperty(i)) {
                modules.push(i);
            }
        }
    }

    // 필요한 모듈들을 초기화
    var m_length = modules.length;
    for (i = 0; i < m_length; i++) {
        Sandbox.modules[modules[i]](this);
    }

    // 콜백 함수 호출
    callback(this);
}

// 필요한 프로토타입 프로퍼티들을 추가
Sandbox.prototype = {
    name: "nextree",
    getName: function () {
        return this.name;
    }
};

Sandbox('ajax', 'dom', function (box) {
    console.log(box);
});