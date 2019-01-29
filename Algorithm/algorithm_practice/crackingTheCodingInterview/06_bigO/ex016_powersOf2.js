/**
 * Created by whybe on 2018. 3. 23..
 */
function powersOf2(n) {
    if(n<1) return 0;
    else if (n===1) {
        console.log(1);
        return 1;
    } else {
        let prev = powersOf2(n/2);
        let curr = prev * 2;
        console.log(curr);
        return curr;
    }
}