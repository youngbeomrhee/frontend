const { ReplaySubject } = require('rxjs') ;
const subject = new ReplaySubject(100, 500 /* windowTime */);
const startTime = Date.now();

subject.subscribe({
    next: (v) => console.log(`observerA: ${v} : ${Date.now() - startTime} ms past`)
});

let i = 1;
setInterval(() => console.log(`# ${Date.now() - startTime} ms past`), 100);
setInterval(() => subject.next(i++), 200);

setTimeout(() => {
    subject.subscribe({
        next: (v) => console.log(`observerB: ${v} : ${Date.now() - startTime} ms past`)
    });
}, 1000);

// Logs
// observerA: 1
// observerA: 2
// observerA: 3
// observerA: 4
// observerA: 5
// observerB: 3
// observerB: 4
// observerB: 5
// observerA: 6
// observerB: 6
// ...