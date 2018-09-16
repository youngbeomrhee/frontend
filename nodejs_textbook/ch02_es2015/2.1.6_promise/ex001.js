/**
 * Created by whybe on 2018. 9. 16..
 */
const condition = false,
    promise = new Promise((resolve, reject) => {
        if(condition) {
            resolve('성공');
        } else {
            reject('실패');
        }
    });

promise
    .then(message => {
        console.log(`message -> `, message);
    })
    .catch(error => {
        console.log(`error -> `, error);
    });