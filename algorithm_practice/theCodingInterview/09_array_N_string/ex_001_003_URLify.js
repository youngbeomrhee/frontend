/**
 * Created by yblee on 2018-03-30.
 */
function urlify(str) {
    if(typeof str !== 'string') throw '문자열만 사용 가능합니다';
    return str.replace(/\s/g, '%20');
}

urlify('asdf asdf ljkasd jlskd j sjj j l saldkfj');
