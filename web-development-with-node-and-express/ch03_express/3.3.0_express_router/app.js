const app = require('express')(),
    fs = require('fs');

/*
2. express의 미들웨어 실습 프로젝트
2.1 app.js파일 하나만 사용해서 아래의 기능을 하는 미들웨어를 추가해 봅니다(실행여부는 각각의 미들웨어에서 함수 이름을 console.log()로 확인)
2.1.1 모든 요청에 대해 실행되는 every라는 이름의 미들웨어
2.1.2 모든 POST 요청에 대해 실행되는 everyPost라는 이름의 미들웨어
2.1.3 '/users'라는 GET 요청에 대해 user 리스트를 보여주는 미들웨어 (디비에서 조회된걸로 가정하고 그냥 json ({users:['a','b','c','d']})형식으로 응답)
2.1.4 '/users'라는 POST 요청 (사용자 입력값 {users:['e','f','g']})에 대해 1/10의 확률로 실패하는 미들웨어
2.1.4.1 성공시에는 사용자에게 {msg:'입력완료'} 로 응답
2.1.4.2 실패시에는 사용자에게 {msg:'입력실패'}로 응답하는 공통 에러 핸들러인 everyErrorHandler 미들웨어
2.1.5 2.1.1의 every 함수를 복사 후 변경해서 해당되는 핸들러가 없는 경우 실행되는 noHandlers 미들웨어
2.1.6 '/error' 요청에 대해 무조건 에러(Error('Error Test'))를 발생시키는 throwError 미들웨어
2.1.7 모든 에러 발생시에 analyzeError()라는 함수에 에러 객체를 넘기는 errorHandler1 미들웨어
2.1.8 모든 에러 발생시에 errorHandler1 실행 후 errorLog()라는 함수에 에러 객체를 넘기는 errorHandler2 미들웨어
 */

/**
 * min에서부터 max까지의 숫자를 포함한 랜덤숫자 리턴함수
 * @param min
 * @param max
 * @returns 랜덤숫자
 */
function getRandomIntInclusive(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * percentage 만큼 false를 리턴
 * @param percentage
 * @returns {boolean}
 */
function probabilityFailure(percentage) {
    return getRandomIntInclusive(1, 100) > percentage;
}

/**
 * func를 n번만큼 실행시킨 후 결과를 배열에 담아서 리턴
 * @param n
 * @param func
 * @returns {Array}
 */
function testNTime(n, func) {
    const results = [];
    for (let i = 0; i < n; i++) {
        results.push(func());
    }
    return results;
}

// testTime번만큼 테스트 실행 후에 리턴된 결과를 true, false로 구분해서 리턴
let testTime = 1000000,
    testResults = testNTime(testTime, probabilityFailure.bind(null, 10))
        .reduce((accum, curr) => {
            accum[curr] = ++accum[curr];
            return accum;
        }, {true: 0, false: 0});
console.log(`true: ${testResults.true}, false: ${testResults.false}, 실패율: ${testResults.false / (testResults.true + testResults.false) * 100}`);

function analyzeError(err) {
    console.log('##analyzeError');
}

function errorLog(err) {
    console.log('##errorLog');
    console.error(err);
}

app.set('port', process.env.port || 3000);

app.use(function every(req, res, next) {
    console.log(req.url);
    console.log('#every');
    next();
});

app.get('/', function everyGet(req, res, next) {
    console.log('#everyGet');
    next();
});

app.get('/', function defaultResponse(req, res, next) {
    console.log('#defaultResponse');
    res.type('text/html');
    res.end('<h1>Hello node</h1>');
});

app.post('/', function everyPost(req, res, next) {
    console.log('#everyPost');
    next();
});

app.get('/users', function getUsers(req, res) {
    console.log('#getUsers');
    const users = {users: ['a', 'b', 'c', 'd']};
    res.type('application/json');
    res.end(JSON.stringify(users));
});

app.post('/users', function postUsers(req, res) {
    console.log('#postUsers');
    const result = probabilityFailure(10);
    if(result) {
        res.type('application/json');
        res.end('{msg:\'입력완료\'}');
    } else {
        throw Error('입력실패');
    }
});

app.use('/error', function throwError(req, res) {
    console.log('#error');
    throw Error('무조건 에러');
});

app.use(function noHandlers(req, res) {
    console.log('#noHandlers');
    throw Error('404 - Not Found');
});

app.use(function errorHandler1(err, req, res, next) {
    console.log('#errorHandler1');
    analyzeError(err);
    next(err);
});

app.use(function errorHandler2(err, req, res, next) {
    console.log('#errorHandler2');
    errorLog(err);
    next(err);
});

app.use(function everyErrorHandler(err, req, res, next) {
    console.log('#everyErrorHandler');
    res.type('application/json');
    res.end(JSON.stringify(`{msg: ${err.message}}`));
});

app.listen(app.get('port'), () => {
    console.log('running on http://localhost:' + app.get('port'));
});