/**
 * Created by YB on 2016-10-09.
 */
function parseAge(age) {
    if(typeof age !== 'string') {
        throw new Error('Expectiong  string');
    }
    var a;

    console.log('Attempting to parse an age');
    a = parseInt(age, 10);

    if(isNaN(a)) {
        console.log('Could not parse age : ', age);
        a = 0;
    }

    return a;
}

// 테스트
console.log(parseAge('42'));
console.log(parseAge('frob'));
console.log(parseAge(42));

