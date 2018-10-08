# 최신버젼이 아닌 모듈들 조회
npm outdated;

# 업데이트
npm update [모듈명];
모듈명을 기재하지 않는 경우 package.json에 기술된 전체 모듈 최신 버젼으로 업데이트

## 특정 버젼으로 업데이트
package.json의 모듈 버젼을 원하는 버젼으로 바꿔준 후에 npm install;

예) rimraf를 2.0.0 으로 변경
{
  "name": "ch05_npm",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "express": "^4.16.3",
    "rimraf": "2.0.0"   //
  }
}

# 제거
npm uninstall 모듈명;
ex) npm uninstall rimraf

# 조회
npm search 모듈명
ex) npm uninstall rimraf

## 출력결과
NAME                      | DESCRIPTION          | AUTHOR          | DATE       | VERSION  | KEYWORDS
express                   | Fast,…               | =dougwilson…    | 2018-03-12 | 4.16.3   | express framework sinatra web rest restful router app api
path-to-regexp            | Express style path…  | =blakeembrey…   | 2018-08-26 | 2.4.0    | express regexp route routing
cors                      | Node.js CORS…        | =dougwilson…    | 2017-07-13 | 2.8.4    | cors express connect middleware
morgan                    | HTTP request logger… | =dougwilson     | 2018-09-11 | 1.9.1    | express http logger middleware
serve-favicon             | favicon serving…     | =dougwilson     | 2018-03-29 | 2.5.0    | express favicon middleware

package.json에 적어 둔 keyword가 "KEYWORDS"열에 출력

# 배포를 위한 로그인
npm adduser;

# 현재 로그인 된 사용자 확인
npm whoami;

# 로그아웃
npm logout;

# package의 버젼 올리기
npm version 5.3.2;
npm version minor;  // [major, minor, patch] 중에 기술한 자리의 숫자를 1 높여줌  1.0.0 -> 1.1.0

# 자신의 package를 deprecated 시키고 메시지를 출력할 때
npm deprecate [패키지명][버젼] [메시지];

# 자신이 만든 package 배포
npm publish;

# (배포 후 24시간 이내에) 배포판 삭제
npm unpublish;

