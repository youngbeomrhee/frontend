/**
 * Created by YB on 2016-10-23.
 */
var lib = require('../lib/lib.js');
var _ = require('underscore');

console.log('\n### 함수 조립의 핵심');

var str = lib.dispatch(lib.invoker('toString', Array.prototype.toString),
    lib.invoker('toString', String.prototype.toString));

console.log(`str('a') : ${str('a')}`);
console.log(`str(_.range(10)) : ${str(_.range(10))}`);