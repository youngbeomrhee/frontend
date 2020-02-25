const {range} = require('rxjs');
const {last} = require('rxjs/operators');

range(1, 10).pipe(last(x => x <= 3))
    .subscribe(x => console.log(`result: ${x}`));