/**
 * Created by whybe on 2018. 3. 24..
 */

let numChars = 26;  // c

function printSortedStrings(remaining, prefix) {
    if(remaining === 0) {
        if(isInOrder(prefix)) {
            console.log(prefix);
        }
    } else {
        let i=0
        for(; i < numChars; i++) {
            let c = ithLetter(i);
            printSortedStrings(remaining - 1, prefix + c);
        }
    }
}

function isInOrder(s) {
    let i=1;
    for (; i < s.length; i++) {
        let prev = ithLetter(s[i - 1]),
            curr = ithLetter(s[i]);
        if(prev > curr) return false;
    }
    return true;
}

function ithLetter(i) {
    return String.fromCharCode('a'.charCodeAt() + i);
}

printSortedStrings(3, "");
