/**
 * Created by YB on 2016-06-02.
 * ch.10.1.2 모듈로 사용되는 클래스
 *
 *  com/yb/complex.js
 *  이 모듈은 com.yb.Complex()라는 생성자 함수를 정의한다.
 *  이 모듈은 com/yb/clz.js 모듈을 필요로 한다.
 */

if(!com.yb.Complex) {
    com.yb.Complex = {};
} else {
    createObjException('com.yb.Complex');
}

// 의존성이 있는 모듈이 있는지 검사한다.
requireChk(com.yb.clz, 'com.yb.clz');

(function(){
    var Complex = com.yb.Complex;

    Complex.define({
        name: "Complex"
        , construct: function (x, y) {
            this.x = x;
            this.y = y;
        }
        , method: {
            add: function (c) {
                return new com.yb.Complex(this.x + c.x, this.y + c.y);
            }
        }
    })
})();

