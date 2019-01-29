/**
 * Created by YB on 2016-06-04.
 */

/* p.17. 단일 var 패턴 */
function a() {
    var a= 1,
        b= 2,
        sum  = a + b,
        myObject = {},
        i,
        j
    ;
}

var myArray = [];

// 이 패턴의 문제는 루프 순회시마다 배열의 length에 접근한다는 점이다.
// 접근 대상이 HTMLCollection이라면 이 때문에 코드가 느려질 수 있다.
// 일반적으로 DOM 접근은 비용이 크다.
for (var i = 0; i < myArray.length; i++) {
    // myArray[i] 를 다루는 로직
}

// 아래와 같이 length를 캐쉬한다.
// HTMLCollection를 순회할 때, length를 캐쉬하면,
// 사파리3에서 2배, IE7에서 190배에 이르기까지 모든 브라우져에서 속도가 향상된다.
for (var i = 0, max = myArray.length; i < max; i++) {
    // myArray[i] 를 다루는 로직
}





