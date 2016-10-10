/**
 * Created by YB on 2016-10-09.
 */

// 로그영영을 추상화
function fail(thing) {
    throw new Error('[ERROR] ' + thing);
}

function warn(thing) {
    console.log('[WARNING]', thing);
}

function note(thing) {
    console.log('[NOTE]', thing);
}


function parseAge(age) {
    if(typeof age !== 'string') {
        fain('Expecting a string')
    }
    var a;

    note('Attempting to parse an age');
    a = parseInt(age, 10);

    if(isNaN(a)) {
        warn('Could not parse age : ', age);
        a = 0;
    }

    return a;
}

// 테스트
console.log(parseAge('42'));
console.log(parseAge('frob'));
console.log(parseAge(42));


