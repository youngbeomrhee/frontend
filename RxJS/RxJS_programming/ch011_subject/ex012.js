const { BehaviorSubject } = require('rxjs');

const behaviorSubject = new BehaviorSubject('초기값');
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
behaviorSubject.subscribe(observerA);
behaviorSubject.next('값1');
console.log('');
behaviorSubject.subscribe(observerB);
behaviorSubject.next('값2');
console.log('');
behaviorSubject.subscribe(observerC);
behaviorSubject.next('값3');
console.log('');
behaviorSubject.next('값4');
console.log('');
behaviorSubject.next('값5');