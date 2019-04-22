/*

*/


function isBiggerThan<T>(a: T, b: T): boolean {
    const paramType = typeof a;
    if(paramType !== 'number' && paramType !== 'string') throw Error('비교연산 가능한 타입은 Number와 String만을 대상으로 합니다.');
    return paramType === 'number' ? a > b : String.prototype.charCodeAt.call(a) > String.prototype.charCodeAt.call(b);
}

export function bubbleSort(originArr: number[] | string[]) {
    const arr = originArr.slice();
    function compareReplace(arr: number[] | string[], left: number, right: number): void {
        const leftIdx = left-1,
            rightIdx = right-1,
            leftEle = arr[leftIdx],
            rightEle = arr[rightIdx];

        // 왼쪽에 있는 요소와 오른쪽에 있는 요소를 비교해서 왼쪽이 더 크면 두 개를 바꾼다
        if(isBiggerThan(leftEle, rightEle)) {
            arr[leftIdx] = rightEle;
            arr[rightIdx] = leftEle;
        }
    }

    const n = arr.length;

    // O(n)
    for(let j=1; j<=n; j++) {
        for (let i=n; i>j; i--) {
            compareReplace(arr, i-1, i);
        }
    }
    return arr;
}

export function selectionSort(originArr: number[]) {
    const arr = originArr.slice();

    function findMinimumIndex(arr: number[], startIdx) {
        let minimum = arr[startIdx],
            minIdx = 0;
        for (let i = startIdx + 1; i < arr.length; i++) {
            const temp = arr[i];
            if (minimum > temp) {
                minimum = temp;
                minIdx = i;
            }
        }
        return minIdx
    }

    // 수열을 선행 탐색하며 최솟값을 찾아서 행의 시작점과 교환
    // 시작점의 위치를 하나 늘린 후 같은 일을 반복
    for (let startIdx = 0; startIdx < arr.length; startIdx++) {
        let minIdx = findMinimumIndex(arr, startIdx),
            startVal = arr[startIdx],
            minVal = arr[minIdx];

        // 시작점보다 오른쪽에 최솟값이 있으면 시작점의 값과 최솟값을 교체
        if(minIdx > startIdx) {
            arr[startIdx] = minVal;
            arr[minIdx] = startVal;
        }
    }
    return arr;
}

// export function insertionSort(arr: number[], )
