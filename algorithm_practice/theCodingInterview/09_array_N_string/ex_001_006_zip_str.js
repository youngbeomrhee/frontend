function zipStr(str) {
    if(typeof str !== 'string') throw '문자열만 처리할 수 있습니다';
    let strArr = str.split(''),
        zippedStr = strArr[0],
        sameCnt = 1;

    for(let i=0; i<strArr.length; i++){
        if(strArr[i] === strArr[i+1]) {
            sameCnt++;
        } else {
            debugger;
            zippedStr += (sameCnt > 1 ? sameCnt : '') + (strArr[i+1] ? strArr[i+1] : '');
            sameCnt = 1;
        }
    }
    return zippedStr.length > str ? str : zippedStr;
}
zipStr('aabccccaaa');