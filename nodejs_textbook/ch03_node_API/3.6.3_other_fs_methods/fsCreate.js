const fs = require('fs');


fs.access('./folder', fs.constants.F_OK | fs.constants.R_OK | fs.constants.W_OK, err => {
    if (err) {
        if (err.code === 'ENOENT') {
            console.log('폴더 없음');
            fs.mkdir('./folder', err => {
                if (err) throw err;
                console.log('폴더 만들기 성공');

                fs.open('./folder/file.js', 'w', (err, fd) => {     // fs.open(path, flags[, mode], callback)에서 (File System) Flags로 사용되는 목록은 https://nodejs.org/api/fs.html#fs_file_system_flags 참고
                    if (err) throw err;
                    console.log('빈 파일 만들기 성공. fd:', fd);
                    fs.rename('./folder/file.js', './folder/renamed.js', err => {   // linux의 move 메서드처럼 이름을 변경하거나 경로를 이동시킬 때 모두 사용할 수 있다
                        if (err) throw err;
                        console.log('이름 바꾸기 성공');
                    });
                });
            });
        } else {
            throw err;
        }
    } else {
        console.log('이미 폴더 있음');
    }
});
