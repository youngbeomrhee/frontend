/**
 * Created by yblee on 2016-06-17.
 * 모듈 패턴
 */

var myNs = (function () {

    // defined within the local scope
    var privateMethod1 = function () { console.log('privateMethod1 has called'); };
    var privateMethod2 = function () { console.log('privateMethod2 has called'); };
    var privateProperty1 = 'foobar';

    // 공개할 영역
    return {
        // 외부에 공개할 메서드를 매핑한다.
        publicMethod1: privateMethod1,
        properties:{
            publicProperty1: privateProperty1
        },
        utils:{
            publicMethod2: privateMethod2
        }
    };
})();

myNs.publicMethod1();
myNs.utils.publicMethod2();
console.log(myNs.properties.publicProperty1);