/**
 * Created by YB on 2016-10-09.
 */

function lameCSV(str) {
    var newArr = [];
    str.split('\n').forEach(function (curr) {
        newArr.push(curr.split(','));
    });
    return newArr;
}

var peopleTable = lameCSV('name,age,hair\nMerble,35,red\nBob,64,blonde');

console.log(peopleTable);

// 첫 번째 요소를 제거해주는 함수
function rest(arr) {
    return arr.splice(1);
}

function getIndexed(arr, idx) {
    return arr.map(function (curr) {
        return curr[idx];
    });
}

// 이름만 조회
function selectNames(table) {
    return rest(getIndexed(table, 0));
}

// 나이만 조회
function selectAges(table) {
    return rest(getIndexed(table, 1));
}

// 머리색만 조회
function selectHairColors(table) {
    return rest(getIndexed(table, 2));
}

console.log('이름 : ', selectNames(peopleTable));
console.log('나이 : ', selectAges(peopleTable));
console.log('헤어 : ', selectHairColors(peopleTable));








