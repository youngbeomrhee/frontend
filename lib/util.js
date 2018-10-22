/*
    Util로 사용할 함수 모음

    # Code convention
    생성자 함수는 첫 글자를 대문자로 시작한다
*/
const Util = (() => {
    // 처리지연
    const setFunc = func => (...args) => func.apply(func, args),
        setLeft = (func, ...args) => (...args2) => func.apply(func, args.concat(args2)),
        setRight = (func, ...args) => (...args2) => func.apply(func, args2.concat(args));

    return {
        setFunc: setFunc,
        setLeft: setLeft,
        setRight: setRight
    }
})();

