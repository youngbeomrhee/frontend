const app = require('express')();

/*
2. express의 미들웨어 실습 프로젝트
2.1 app.js파일 하나만 사용해서 아래의 기능을 하는 미들웨어를 추가해 봅니다(실행여부는 각각의 미들웨어에서 함수 이름을 console.log()로 확인)
2.1.1 모든 요청에 대해 실행되는 every라는 이름의 미들웨어
2.1.2 모든 POST 요청에 대해 실행되는 everyPost라는 이름의 미들웨어
2.1.3 '/users'라는 GET 요청에 대해 user 리스트를 보여주는 미들웨어 (디비에서 조회된걸로 가정하고 그냥 json ({users:['a','b','c','d']})형식으로 응답)
2.1.4 '/users'라는 POST 요청 (사용자 입력값 {users:['e','f','g']})에 대해 1/10의 확률로 실패하는 미들웨어
2.1.4.1 성공시에는 사용자에게 {msg:'입력완료'} 로 응답
2.1.4.2 실패시에는 사용자에게 error 페이지를 호출하고 {msg:'입력완료'}로 응답
2.1.5 2.1.1의 every 함수를 복사 후 변경해서 해당되는 핸들러가 없는 경우 실행되는 noHandlers 미들웨어
2.1.6 '/error' 요청에 대해 무조건 에러(Error('Error Test'))를 발생시키는 throwError 미들웨어
2.1.7 모든 에러 발생시에 analyzeError()라는 함수에 에러 객체를 넘기는 errorHandler1 미들웨어
2.1.8 모든 에러 발생시에 errorHandler1 실행 후 errorLog()라는 함수에 에러 객체를 넘기는 errorHandler2 미들웨어
 */

app.set('port', process.env.port || 3000);

app.use(function every(req, res, next) {
    console.log('every');
    next();
});

app.post('/', function everyPost(req, res) {
    console.log('everyPost');
});

app.listen(app.get('port'), () => {
    console.log('running on http://localhost:' + app.get('port'));
});