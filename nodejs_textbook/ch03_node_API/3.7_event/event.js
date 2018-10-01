const EventEmitter = require('events'),
    myEvent = new EventEmitter();

console.log("EventEmitter.addListener === EventEmitter.on ->", EventEmitter.addListener === EventEmitter.on);

myEvent.on('event1', () => {
    console.log('이벤트 1');
});
myEvent.on('event2', () => {
    console.log('이벤트 2');
});
myEvent.on('event2', () => {
    console.log('이벤트 2 추가');
});
myEvent.emit('event1');
myEvent.emit('event2');

myEvent.once('event3', () => {
    console.log('이벤트 3');
});
myEvent.emit('event3');
myEvent.emit('event3');

myEvent.on('event4', () => {
    console.log('이벤트 4');
});
myEvent.removeAllListeners('event4');
myEvent.emit('event4');

const listener = (msg) => {
    console.log(msg);
};
const event5Listener = listener.bind(undefined, '이벤트 5')
myEvent.on('event5', event5Listener);
myEvent.emit('event5');
myEvent.removeListener('event5', event5Listener);
myEvent.emit('event5');

console.log("myEvent.listenerCount('event2') ->", myEvent.listenerCount('event2'));