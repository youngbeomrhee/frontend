/**
 * Created by whybe on 2017. 4. 7..
 */


// 유사배열
let arr = Array.of(document.getElementsByTagName('div'));
arr.__proto__.constructor;

Array.of(1);
Array.of(1,2,3);
Array.of([]);

let arr = Array.from(document.getElementsByTagName('div'));


debugger;
console.log(square(4));
var square = 0;
function square(x) {
    return x*x;
}
console.log(square);


function x() {
    console.log(arguments);
}
