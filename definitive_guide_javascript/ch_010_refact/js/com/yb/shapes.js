/**
 * Created by YB on 2016-06-02.
 *
 * com/yb/Shapes.js : 도형을 표현하는 클래스들의 모듈
 *
 * 이 모듈은 네임스페이스 com.yb.shapes 안에서 클래스를 정의한다.
 * 이 모듈은 com/yb/Class.js 모듈을 필요로 한다.
 */

if(!com.yb.shapes) {
    com.yb.shapes = {};
} else {
    createObjException('com.yb.shapes');
}

// 먼저, com.yb.clz 모듈이 있는지 검사한다.
requireChk(com.yb.clz, 'com.yb.clz');

// 모듈에서 심벌을 가져온다.
(function(){
    var define = com.yb.clz.define;

    // 이제 네임스페이스에 생성자 함수를 저장하는 클래스를 정의한다.
    com.yb.shapes.Circle = define({/* 클래스 데이터 */});
    com.yb.shapes.Rectangle = define({/* 클래스 데이터 */});
    com.yb.shapes.Triangle = define({/* 클래스 데이터 */});
})();
