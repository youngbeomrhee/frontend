

function isEditOneNSame(a, b) {
    if(typeof a !== 'string' || typeof b !== 'string') throw '둘 다 문자열이어야 합니다';
    if(Math.abs(a.length-b.length)>1) return false;
    if(a===b) return false;

    if(a.length === b.length) {
        return isOneReplaceNSame(a, b);
    } else if(a.length > b.length) {
        return isOneRemoveNSame(a, b);
    } else{
        return isOneRemoveNSame(b, a);
    }

    let smaller = a.length<=b.length ? a : b,
        bigger = a.length<=b.length ? b : a,
        biggerArr = bigger.split('');

    smaller.split('').forEach(char=>{
        biggerArr.forEach((char2, i) => {
            if(char===char2) biggerArr.splice(i, 1);
        });
    });
    if(biggerArr.length === 1) return true;
    return false;
}

function isOneReplaceNSame(s1, s2) {
    if(typeof s1 !== 'string' || typeof s2 !== 'string') throw '둘 다 문자열이어야 합니다';
    if(s1.length !== s2.length) return false;

    let s1Arr = s1.split(''),
        s2Arr = s2.split(''),
        diffrentCount=0;

    s1Arr.forEach((char, i) => {
        if(char !== s2Arr[i]) diffrentCount++;
    });
    return diffrentCount === 1;
}

function isOneRemoveNSame(bigger, smaller) {
    if(typeof bigger !== 'string' || typeof smaller !== 'string') throw '둘 다 문자열이어야 합니다';
    if(bigger.length <= smaller.length) return false;
    if(Math.abs(bigger.length-smaller.length)>1) return false;

    let biggerArr = bigger.split(''),
        smallerArr = smaller.split(''),
        smallerIdx=0, biggerIdx=0;

    while(smallerIdx < smallerArr.length && biggerIdx < biggerArr.length) {
        if(Math.abs(biggerIdx-smallerIdx) > 1) return false;
        if(smallerArr[smallerIdx] === biggerArr[biggerIdx]) {
            smallerIdx++;
            biggerIdx++;
        } else {
            biggerIdx++;
        }
    }
    return true;
}

console.log(isEditOneNSame('pale', 'ple')===true);
console.log(isEditOneNSame('pales', 'pale')===true);
console.log(isEditOneNSame('pale', 'bale')===true);
console.log(isEditOneNSame('pale', 'bake')===false);