/**
 * Created by whybe on 2018. 9. 23..
 */
setTimeout(() => {
    console.log('timeout');
}, 0);

process.nextTick(() => {
   console.log('nextTick');
});

setImmediate(() => {
    console.log('immediate');
});

Promise.resolve().then(() => console.log('promise'));

console.log('# process.nextTick과 resolve 된 promise는 다른 콜백들보다 우선시 된다.\n그래서 이 둘을 microtask라고 따로 구분짓는다.');