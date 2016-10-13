/**
 * Created by yblee on 2016-06-17.
 * 모듈 패턴
 */

// 원래는 함수를 통해 네임스페이스 생성
// MYAPP.namespace('MYAPP.utilities.Array');
var MYAPP = {};
MYAPP.utilities = {};

MYAPP.utilities.Array = (function () {
    // 의존 관계 선언
    var uobj = MYAPP.utilities.object,
        ulang = MYAPP.utilities.lang,
    // 비공개 프로퍼티와 메서드들을 선언한 후...
        Constr;

    // 필요한 경우 일회성 초기화 절차를 실행
    // ...

    // 공개 API - 생성자 함수
    Constr = function (o) {
        this.elements = this.toArray(o);
    }

    // 공개 API - 프로토타입
    Constr.prototype = {
        constructor: MYAPP.utilities.Array,
        version: "2.0",
        toArray: function (obj) {
            for (var i = 0, a=[], len=obj.length; i < len; i++) {
                a[i] = obj[i];
            }
            return a;
        }
    };

    // 생성자 함수를 반환한다. 이 함수가 새로운 네임스페이스에 할당될 것이다.
    return Constr;
}());

var arr = new MYAPP.utilities.Array([1,2,3]);
console.dir(arr);
console.dir(new MYAPP.utilities.Array('string'));