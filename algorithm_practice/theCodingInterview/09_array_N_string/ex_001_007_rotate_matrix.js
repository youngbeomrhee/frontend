/*
00 01 02 03
10 11 12 13
20 21 22 23
30 31 32 33

30 20 10 00
31 21 11 01
32 22 12 02
33 23 13 03
*/
function showMatrix(matrix) {
    matrix.forEach(row=>{
        console.log(row);
    });
}

function rotate(matrix) {
    if(!Array.isArray(matrix) || matrix.length !== matrix[0].length) throw 'NxN 행렬만 입력 가능합니다.';
    let n = matrix.length;
    console.log('## 최초의 matrix');
    showMatrix(matrix);
    for (let layer = 0; layer < n/2; layer++) {
        let first = layer,
            last = n-1-layer;
        for (let i = first; i < last; i++) {
            let offset = i-first,   // 처음에 주어진 위치와 이동할 위치의 변위차
                top = matrix[first][i]; // top값을 저장
            console.log(`# ${i}번 시작 offset : ${offset}`);
            console.log(`# top = matrix[${first}][${i}]`);

            // left -> top
            console.log(` // left 행의 인자를 -> top 행의 인자로 이동`);
            console.log(`matrix[${first}][${i}] = matrix[${last}-${offset}][${first}];`);
            matrix[first][i] = matrix[last-offset][first];
            showMatrix(matrix);

            // bottom -> left
            console.log(` // bottom 행의 인자를 -> left 행의 인자로 이동`);
            console.log(`matrix[${last}-${offset}][${first}] = matrix[${last}][${last}-${offset}];`);
            matrix[last - offset][first] = matrix[last][last - offset];
            showMatrix(matrix);

            // right -> bottom
            console.log(` // right 행의 인자를 -> bottom 행의 인자로 이동`);
            console.log(`matrix[${last}][${last}-${offset}] = matrix[${i}][${last}];`);
            matrix[last][last-offset] = matrix[i][last];
            showMatrix(matrix);

            // top -> right
            console.log(` // top 행의 인자를 -> right 행의 인자로 이동`);
            console.log(`matrix[${i}][${last}] = ${top};`);
            matrix[i][last] = top;  // right <- saved top
            showMatrix(matrix);
        }
    }
    return matrix;
}

console.log('#### 2x2 행렬');
let matrix2 = [
    ['00', '01']
    ['10', '11']
];
rotate(matrix2);
console.log('### 이동완료');
showMatrix(matrix2);


console.log('#### 3x3 행렬');
let matrix3 = [
    ['00', '01', '02'],
    ['10', '11', '12'],
    ['20', '21', '22']
];
rotate(matrix3);
console.log('### 이동완료');
showMatrix(matrix3);


console.log('#### 4x4 행렬');
let matrix4 = [
    ['00', '01', '02', '03'],
    ['10', '11', '12', '13'],
    ['20', '21', '22', '23'],
    ['30', '31', '32', '33']
];
rotate(matrix4);
console.log('### 이동완료');
showMatrix(matrix4);
