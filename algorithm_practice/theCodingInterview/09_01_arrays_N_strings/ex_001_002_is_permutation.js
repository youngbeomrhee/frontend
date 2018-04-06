/**
 * Created by yblee on 2018-03-30.
 */

function isPermutation(a, b) {
    if(typeof a !== 'string' || typeof b !== 'string') {
        console.log('둘 다 문자인 경우만 비교 가능합니다.');
        return false;
    }
    if(a.length !== b.length) return false;
    function orderedStr(str) {
        return str.split('').sort().join('');
    }
    return orderedStr(a) === orderedStr(b);
}

console.log(isPermutation('abcd', 'dcab'));
console.log(isPermutation('dog      ', 'gdo'));
console.log(isPermutation('dog      ', 'g      do'));

// 해법 2.

const charHashes1 = new StrHashTable(65535);
const charHashes2 = new StrHashTable(65535);

Array.isSame(charHashes1.storage, charHashes2.storage);
