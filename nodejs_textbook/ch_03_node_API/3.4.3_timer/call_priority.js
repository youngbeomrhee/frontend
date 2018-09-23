/**
 * Created by whybe on 2018. 9. 23..
 */

setTimeout(() => {
    console.log('timeout 실행');
}, 0);

setImmediate(() => {
    console.log('immediate 실행');
});

setImmediate(() => {
    console.log('immediate2 실행');
});

setTimeout(() => {
    console.log('timeout2 실행');
}, 0);
