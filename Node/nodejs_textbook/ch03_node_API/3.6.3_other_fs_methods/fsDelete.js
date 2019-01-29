const fs = require('fs');

fs.readdir('./folder', (err, dir) => {
    if (err) throw err;
    console.log('폴더내용 확인. dir:', dir);

    fs.readFile('./folder/renamed.js', (err, dir) => {
        if (err) throw err;
        console.log('폴더내용 확인. dir:', dir);

        fs.unlink('./folder/renamed.js', err => {
            if (err) throw err;
            console.log('파일 삭제 성공');

            fs.rmdir('./folder', err => {
                if (err) throw err;
                console.log('폴더 삭제 성공');
            });
        });
    });

});