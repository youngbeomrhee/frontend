# 설치
brew install mysql;

# 실행
brew services start mysql;

# 초기 보안 설치
mysql_secure_installation;

# 접속
mysql -h localhost -u root -p;  # mysqlserver로 비번 설정
