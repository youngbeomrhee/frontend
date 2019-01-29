/**
 * Created by YB on 2016-10-09.
 */


function fail(thing) {
    throw new Error('[ERROR] ' + thing);
}

function isIndexed(data) {
    return Array.isArray(data) || typeof data === 'string';
}

function nth(arr, index) {
    if(typeof index !== 'number') fail('Expected a number as index');
    if(!isIndexed(arr)) fail('Not supported on non-indexed type');
    if(index < 0 || index > arr.length-1) fail('Index value is out of bounds');

    return arr[index];
}

console.log(nth('letters', 2));
// console.log(nth({}, 2));
// console.log(nth('letters', 100));
// console.log(nth('letters', 'aaa'));

