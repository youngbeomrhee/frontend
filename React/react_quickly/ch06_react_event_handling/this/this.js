//
const obj = {
    objThis: this,
    func: function() {
        return this;
    },
    innerExecFunc: function() {
        return (function () { return this; })();
    },
    arrFunc: () => this,    // arrFunc의 this = obj 내부
    innerExecArrFunc: function() {
        // 여기에 있는 this를 참조
        return (() => this)();
    }
};
console.log('##### obj의 메서드로서 호출할 경우의 this');
console.log("obj.objThis === window ->", obj.objThis === window);
console.log("obj.func() === obj ->", obj.func() === obj);
console.log("obj.innerExecFunc() === window ->", obj.innerExecFunc() === window);
console.log("obj.arrFunc() === window ->", obj.arrFunc() === window);
console.log("obj.innerExecArrFunc() === obj ->", obj.innerExecArrFunc() === obj);


console.log('\n##### obj의 메서드를 전역변수에 할당한 후 호출할 경우의 this');
let directCall = obj.objThis;
console.log("# obj.objThis === directCall ->", obj.objThis === directCall);
console.log("obj.objThis directCall ->", directCall);

directCall = obj.func;
console.log("# obj.func() === directCall() ->", obj.func() === directCall());
console.log("obj.func directCall() ->", directCall());

directCall = obj.innerExecFunc;
console.log("# obj.innerExecFunc() === directCall() ->", obj.innerExecFunc() === directCall());
console.log("obj.innerExecFunc directCall() ->", directCall());

directCall = obj.arrFunc;
console.log("# obj.arrFunc() === directCall() ->", obj.arrFunc() === directCall());
console.log("obj.arrFunc directCall() ->", directCall());

directCall = obj.innerExecArrFunc;
console.log("# obj.innerExecArrFunc() === directCall() ->", obj.innerExecArrFunc() === directCall());
console.log("obj.innerExecArrFunc directCall() ->", directCall());
