/**
 * Created by whybe on 2017. 2. 3..
 */

function polyToString(v) {
    if(typeof v === 'string') {
        blahblah
    } else if(typeof v === 'number') {
        blahblah
    } else if(typeof v === 'object') {
        if(v.constructor === Array) {
            blahblah
        } else if(v.constructor === 'object') {
            blahblah
        }
    }
}



var polyToString = dispatch(
    문자형처리,
    배열형처리,
    객체형처리,
    문자형처리
);


function withinRange(v) {
    if(!Number.isInteger(v)) {
        alert('arg must be a integer');
    } else if(v <= 10) {
        alert('arg must be greater than 10');
    } else if(v >= 20) {
        alert('arg must be less than 20');
    }
}



var withinRange = checker(
    validator('arg must be a integer', Number.isInteger),
    validator('arg must be greater than 10', greaterThan(10)),
    validator('arg must be less than 20', lessThan(20))
);


createPerson()
    .setFirstName('Mike')
    .setLastName('Fogus')
    .setAge(108)
    .toString();




_.chain(library)
    .tap(function (o) { console.log(o); })
    .pluck(TITLE_KEY)
    .sort()
    .value();


new LazyChain([2, 1, 3])
    .invoke('concat', [8, 5, 7, 6])
    .invoke('sort')
    .invoke('join', ' ')
    .force();



var sqrPre = condition1(
    validator('arg must not be zero', complement(zero)),  // validator('msg', validator('msg2', func))의 형태
    validator('arg must be a number', _.isNumber)
);

function uncheckedSqr(n) { return n * n };

var checkedSqr = partial1(sqrPre, uncheckedSqr);

var sqrPost = condition1(
    validator('result shoud be a number', _.isNumber),
    validator('result shoud not be zero', complement(zero)),
    validator('result shoud be greater than 100', greaterThan(100))
);

var megaCheckedSqr = _.compose(partial(sqrPost, _.identity), checkedSqr);