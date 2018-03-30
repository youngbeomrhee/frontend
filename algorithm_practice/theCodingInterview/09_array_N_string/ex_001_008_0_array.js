function getZeroIdx(arr) {
    let zeroIdx = [];
    arr.forEach((arr2, i) => {
        arr2.forEach((ele, j) => {
            if (ele === 0) zeroIdx.push([i, j]);
        });
    });
    return zeroIdx;
}

function spreadZero(arr) {
    let zeroXY = getZeroIdx(arr);
    zeroXY.forEach(zeroArr=>{
        let x = zeroArr[0], y = zeroArr[1];
        arr[x].forEach((_,j) => arr[x][j] = 0);
        arr.forEach(ele => ele[y] = 0);
    });
    return arr;
}

console.log(spreadZero([[1, 1, 0], [1, 1, 1], [1, 1, 1]]));
console.log(spreadZero([[1, 1, 0, 1], [1, 0, 1, 1], [1, 1, 1, 1], [1, 1, 1, 0]]));