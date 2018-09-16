/**
 * Created by whybe on 2018. 9. 16..
 */
const condition = true,
    promise = new Promise((resolve, reject) => {
        if(condition) {
            setTimeout(function () {
                resolve('resolve');
            }, 1000);
        } else {
            setTimeout(function () {
                reject('reject');
            }, 1000);
        }
    });

console.log(`프로그램 시작`);
promise
    .then(message => {
        console.log(`message -> `, message);
    })
    .catch(error => {
        console.log(`error -> `, error);
    });
console.log(`프로그램 끝`);