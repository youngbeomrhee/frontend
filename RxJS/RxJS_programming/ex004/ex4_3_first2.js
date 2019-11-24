const {range} = require('rxjs');
const {first} = require('rxjs/operators');

range(1, 10).pipe(first(x => x >= 3))
    .subscribe(x => console.log(`result: ${x}`));