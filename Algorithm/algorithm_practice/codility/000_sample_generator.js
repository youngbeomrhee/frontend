function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function fillIntArray(arr, min, max) {
    for (let i = 0; i < arr.length; i++) {
        arr[i] = getRandomInt(min, max);
    }
    return arr;
}


const N = getRandomInt(0, 100),
    // M = getRandomInt(1, 100000),   // 배열의 크기
    A = fillIntArray(Array(100), 0, 100);



console.log(N, A);

/*

먼저 구현하자
샘플 데이터를 통해 규칙을 도출하자
 */
