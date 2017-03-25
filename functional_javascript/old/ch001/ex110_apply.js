/**
 * Created by YB on 2016-10-09.
 */
// 간단한 apply 예제
function splat(func) {
    return function (array) {
        return func.apply(null, array);
    };
}

var addArrayElements = splat(function (x, y) {
    return x + y;
});

console.log(addArrayElements([1, 2]));

// 유사배열의 요소를 완전한 배열로 변환하는 함수
function toArray(arrLike) {
    var onlyArray = [];
    for (var prop in arrLike) {
        if(arrLike.hasOwnProperty(prop)) {
            onlyArray.push(arrLike[prop]);
        }
    }
    return onlyArray;
}

function unsplat(func) {
    return function () {
        // return func.call(null, Array.from(arguments));
        return func.call(null, toArray(arguments));
    };
}

var joinElements = unsplat(function (array) {
    return array.join(' ');
});

console.log(joinElements(1, 2));

console.log(joinElements('-', '$', '/', '!', ':'));









