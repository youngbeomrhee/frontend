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

# 배포된 패키지 확인
npm info [패키지명];
ex) npm info npm_test_1810;

# (배포 후 24시간 이내에) 배포판 삭제
npm unpublish 패키지명 --force;
ex) npm unpublish npm_test_1810 --force
