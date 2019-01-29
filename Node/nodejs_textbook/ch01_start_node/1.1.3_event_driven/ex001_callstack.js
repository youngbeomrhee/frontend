/**
 * Created by whybe on 2018. 9. 16..
 */
function first () {
    second();
    console.log('첫 번째');
}
function second () {
    third();
    console.log('두 번째');
}
function third () {
    console.log('세 번째');
}
first();

/*
 세 번째
 두 번째
 첫 번째
*/