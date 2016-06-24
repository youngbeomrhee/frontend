/**
 * Created by yblee on 2016-06-17.
 * 네임스페이스 패턴
 */

// 수정 전: 전역 변수 5개
// 경고: 안티패턴이다.

// 생성자 함수 2개
function Parent() {}
function Child() {}

// 변수 1개
var some_var = 1;

// 객체 2개
var module1 = {};
module1.data = {a: 1, b: 2};
var module2 = {};


// 수정 후: 전역 변수 1개

// 전역 객체
var MYAPP = {};

// 생성자
MYAPP.Parent = function () {};
MYAPP.Child = function () {};

// 변수
MYAPP.some_var = 1;

// 객체 컨테이너
MYAPP.modules = {};

// 객체들을 컨테이너 안에 추가한다.
MYAPP.modules.module1 = {};
MYAPP.modules.module1.data = {a: 1, b: 2};
MYAPP.modules.module2 = {};
