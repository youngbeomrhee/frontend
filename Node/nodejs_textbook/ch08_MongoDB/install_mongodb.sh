# MongoDB 설치
brew install mongodb;

# 데이터가 저장될 폴더 생성
mkdir -p /data/db;

# 실행
sudo mongod;
# brew services start mongodb

# mongodb 접속
mongo;

# 관리자 계정 추가
use admin;
db.createUser({ user: 'admin', pwd: 'mongodb', roles: ['root'] });

# Ctrl + c로 mongodb 콘솔 빠져나오기

# 보안을 사용할 수 있게 mongod.conf 변경
vim /usr/local/etc/mongod.conf

<<MONGODCONF
security:
  authorization: enabled
MONGODCONF

# admin 접속
mongo admin -u admin -p;