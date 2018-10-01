/**
 * Created by whybe on 2018. 9. 22..
 */
const { odd, even } = require('./var'),
    checkNumber = require('./func');

function checkStringOddOrEven(str) {
    if (str.length % 2) {
        return odd;
    } else {
        return even;
    }
}

console.log('checkNumber(10) ->', checkNumber(10));
console.log('checkStringOddOrEven("hello") ->', checkStringOddOrEven("hello"));
