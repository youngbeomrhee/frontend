/**
 * Created by YB on 2016-06-02.
 * 10.1.2 모듈로 사용되는 클래스
 *
 *  com/davidflanagan/Complex.js
 *  이 모듈은 com.davidflanagan.Complex()라는 생성자 함수를 정의한다.
 *  이 모듈은 com/davidflanagan/Class.js 모듈을 필요로 한다.
 */
// 먼저, Class 모듈을 검사한다.
var com;    // 전역 심벌의 존재 여부를 검사하기 전에 먼저 심벌을 선언한다.
if(!com || !com.davidflanagan || !com.davidflanagan.Class) {
    throw new Error("com/davidflanagan/Class.js has not been loaded");
}

// 우리는 이 검사를 통해 네임스페이스 com.davidflanagan이 존재한다는 사실을 알았기 때문에,
// 네임스페이스를 여기서 따로 생성할 필요는 없다.
// 그냥 이 네임스페이스 안에 Complex 클래스를 정의하고 있다.
com.davidflanagan.Complex = com.davidflanagan.Class.define({
    name: "Complex"
    , construct: function (x, y) {
        this.x = x;
        this.y = y;
    }
    , method: {
        add: function (c) {
            return new com.davidflanagan.Complex(this.x + c.x, this.y + c.y);
        }
    }
});

