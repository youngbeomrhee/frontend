# 설치
npm i -g express-generator;

# 설치해야 할 명령어 확인
express learn-express --view=pug    # 템플릿 엔진으로 pug 지정. pug는 Jade의 새로운 이름

<<PRINT

   create : learn-express/
   create : learn-express/public/
   create : learn-express/public/javascripts/
   create : learn-express/public/images/
   create : learn-express/public/stylesheets/
   create : learn-express/public/stylesheets/style.css
   create : learn-express/routes/
   create : learn-express/routes/index.js
   create : learn-express/routes/users.js
   create : learn-express/views/
   create : learn-express/views/error.pug
   create : learn-express/views/index.pug
   create : learn-express/views/layout.pug
   create : learn-express/app.js
   create : learn-express/package.json
   create : learn-express/bin/
   create : learn-express/bin/www

   change directory:
     $ cd learn-express

   install dependencies:
     $ npm install

   run the app:
     $ DEBUG=learn-express:* npm start
PRINT

# 관련모듈 한 번에 설치
cd learn-express && npm i

# 실행
npm start;

# 브라우져에서 http://localhost:3000, http://localhost:3000/users 로 접속 후 로그 확인