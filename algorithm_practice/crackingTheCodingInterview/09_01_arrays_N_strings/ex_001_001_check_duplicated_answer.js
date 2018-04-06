/**
 * Created by yblee on 2018-03-30.
 */
function isUniqueChars(str) {
    if(str.length > 65535) return false;
    const char_set = [];
    for (let i = 0; i < str.length; i++) {
        let charCode = str[i].charCodeAt();
        if(char_set[charCode]) {
            console.dir(char_set);
            return false;
        }
        char_set[charCode] = true;
    }
    return true;
}

isUniqueChars('`1234567890-=qwertyuiop[]\asdfghjkl;zxcvbnm,./~!@#$%^&*()_+QWERTYUIOP{}|ASDFGHJKL:ZXCVBNM<>?ㅂㅈㄷㄱ쇼ㅕㅑㅐㅔㅁㄴㅇㄹ호ㅓㅏㅣㅋㅌㅊ퓨ㅜㅡㅃㅉㄸㄲㅆㄱ');

