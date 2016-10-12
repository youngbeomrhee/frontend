/**
 * Created by yblee on 2016-06-17.
 * 범용 네임스페이스 함수
 */

var MYAPP = MYAPP || {};

MYAPP.makeNS = function (ns_string) {
    var parts = ns_string.split('.'),
        parent = MYAPP,
        i;

    // 처음에 중복되는 전역 객체명은 제거한다.
    if(parts[0] === "MYAPP") {
        parts = parts.slice(1);
    }

    for (i = 0; i < parts.length; i++) {
        // 프로퍼티가 존재하지 않으면 생성한다.
        if(typeof parent[parts[i]] === "undefined") {
            parent[parts[i]] = {};
        }

        parent = parent[parts[i]];
    }
    return parent;
};

// 반환 값을 지역 변수에 할당한다.
var module2 = MYAPP.makeNS('MYAPP.modules.module2');
console.log(module2 === MYAPP.modules.module2);

// 첫부분의 'MYAPP'을 생략하고도 쓸 수 있다.
MYAPP.makeNS('modules.module51');

// 아주 긴 네임스페이스를 만들어보자.
MYAPP.makeNS('once.upon.a.time.there.was.this.long.nested.property');

debugger;

console.dir(MYAPP);