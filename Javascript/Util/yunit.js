/**
 * Created by whybe on 2018. 3. 23..
 */
var yunit = (_=>{
    function assert(a, b) {
        if(a.__proto__.constructor.name !== b.__proto__.constructor.name) {
            throw a.__proto__.constructor.name + '와 ' + b.__proto__.constructor.name + '는 타입이 일치하지 않습니다';
        }
        if(a===b) throw a+'!=='+b;
        return a===b;
    }

    return {
        assert: assert
    }
})();
