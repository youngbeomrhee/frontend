/*
function isRotation(originStr, subStr) {
    if(typeof originStr !== 'string' || typeof subStr !== 'string') throw '비교할 대상은 둘 다 문자열이어야 합니다';
    let allMatch = false,
        isDone = false,
        tryCnt = 0,
        rotateStr = subStr;
    while(true) {
        tryCnt++;
        if(tryCnt>subStr.length) break;
        rotateStr = rotateStr.substr(1) + rotateStr.substr(0, 1);
        if(originStr.indexOf(rotateStr)>-1) {
            allMatch = true;
            break;
        }
    }
    return allMatch;
}
*/
function isSubstring(subStr, originStr) {
    if(typeof originStr !== 'string' || typeof subStr !== 'string') throw '비교할 대상은 둘 다 문자열이어야 합니다';
    return originStr.indexOf(subStr)>-1;
}

function isRotation(originStr, subStr) {
    if(typeof originStr !== 'string' || typeof subStr !== 'string') throw '비교할 대상은 둘 다 문자열이어야 합니다';

    return isSubstring(originStr, subStr+subStr);
}


console.log(isRotation('waterbottle','erbottlewat'));   // true
console.log(isRotation('waterbottle','erbottlewait'));   // false
console.log(isRotation('waterbottle','erbottlewat'));   // true
console.log(isRotation('가나다라마','라마가나다'));   // true
console.log(isRotation('가나다라마','람마가나다'));   // false