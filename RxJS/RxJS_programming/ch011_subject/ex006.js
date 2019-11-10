const { interval, Subject } = require('rxjs');
const { take } = require('rxjs/operators');

const intervalSource$ = interval(500).pipe(take(5));
const observerA = {
    next: x => console.log(`observerA: ${x}`),
    error: e => console.error(`observerA: ${e}`),
    complete: () => console.log('observerA: complete')
};
const observerB = {
    next: x => console.log(`observerB: ${x}`),
    error: e => console.error(`observerB: ${e}`),
    complete: () => console.log('observerB: complete')
};

const subject = new Subject();
subject.subscribe(observerA);
intervalSource$.subscribe({
    next: x => subject.next(x),
    error: e => subject.error(e),
    complete: () => subject.complete()
});
setTimeout(() => subject.subscribe(observerB), 2000);