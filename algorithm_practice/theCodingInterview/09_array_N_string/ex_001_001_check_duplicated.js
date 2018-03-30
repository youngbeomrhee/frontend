/**
 * Created by yblee on 2018-03-30.
 */
const str = '`1234567890-=qwertyuiop[]\asdfghjkl;zxcvbnm,./~!@#$%^&*()_+QWERTYUIOP{}|ASDFGHJKL:ZXCVBNM<>?ㅂㅈㄷㄱ쇼ㅕㅑㅐㅔㅁㄴㅇㄹ호ㅓㅏㅣㅋㅌㅊ퓨ㅜㅡㅃㅉㄸㄲㅆㄱ';

function isUniqueChars(str) {
    if(typeof str !== 'String') return false;
    for (let i = 0; i < str.length; i++) {
        let temp = str[i];
        for (let j=i+1; j < str.length; j++) {
            if(temp===str[j]) {
                console.log(`idx:${j}, duplicated:${temp}`);
                return false;
            }
        }
    }
    return true;
}

isUniqueChars(str);

