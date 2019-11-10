const { Observable, asyncScheduler } = require('rxjs');
const { observeOn } = require('rxjs/operators');

var observable = new Observable((proxyObserver) => {
    proxyObserver.next(1);
    proxyObserver.next(2);
    proxyObserver.next(3);
    proxyObserver.complete();
}).pipe(
    observeOn(asyncScheduler)
);

var finalObserver = {
    next(x) {
        console.log('got value ' + x);
    },
    error(err) {
        console.error('something wrong occurred: ' + err);
    },
    complete() {
        console.log('done');
    }
};

console.log('just before subscribe');
observable.subscribe(finalObserver);
console.log('just after subscribe');