const { interval, Subject } = require('rxjs');
const { multicast } = require('rxjs/operators');

const source = interval(500);
const subject = new Subject();
const multicasted = source.pipe(multicast(subject));
let subscription1, subscription2, subscriptionConnect;
const startTime = Date.now();

setInterval(_ => console.log(`# ${Date.now() - startTime} ms past`), 100);

subscription1 = multicasted.subscribe({
    next: (v) => console.log(`observerA: ${v} : ${Date.now() - startTime} ms past`)
});
// We should call `connect()` here, because the first
// subscriber to `multicasted` is interested in consuming values
subscriptionConnect = multicasted.connect();

setTimeout(() => {
    subscription2 = multicasted.subscribe({
        next: (v) => console.log(`observerB: ${v} : ${Date.now() - startTime} ms past`)
    });
}, 600);

setTimeout(() => {
    subscription1.unsubscribe();
}, 1200);

// We should unsubscribe the shared Observable execution here,
// because `multicasted` would have no more subscribers after this
setTimeout(() => {
    subscription2.unsubscribe();
    subscriptionConnect.unsubscribe(); // for the shared Observable execution
}, 2000);