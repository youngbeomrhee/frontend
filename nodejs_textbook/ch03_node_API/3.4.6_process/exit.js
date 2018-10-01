/**
 * Created by whybe on 2018. 9. 24..
 */
let i = 5;

setInterval(() => {
    if(i === 0) {
        console.log('종료!');
        process.exit();
    }
    console.log(i);
    i -= 1;
}, 1000);