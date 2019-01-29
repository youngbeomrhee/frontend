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

// 유효성 검사기 객체의 구현
// 검사에 사용되는 알고리즘 객체들은 사전에 정의된 인터페이스를 가짐
// validate() 메서드와 여러 메시지에서 사용될 한 줄 짜리 도움말 정보인 instructions 프로퍼티를 제공

var validator = {
    // 사용할 수 있는 모든 검사 방법들
    types: {},

    // 현재 유효성 검사 세션의 에러 메시지들
    messages: [],

    // 현재 유효성 검사 설정
    // '데이터 필드명 : 사용할 검사 방법'의 형식
    config: {},

    // 인터페이스 메서드
    // 'data'는 이름 => 값 쌍이다
    validate: function (data) {
        var i, msg, type, checker, result_ok;

        // 모든 메시지를 초기화한다.
        this.messages = [];

        for (i in data) {
            if (data.hasOwnProperty(i)) {
                type = this.config[i];
                checker = this.types[type];

                if (!type) {
                    // 설정된 검사 방법이 없을 경우 검증할 필요가 없으므로 건너뛴다
                    continue;
                }
                if (!checker) {
                    // 설정이 존재하나 해당하는 검사 방법을 찾을 수 없을 경우 오류 발생
                    throw {
                        name: 'ValidationError',
                        message: type + '값을 처리할 유효성 검사기가 존재하지 않습니다.'
                    };
                }
                result_ok = checker.validate(data[i]);
                if (!result_ok) {
                    msg = "\'" + i + "\' 값이 유효하지 않습니다." + checker.instructions;
                    this.messages.push(msg);
                }
            }
        }
        return this.hasErrors();
    },
    // 도우미 메서드
    hasErrors: function () {
        return this.messages.length !== 0;
    }
};


// 값을 가지는지 확인한다
validator.types.isNonEmpty = {
    validate: function (value) {
        return value !== '';
    },
    instructions: '이 값은 필수입니다.'
};

// 숫자인지 확인한다
validator.types.isNumber = {
    validate: function (value) {
        return !isNaN(value);
    },
    instructions: '숫자만 사용할 수 있습니다. 예: 1, 3.14 or 2016'
};

// 값이 문자와 숫자로만 이루어졌는지 확인한다.
validator.types.isAlphaNum = {
    validate: function (value) {
        return !/[^a-z0-9]/i.test(value);
    },
    instructions: '특수 문자를 제외한 글자와 숫자만 사용할 수 있습니다.'
};


// first name은 어떤 값이어도 상관없고, last name은 필수값이 아니라고 가정
// 나이는 숫자여야 됨, 사용자명은 특수문자를 제외한 글자와 숫자로만
validator.config = {
    first_name: 'isNonEmpty',
    age: 'isNumber',
    username: 'isAlphaNum'
};

validator.validate(data);
if (validator.hasErrors()) {
    console.log(validator.messages.join('\n'));
}
