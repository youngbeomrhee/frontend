/**
 * Created by YB on 2016-06-02.
 * 
 */
// 전역변수는 검사하기 전에 선언해준다.
var com;
if(!com) {
    com = {};
} else {
    createObjException('com');
}