a = 1;  // OK

try {
    (() => {
        'use strict';
        b = 1;  // error
    })();
} catch(e) {
    console.error(e);
}

'use strict';   // 중간에 쓰는건 의미가 없다
c = 1;

// 독립된 실행환경을 만들어주면 각자에 맞게 돌아간다.
(() => {
    d = 1;  // OK
})();

try {
    (() => {
        "use strict";
        e = 1;  // error
    })();
} catch(e) {
    console.error(e);
}




