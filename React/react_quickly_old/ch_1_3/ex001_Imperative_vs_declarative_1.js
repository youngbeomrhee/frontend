/**
 * Created by whybe on 2018. 9. 16..
 */

// 명령형
const arr = [1, 2, 3, 4, 5],
    arr2 = [];

for (var i = 0; i < arr.length; i++) {
    arr2[i] = arr[i] * 2;
}

console.log('a', arr2);

// 선언형
const arr3 = arr.map(function (v) { return v * 2; });

console.log('b', arr2);

