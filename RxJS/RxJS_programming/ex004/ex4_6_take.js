const {interval} = require('rxjs');
const {take} = require('rxjs/operators');

const it = interval(1000).pipe(take(5));
it.subscribe(x => console.log(`result: ${x}`));
it.subscribe(x => console.log(`result2: ${x}`));
