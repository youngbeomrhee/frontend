const buffer = Buffer.from('저를 버퍼로 바꿔보세요');

console.log("buffer ->", buffer);
console.log("buffer.length ->", buffer.length);
console.log("buffer.toString() ->", buffer.toString());
console.log();

const array = [Buffer.from('띄엄'), Buffer.from('띄엄'), Buffer.from('띄어쓰기')],
    buffer2 = Buffer.concat(array);
console.log("buffer2.toString() ->", buffer2.toString());
console.log();

const buffer3 = Buffer.alloc(5);    // 5byte의 빈 버퍼를 생성
console.log("buffer3 ->", buffer3);
