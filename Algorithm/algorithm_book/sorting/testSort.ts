import { bubbleSort, selectionSort } from './sort';

let arr, sortedArr;

arr = [5, 9, 3, 1, 2, 8, 4, 7, 6, 1];
sortedArr = bubbleSort(arr);
console.debug(sortedArr);
console.assert(sortedArr[0] === 1);
console.assert(sortedArr[sortedArr.length-1] === 9);

arr = ['a', 'c', 'f', 's', 'b', 'x', 'z', 'c'];
sortedArr = bubbleSort(arr);
console.debug(sortedArr);
console.assert(sortedArr[0] === 'a');
console.assert(sortedArr[sortedArr.length-1] === 'z');

arr = [6, 1, 7, 8, 9, 3, 5, 4, 2];
sortedArr = selectionSort(arr);
console.debug(sortedArr);
console.assert(sortedArr[0] === 1);
console.assert(sortedArr[sortedArr.length-1] === 9);

arr = ['a', 'c', 'f', 's', 'b', 'x', 'z', 'c'];
sortedArr = selectionSort(arr);
console.debug(sortedArr);
console.assert(sortedArr[0] === 'a');
console.assert(sortedArr[sortedArr.length-1] === 'z');

// arr = [5, 3, 4, 7, 2, 8, 6, 9, 1];
// sortedArr = insertionSort(arr);
// console.debug(sortedArr);
// console.assert(sortedArr[0] === 1);
// console.assert(sortedArr[sortedArr.length-1] === 9);


