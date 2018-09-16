/**
 * Created by whybe on 2018. 9. 16..
 */
function run () {
    console.log('3초 후 실행');
}
console.log(`시작`);
setTimeout(run, 3000);
console.log(`끝`);
/*
 시작
 끝
 3초 후 실행
*/
