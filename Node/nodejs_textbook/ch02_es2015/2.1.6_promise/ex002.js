/**
 * Created by whybe on 2018. 9. 16..
 */
const condition = true,
    promise = new Promise((resolve, reject) => {
        if(condition) {
            resolve('resolve');
        } else {
            reject('실패');
        }
    });

let date = new Date();
console.log(`start -> ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}.${date.getMilliseconds()}`);

promise
    .then(message => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const date = new Date();
                resolve(`${message} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}.${date.getMilliseconds()}`);
            }, 1000);
        });
    })
    .then(message => {
        console.log(`message1 -> ${message}`);
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const date = new Date();
                resolve(`${message} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}.${date.getMilliseconds()}`);
            }, 2000);
        });
    })
    .then(message => {
        const date = new Date();
        console.log(`message2 -> ${message}`);
    })
    .catch(error => {
        console.log(`error -> ${error}`);
    });
date = new Date();
console.log(`end -> ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}.${date.getMilliseconds()}`);
