/**
 * Created by YB on 2016-06-02.
 *
 * com/yb/Shapes.js : 도형을 표현하는 클래스들의 모듈
 *
 * 이 모듈은 네임스페이스 com.yb.shapes 안에서 클래스를 정의한다.
 * 이 모듈은 com/yb/Class.js 모듈을 필요로 한다.
 */

// 먼저, Class 모듈을 검사한다.
var com;    // 전역 심벌의 존재 여부를 검사하기 전에 먼저 심벌을 선언한다.
if(!com || !com.yb || !com.yb.Class) {
    throw new Error("com/yb/Class.js has not been loaded");
}

// 모듈에서 심벌을 가져온다.
var define = com.yb.Class.define;

// 우리는 Class 모듈을 검사하면서 네임스페이스 com.yb이 존재한다는 사실을
// 알았기 때문에 여기서 따로 생성하지 않아도 된다.
// 따라서, 그냥 이 네임스페이스에서 도형들을 생성한다.
if(com.yb.shapes) {
    throw new Error("com.yb.shapes myNs alread exists");
}

// 네임스페이스를 생성한다.
com.yb.shapes = {};

// 이제 네임스페이스에 생성자 함수를 저장하는 클래스를 정의한다.
com.yb.shapes.Circle = define({/* 클래스 데이터 */});
com.yb.shapes.Rectangle = define({/* 클래스 데이터 */});
com.yb.shapes.Triangle = define({/* 클래스 데이터 */});