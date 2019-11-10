const { Subject } = require('rxjs');

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
const observerC = {
    next: x => console.log(`observerC: ${x}`),
    error: e => console.error(`observerC: ${e}`),
    complete: () => console.log('observerC: complete')
};

const subject = new Subject();
subject.subscribe(observerA);
subject.subscribe(observerB);
subject.unsubscribe();
// 각각 하나씩만 남기고, 나머지 주석처리 해보세요.
// subject.subscribe(observerC);
// subject.next(1);
// subject.error('error');
// subject.complete();