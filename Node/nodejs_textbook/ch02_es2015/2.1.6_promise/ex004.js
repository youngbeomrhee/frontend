/**
 * Created by whybe on 2018. 9. 17..
 */
const promise1 = new Promise((resolve, reject) => {
        setTimeout(_=>{
            console.log('성공1');
            resolve('성공1');
        }, 3000);
    }),
    promise2 = new Promise((resolve, reject) => {
        setTimeout(_=>{
            console.log('성공2');
            resolve('성공2');
        }, 2000);
    });

Promise.all([promise1, promise2])
    .then(result => {
        console.log('result ->', result);
    })
    .catch(error => {
        console.error(error);
    });