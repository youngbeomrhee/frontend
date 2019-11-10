const RX = require('rxjs');
const {interval} = RX;

const observable = interval(1000);
const subscription = observable.subscribe(x => console.log(x));
// Later:
// This cancels the ongoing Observable execution which
// was started by calling subscribe with an Observer.
setTimeout(_=> {
    subscription.unsubscribe();
}, 3000)
