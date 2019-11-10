var Rx = require('rxjs/Rx');


const observable = Rx.Observable.create(observer => {
    observer.next('hello');
    observer.next('world');
});

observable.subscribe(val => console.log(val));
// hello
// world