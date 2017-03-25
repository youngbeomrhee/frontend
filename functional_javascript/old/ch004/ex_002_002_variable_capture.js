/**
 * Created by YB on 2016-10-22.
 */
console.log('\n### 변수를 캡처하는 함수');

console.log('\n### uniqueString');
function uniqueString (len) {
    return Math.random().toString(36).substr(2, len);
} 
console.log(`uniqueString(10) : ${uniqueString(10)}`);

console.log('\n### uniqueStringWithPrefix');
function uniqueStringWithPrefix (prefix) {
    return [prefix, new Date().getTime()].join('');
}
console.log(`uniqueStringWithPrefix('argento') : ${uniqueStringWithPrefix('argento')}`);

console.log('\n### makeStringWithSeq');
function makeStringWithSeq (start) {
    var counter = start;
    
    return function (prefix) {
        return [prefix, counter++].join('');
    };
}
var stringWithSeq = makeStringWithSeq(0);

console.log(`stringWithSeq('dari') : ${stringWithSeq('dari')}`);
console.log(`stringWithSeq('dari') : ${stringWithSeq('dari')}`);


console.log('\n### generator');
var generator = {
    count: 0,
    stringWithSeq: function (prefix) {
        return [prefix, this.count++].join('');
    }
};

console.log(`generator.stringWithSeq('bohr') : ${generator.stringWithSeq('bohr')}`);
console.log(`generator.stringWithSeq('bohr') : ${generator.stringWithSeq('bohr')}`);
// counter의 재할당 가능
generator.count = 'test';
console.log(`generator.stringWithSeq('bohr') : ${generator.stringWithSeq('bohr')}`);

console.log('\n### private generator');
var omgenerator = (function (init) {
    var counter = init;

    return {
        stringWithSeq: function (prefix) {
            return [prefix, counter++].join('');
        }
    };
})(0);
console.log(`omgenerator.stringWithSeq("lichking-") : ${omgenerator.stringWithSeq("lichking-")}`);
console.log(`omgenerator.stringWithSeq("lichking-") : ${omgenerator.stringWithSeq("lichking-")}`);
omgenerator.count = 'test';
console.log(`omgenerator.stringWithSeq("lichking-") : ${omgenerator.stringWithSeq("lichking-")}`);
