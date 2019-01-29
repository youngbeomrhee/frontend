/**
 * Created by YB on 2016-09-24.
 * http://yui.github.io/yuidoc/ 참고
 *  1. Download and install Node.js
 *  2. Run npm -g install yuidocjs.
 *  3. Run yuidoc . at the top of your JS source tree.
 */
/**
 * 나의 자바스크립트 애플리케이션
 * @module myapp
 */
var MYAPP2 = {};

/**
 * 수학 계산 유틸리티
 * @namespace MYAPP2
 * @class math_stuff
 */
MYAPP2.math_stuff = {
    /**
     * 두 숫자를 더한다.
     *
     * @method sum
     * @param {Number} a 첫번째 숫자
     * @param {Number} b 두번째 숫자
     * @return {Number} 두숫자를 더한 값
     */
    sum: function (a,b) {
        return a+b;
    },
    /**
     * 두 숫자를 곱한다.
     *
     * @method multi
     * @param {Number} a 첫번째 숫자
     * @param {Number} b 두번째 숫자
     * @return {Number } 두 숫자를 곱한 값
     */
    multi: function (a,b) {
        return a*b;
    }
};

/**
 * Person 객체를 생성한다.
 * @class Person
 * @constructor
 * @namespace MYAPP2
 * @param {String} first 이름
 * @param {String} last 성
 */
MYAPP2.Person = function(first, last) {
    /**
     * 사람의 이름
     * @property first_name
     * @type String
     */
    this.first_name = first;
    /**
     * 사람의 성
     * @property last_name
     * @type String
     */
    this.last_name = last;
};

/**
 * person 객체의 성명을 반환한다.
 *
 * @method getName
 * @return {String} 사람의 성명
 */
MYAPP2.Person.prototype.getName = function (){
    return this.first_name + '' + this.last_name;
};