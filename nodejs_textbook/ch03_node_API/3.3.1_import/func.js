/**
 * Created by whybe on 2018. 9. 22..
 */
import {odd, even} from './var.js';

function checkOddOrEven(num) {
    if (num % 2) {
        return odd;
    } else {
        return even;
    }
}

export { checkOddOrEven };