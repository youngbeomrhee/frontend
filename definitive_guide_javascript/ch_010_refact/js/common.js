/**
 * Created by yblee on 2016-06-03.
 *
 * 이 프로젝트에서는 모든 html에 이 common.js를 import
 * function 선언문이 여러 파일에서 사용될 경우에 전역이 오염될 가능성이 있으므로
 * 전역에 선언되는 모든 function은 여기에 기술
 * 단, 특정 모듈에서 function이 필요한 경우에는 해당 객체의 프로퍼티로 매핑
 * (예 : com.myFunc = function(){};)
 */
function createObjException(objNm) {
    throw new Error(objNm + " already exists.");
}

function requireChk(obj, objNm) {
    if(!obj) {
        throw new Error(objNm + " has not been loaded");
    }
}