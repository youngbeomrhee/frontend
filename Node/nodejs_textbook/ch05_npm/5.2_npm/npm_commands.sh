# package 초기화 => package.json 파일 생성
npm init;

<<PRINT
package name: (5.2_npm_test)
version: (1.0.0) 0.0.1
description: hello package.json
git repository: https://github.com/youngbeomrhee/jssample.git
keywords:
author: whybe
license: (ISC)
PRINT

# package.json 내용확인
cat package.json;

<<PRINT
{
  "name": "5.2_npm_test",
  "version": "0.0.1",
  "description": "hello package.json",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "whybe",
  "license": "ISC",
  "repository": {
    "type": "git",
    "url": "git+https://github.com/youngbeomrhee/jssample.git"
  },
  "bugs": {
    "url": "https://github.com/youngbeomrhee/jssample/issues"
  },
  "homepage": "https://github.com/youngbeomrhee/jssample#readme"
}
PRINT

# npm start 등록
## 실행시킬 파일 등록
## echo "console.log('hi')" > hello.js

## package.json 파일에 "start": "node hello" 와 같이 실행시킬 내용 등록
vi package.json;

npm start;
### 'hi' 출력

# 모듈 설치
npm install express;

# 여러 모듈 설치 - 띄어쓰기로 구분
npm install morgan cookie-parser express-session;

# 개발용 패키지 설치 - 실제 배포시에는 누락
npm install --save-dev nodemon;

# 전역에 설치
npm install --global rimraf;

# npx를 사용하면 모듈을 찾아서 실행시켜주거나 없으면 임시로 설치 후 실행
npx rimraf ;




