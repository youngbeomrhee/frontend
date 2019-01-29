import { odd, even } from './var.js';
import { checkOddOrEven as checkNumber } from './func.js';

function checkStringOddOrEven(str) {
    if (str.length % 2) {
        return odd;
    } else {
        return even;
    }
}

console.log('checkNumber(10) ->', checkNumber(10));
console.log('checkStringOddOrEven("hello") ->', checkStringOddOrEven("hello"));




