const obj = {
    f1: function() {
        console.log("f1's this === obj => ", this === obj);
    },
    f2: function() {
        const that = this;
        (function() { console.log("f2's this === obj =>", this === obj, '| this === that =>', this === that); })();
    },
    f3: function() {
        const that = this;
        (() => { console.log("f3's this === obj => ", this === obj, '| this === that =>', this === that); })();
    },
    f4: function() {
        const that = this;
        (function() { console.log("f4's that === obj => ", that === obj, '| this === that =>', this === that); })();
    },
    f5: function() {
        const that = this;
        (() => { console.log("f5's that === obj => ", that === obj, '| this === that =>', this === that); })();
    },
    f6: function() {
        const that = this;
        setTimeout(function(){ console.log("f6's this === obj => ", this === obj, '| this === that =>', this === that); });
    },
    f7: function() {
        const that = this;
        setTimeout(function(){ console.log("f7's that === obj => ", that === obj, '| this === that =>', this === that); });
    },
    f8: function() {
        const that = this;
        setTimeout(() => { console.log("f8's this === obj => ", this === obj, '| this === that =>', this === that); });
    },
    f9: () => {
        const that = this;
        (function() { console.log("f9's this === obj => ", this === obj, '| this === that =>', this === that); })();
    },
    f10: () => {
        const that = this;
        (() => { console.log("f10's that === obj => ", this === obj, '| this === that =>', this === that); })();
    }
};


var window;
window = window || global;

obj.f1();
obj.f2();
obj.f3();
obj.f4();
obj.f5();
obj.f6();
obj.f7();
obj.f8();
obj.f9();
obj.f10();



/*
console.log('');
console.log('평가항목\t\t| ? === obj \t| ? === window ');
console.log('-------------------------------------------');
console.log(`gf1()\t\t| ${gf1() === obj}\t\t\t| ${gf1() === window}`);
console.log(`gf2()\t\t| ${gf2() === obj}\t\t\t| ${gf2() === window}`);
console.log(`gf3()\t\t| ${gf3() === obj}\t\t\t| ${gf3() === window}`);
console.log(`gf4()\t\t| ${gf4() === obj}\t\t\t| ${gf4() === window}`);
console.log(`gf5()\t\t| ${gf5() === obj}\t\t\t| ${gf5() === window}`);
console.log(`gf6()\t\t| ${gf6() === obj}\t\t\t| ${gf6() === window}`);
console.log(`gf7()\t\t| ${gf7() === obj}\t\t\t| ${gf7() === window}`);
console.log(`gf8()\t\t| ${gf8() === obj}\t\t\t| ${gf8() === window}`);
console.log(`gf9()\t\t| ${gf9() === obj}\t\t\t| ${gf9() === window}`);
*/

