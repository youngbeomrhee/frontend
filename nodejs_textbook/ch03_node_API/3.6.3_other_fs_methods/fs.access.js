const fs = require('fs');

// fs.access(path[, mode=fs.constants.F_OK], callback)

// console.log("fs.constants ->", fs.constants); // F_OK: 0, X_OK: 1, W_OK: 2, R_OK: 4

/*

# fs.constants
fs.constants = {
    F_OK: 0,
    R_OK: 4,
    W_OK: 2,
    X_OK: 1
}

F_OK(0) : Flag indicating that the file is visible to the calling process. This is useful for determining if a file exists, but says nothing about rwx permissions. Default if no mode is specified.
R_OK(4) : Flag indicating that the file can be read by the calling process.
W_OK(2) : Flag indicating that the file can be written by the calling process.
X_OK(1) : Flag indicating that the file can be executed by the calling process. This has no effect on Windows (will behave like fs.constants.F_OK).


# | : bitwise or operator

## 10진법 : 2진법
0 : 000
1 : 001
2 : 010
4 : 100

## 연산 : bit 마다 or 연산한다. 하나라도 true(1)이면 true(1)
000 | 001 === 001
001 | 010 === 011
001 | 100 === 101
010 | 100 === 110
001 | 010 | 100 === 111

# 정리 :
fs.access(path[, mode=fs.constants.F_OK], callback) 실행시에 넘겨주게 되는 mode에
fs.constants의 인자 중 [F_OK=0, R_OK=4, W_OK=2, X_OK=1]를 |(bitwise or)로 연산한 결과를 넘겨줄 수 있다.
이 때 연산에 사용되는 상수들은 각각의 자리수를 의미하기 때문에 연산결과는 각각의 값을 더한 것과 같다.(위의 내용 참고)
실제로는 F_OK는 default 값이므로 연산해 보는 의미가 없고, W_OK는 실행할 수 있는지 여부를 Windows OS를 제외한 다른 OS에서만 확인해 볼 수 있기 때문에 연산의 의미는 매우 제한적이다.
그래서 해당 path의 resource(directory, file)가 읽을 수 있는지(R_OK), 쓸 수 있는지(W_OK), 읽고 쓸 수 있는지(R_OK | W_OK) 여부를 아래와 같이 확인해 볼 수 있다
*/

// 존재하지 않는 resource에 대한 접근
fs.access('./none', fs.constants.F_OK, err => { if (err) console.error(err); else console.log('fs.access(\'./none\', fs.constants.F_OK) 성공'); });
// fs.access(path[, mode=fs.constants.F_OK], callback) 이므로 fs.constants.F_OK 생략해도 동일한 결과
fs.access('./none', err => { if (err) console.error(err); else console.log('fs.access(\'./none\') 성공'); });

// 읽기권한만 있는 resource에 대한 접근
// 존재여부 체크
fs.access('./onlyReadable', err => { if (err) console.error(err); else console.log('fs.access(\'./onlyReadable\') 성공'); });
// 존재하면서 읽을 수 있는지 체크
fs.access('./onlyReadable', fs.constants.F_OK | fs.constants.R_OK, err => { if (err) console.error(err); else console.log('fs.access(\'./onlyReadable\', fs.constants.F_OK | fs.constants.R_OK) 성공'); });
// 읽을 수 있는지 여부를 체크할 때 존재여부에 대한 체크는 불필요
fs.access('./onlyReadable', fs.constants.R_OK, err => { if (err) console.error(err); else console.log('fs.access(\'./onlyReadable\', fs.constants.R_OK) 성공'); });
// 쓸 수 있는지 여부를 체크
fs.access('./onlyReadable', fs.constants.W_OK, err => { if (err) console.error(err); else console.log('fs.access(\'./onlyReadable\', constants.W_OK) 성공'); });
// 읽고 쓸 수 있는지 여부를 체크
fs.access('./onlyReadable', fs.constants.R_OK | fs.constants.W_OK, err => { if (err) console.error(err); else console.log('fs.access(\'./onlyReadable\', fs.constants.R_OK | constants.W_OK) 성공'); });

// 쓰기권한만 있는 resource에 대한 접근
// 존재여부 체크
fs.access('./onlyWritable', err => { if (err) console.error(err); else console.log('fs.access(\'./onlyWritable\') 성공'); });
// 존재하면서 읽을 수 있는지 체크
fs.access('./onlyWritable', fs.constants.R_OK, err => { if (err) console.error(err); else console.log('fs.access(\'./onlyWritable\', fs.constants.R_OK) 성공'); });
// 쓸 수 있는지 여부를 체크
fs.access('./onlyWritable', fs.constants.W_OK, err => { if (err) console.error(err); else console.log('fs.access(\'./onlyWritable\', constants.W_OK) 성공'); });
// 읽고 쓸 수 있는지 여부를 체크
fs.access('./onlyWritable', fs.constants.R_OK | fs.constants.W_OK, err => { if (err) console.error(err); else console.log('fs.access(\'./onlyWritable\', fs.constants.R_OK | constants.W_OK) 성공'); });

// 읽기쓰기권한 모두 있는 resource에 대한 접근
// 존재여부 체크
fs.access('./bothReadableWritable', err => { if (err) console.error(err); else console.log('fs.access(\'./bothReadableWritable\') 성공'); });
// 존재하면서 읽을 수 있는지 체크
fs.access('./bothReadableWritable', fs.constants.R_OK, err => { if (err) console.error(err); else console.log('fs.access(\'./bothReadableWritable\', fs.constants.R_OK) 성공'); });
// 쓸 수 있는지 여부를 체크
fs.access('./bothReadableWritable', fs.constants.W_OK, err => { if (err) console.error(err); else console.log('fs.access(\'./bothReadableWritable\', constants.W_OK) 성공'); });
// 읽고 쓸 수 있는지 여부를 체크
fs.access('./bothReadableWritable', fs.constants.R_OK | fs.constants.W_OK, err => { if (err) console.error(err); else console.log('fs.access(\'./bothReadableWritable\', fs.constants.R_OK | constants.W_OK) 성공'); });

