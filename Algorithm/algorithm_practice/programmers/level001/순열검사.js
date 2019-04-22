function solution(arr) {
    var answer = true,
            arrLength = arr.length,
            testArr = [];
    // 제한사항 필터링
    if(arrLength>100000) throw Error('허용된 배열의 크기보다 큽니다.');

    // 정렬
    arr.sort();

    // 정렬한 결과 시작값과 끝값으로 실패하는 테스트 필터링
    if(arr[arrLength-1] > 100000 || arr[arrLength-1] !== arrLength) return false;
    if(arr[0] !== 1) return false;

    /*
    // 크기가 큰 배열에 대해서는 약간의 테스트를 거쳐서 필터링
    if(arrLength>10000) {
        let halfIndex = Math.floor(arrLength / 2);
        do {
            if(arr[halfIndex-1] !== halfIndex) {
                return false;
            } else {
                halfIndex = Math.floor(halfIndex / 2);
            }
        } while (halfIndex <= 1)
    }
    */

    // 중복검사
    for(var i=0; i<arr.length; i++) {
        var ele = arr[i];
        //
        if(ele !== i+1) return false;
        /*
        if(testArr.indexOf(ele)<0) {
            testArr.push(ele);
        } else {
            return false;
        }
        */
    }

    return answer;
}

console.assert(solution([4, 1, 3, 2]) === true);
console.assert(solution([4, 1, 3]) === false);
