/**
 * Created by yblee on 2016-06-17.
 * 모듈 패턴
 */

var myNs;

(function () {

    // 비공개 멤버
    var privateName = 'foobar';

    // 공개될 부분을 구현한다.
    myNs = {
        // 특권 메서드
        getName: function () {
            return privateName;
        }
    };
})();

console.log(myNs.getName());
console.log(myNs.privateName);