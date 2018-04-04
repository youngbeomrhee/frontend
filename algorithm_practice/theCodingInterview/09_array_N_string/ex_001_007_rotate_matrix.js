/*

해당 알고리즘은 layer를 설정하고 한 쪽의 모서리를 기준으로 하나씩 이동시켜서 처리한다
예를 들어서 아래와 같은 행렬이 있을때,

00 01 02 03
10 11 12 13
20 21 22 23
30 31 32 33

아래와 같이 1번 layer는 4개의 영역으로 구분된다

# top
00 01 02 03

# left
00
10
20
30

# bottom
30 31 32 33

# right
03
13
23
33

그리고 기준점은 아래와 같이 잡는다

top : 00
left : 30
bottom : 33
right : 03

그리고 2번 layer는 아래와 같이 되고 위의 로직을 반복한다.
11 12
21 22

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
            let offset = i-first,   // offset : 기준점과의 거리. 기준점은 네 모퉁이.
                top = matrix[first][i], // top값을 저장
                left = matrix[last-offset][first],
                bottom = matrix[last][last - offset],
                right = matrix[i][last];

            console.log(`# layer(${layer}번 layer)의 i(${i}) 번째 요소를 선택. offset : ${offset}, first : ${first}, last : ${last}`);
            console.log(`이동할 대상 : 
    top = matrix[first][i] = matrix[${first}][${i}] = ${top}, 
    left = matrix[last-offset][first] = matrix[${last}-${offset}][${first}] = ${left},
    bottom = matrix[last][last - offset] = matrix[${last}][${last}-${offset}] = ${bottom},
    right = matrix[i][last]] = matrix[${i}][${last}] = ${right}`);
            // left -> top
            console.log(`action => left layer의 인자(${left})를 -> top 행의 위치(matrix[${first}][${i}]})로 이동`);
            // console.log(`matrix[${first}][${i}] <- matrix[${last}-${offset}][${first}];`);
            matrix[first][i] = left;
            showMatrix(matrix);

            // bottom -> left
            console.log(`action => bottom layer의 인자(${bottom})를 -> left 행의 위치(matrix[${last-offset}][${first}]})로 이동`);
            // console.log(`matrix[${last}-${offset}][${first}] = matrix[${last}][${last}-${offset}];`);
            matrix[last - offset][first] = bottom;
            showMatrix(matrix);

            // right -> bottom
            console.log(`action => right layer의 인자(${right})를 -> bottom 행의 위치(matrix[${last}][${last - offset}]})로 이동`);
            // console.log(`matrix[${last}][${last}-${offset}] = matrix[${i}][${last}];`);
            matrix[last][last-offset] = right;
            showMatrix(matrix);

            // top -> right
            console.log(`action => top layer의 인자(${top})를 -> right 행의 위치(matrix[${i}][${last}]})로 이동`);
            // console.log(`matrix[${i}][${last}] = ${top};`);
            matrix[i][last] = top;  // right <- saved top
            showMatrix(matrix);
        }
    }
    return matrix;
}

console.log('#### 2x2 행렬');
let matrix2 = [
    ['0,0', '0,1'],
    ['1,0', '1,1']
];
rotate(matrix2);
console.log('### 이동완료');
showMatrix(matrix2);
console.log('\n');


console.log('#### 3x3 행렬');
let matrix3 = [
    ['0,0', '0,1', '0,2'],
    ['1,0', '1,1', '1,2'],
    ['2,0', '2,1', '2,2']
];
rotate(matrix3);
console.log('### 이동완료');
showMatrix(matrix3);
console.log('\n');


console.log('#### 4x4 행렬');
let matrix4 = [
    ['0,0', '0,1', '0,2', '0,3'],
    ['1,0', '1,1', '1,2', '1,3'],
    ['2,0', '2,1', '2,2', '2,3'],
    ['3,0', '3,1', '3,2', '3,3']
];
rotate(matrix4);
console.log('### 이동완료');
showMatrix(matrix4);
