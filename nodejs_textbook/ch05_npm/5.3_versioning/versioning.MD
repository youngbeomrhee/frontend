# npm Versioning 규칙

## 자리별 의미
npm i express@x.y.z 이라고 한다면
x -> major
y -> minor
z -> patch
버젼을 의미한다


## 버젼 허용범위 : ^, ~, <, >, <=, >=

### ^ : minor 버젼까지 허용
^1.0.0 또는 ^1.x.x 와 같이 표기
ex) npm i express@^1.1.1 -> 1.1.1 <= 버젼 < 2.0.0

### ~ : patch 버젼까지 허용
ex) npm i express@~1.1.1 -> 1.1.1 <= 버젼 < 1.2.0

### <, >, <=, >= : 특정 범위의 버젼까지 허용
ex) npm i express@<1.1.1 -> 1.1.1 < 버젼
ex) npm i express@<=1.1.1 -> 1.1.1 <= 버젼


## 항상 최신 버젼
@latest, @x