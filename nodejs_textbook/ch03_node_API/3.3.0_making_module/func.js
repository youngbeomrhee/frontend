/**
 * Created by whybe on 2018. 9. 22..
 */
const {odd, even} = require('./var');

function checkOddOrEven(num) {
    if (num % 2) {
        return odd;
    } else {
        return even;
    }
}

module.exports = checkOddOrEven;
