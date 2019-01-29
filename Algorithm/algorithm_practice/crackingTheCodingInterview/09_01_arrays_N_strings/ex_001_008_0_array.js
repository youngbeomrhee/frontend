
/*
M x N 행렬이라고 할때

getZeroIdx => O(MN)
zerofyRow => O(MN) 이지만 M값은 경우에 따라서 0도 될 수 있다.
zerofyColumn => O(MN) 이지만 N값은 경우에 따라서 0도 될 수 있다.
*/
function getZeroIdx(arr) {
    let zeroXIdxs = [],
        zeroYIdxs = [];

    arr.forEach((arr2, i) => {
        arr2.forEach((ele, j) => {
            if(ele===0) {
                zeroXIdxs.push(i);
                zeroYIdxs.push(j);
            }
        });
    });
    return {zeroXIdxs: zeroXIdxs, zeroYIdxs: zeroYIdxs};
}

function zerofyRow(zeroXIdxs, arr) {
    zeroXIdxs.forEach(zeroRowIdx => {
        let arrXRow = arr[zeroRowIdx];

        arrXRow.forEach((_,j) => {
            arrXRow[j] = 0;
        });
    });
}

function zerofyColumn(zeroYIdxs, arr) {
    arr.forEach((arr2, i) => {
        zeroYIdxs.forEach(zeroColIdx => {
            arr2[zeroColIdx] = 0;
        });
    });
}


function spreadZero(arr) {
    let zeroXY = getZeroIdx(arr);

    zerofyRow(zeroXY.zerofyRow, arr);
    zerofyColumn(zeroXY.zeroYIdxs, arr);

    return arr;
}

console.log(spreadZero([[1, 1, 0], [1, 1, 1], [1, 1, 1]]));
console.log(spreadZero([[1, 1, 0, 1], [1, 0, 1, 1], [1, 1, 1, 1], [1, 1, 1, 0]]));
