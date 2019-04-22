import { binarySearch } from './search';

// 종단점 테스트 (값이 없는 경우)
(() => {
    console.debug('\n종단점 테스트 1: 값이 없는 경우');
    const arr = [1, 2, 3, 4, 5];
    let endFlag = false;

    if(binarySearch(arr, 7) === true || binarySearch(arr, 7) === false) {
        endFlag = true;
    };
    setTimeout(() => {
        if(!endFlag) {
            throw Error('종단점이 제대로 설정되지 않았습니다');
        } else {
            console.debug('종단점이 제대로 설정됐습니다.');
        }
    }, 1000);

})();

// 종단점 테스트 (값이 없는 경우2)
(() => {
    console.debug('\n종단점 테스트 2: 값이 없는 경우');
    const arr = [1, 2, 3, 4, 5];
    let endFlag = false;

    if(binarySearch(arr, 7) === true || binarySearch(arr, 7) === false) {
        endFlag = true;
    };
    setTimeout(() => {
        if(!endFlag) {
            throw Error('종단점이 제대로 설정되지 않았습니다');
        } else {
            console.debug('종단점이 제대로 설정됐습니다.');
        }
    }, 1000);

})();

// 종단점 테스트 (값이 있는 경우1)
(() => {
    console.debug('\n종단점 테스트 1: 값이 있는 경우');
    const arr = [1, 2, 3, 4, 5];
    let endFlag = false;

    if(binarySearch(arr, 7) === true || binarySearch(arr, 7) === false) {
        endFlag = true;
    };
    setTimeout(() => {
        if(!endFlag) {
            throw Error('종단점이 제대로 설정되지 않았습니다');
        } else {
            console.debug('종단점이 제대로 설정됐습니다.');
        }
    }, 1000);

})();

// 종단점 테스트 (값이 있는 경우2)
(() => {
    console.debug('\n종단점 테스트 2: 값이 있는 경우');
    const arr = [1, 2, 3, 4, 5];
    let endFlag = false;

    if(binarySearch(arr, 7) === true || binarySearch(arr, 7) === false) {
        endFlag = true;
    };
    setTimeout(() => {
        if(!endFlag) {
            throw Error('종단점이 제대로 설정되지 않았습니다');
        } else {
            console.debug('종단점이 제대로 설정됐습니다.');
        }
    }, 1000);

})();

const arr = [1, 5, 8, 9, 11, 13, 15, 19, 21];


// 값이 있는 경우에 대한 테스트
console.assert(binarySearch(arr, 9) === true);
console.assert(binarySearch([1, 2, 3, 4, 5], 2) === true);

// 값이 없는 경우에 대한 테스트
console.assert(binarySearch([1, 2, 3, 4, 5], -1) === false);
console.assert(binarySearch([1, 2, 3, 4, 5], 100) === false);






