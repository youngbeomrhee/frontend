/**
 * Created by YB on 2016-11-05.
 */

// 검증할 데이터
var data = {
    first_name: 'Super',
    last_name: 'Man',
    age: 'unknown',
    username: 'super_man7'
};

// first name은 어떤 값이어도 상관없고, last name은 필수값이 아니라고 가정
// 나이는 숫자여야 됨, 사용자명은 특수문자를 제외한 글자와 숫자로만

var validForm = checker(
    validator('이 값은 필수입니다.', (x)=>x),
    validator('숫자만 사용할 수 있습니다. 예: 1, 3.14 or 2016', (x)=>!isNaN(x)),
    validator('특수 문자를 제외한 글자와 숫자만 사용할 수 있습니다.', (x)=>!/[^a-z0-9]/i.test(value))
);

console.log(`validForm() : ${validForm()}`);


/*

// 값을 가지는지 확인한다
function isNonEmpty (value) {
    return Boolean(value);
}

// 숫자인지 확인한다
function isNumber(value) {
    return !isNaN(value);
}

// 값이 문자와 숫자로만 이루어졌는지 확인한다.
function isAlphaNum(value) {
    return !/[^a-z0-9]/i.test(value);
}
*/

function checker(/* validators */) {
    var validators = _.toArray(arguments);

    return function(obj) {
        return _.reduce(validators, function(errs, check) {
            if (check(obj))
                return errs;
            else
                return _.chain(errs).push(check.message).value();
        }, []);
    };
}

function validator(message, fun) {
    var f = function(/* args */) {
        return fun.apply(fun, arguments);
    };

    f['message'] = message;
    return f;
}
