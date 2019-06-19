const isDebugging = false;

function missParam() {
    throw Error('missed param!');
}

function validType(typeAssertionFunc=missParam(), p=missParam())  {
    if (!typeAssertionFunc(p)) throw Error(`${p}이 ${typeAssertionFunc} 함수체크를 통과하지 못했습니다.`);
}

function validIntRange(p=missParam(), min=missParam(), max=missParam()) {
    validType(Number.isInteger, p);
    if((p < min) || (p > max)) throw Error(`${p}는 ${min} 이상이고 ${max} 이하여야 합니다.`);
}

class OddEle {
    constructor(arr=missParam()) {
        this.arr = arr;
        this.obj = {};
        this._init(this.arr);
    }
    _init(arr) {
        for (let i = 0; i < arr.length; i++) {
            const ele = arr[i];
            validIntRange(ele, 1, 1000000000);
            this._add(ele);
            // this.log();
        }
    }
    _add(ele=missParam()) {
        this._checkAndInsert(ele);
    }
    _checkAndInsert(ele=missParam()) {
        if(this.obj[ele]) {
            delete this.obj[ele];
        } else {
            this.obj[ele] = true;
        }
    }
    getOddOccurrenceEle() {
        const keys = Object.keys(this.obj);
        if(keys.length === 1) {
            return Number.parseInt(keys[0]);
        } else {
            return -1;
        }
    }
    log() {
        console.dir(this.obj);
    }
}

function solution(A) {
    // 입력값 검증
    validType(Array.isArray, A);
    validIntRange(A.length, 1, 1000000);

    const oddEle = new OddEle(A);
    oddEle.log();
    return oddEle.getOddOccurrenceEle();
}

isDebugging && (() => {
    // 예외처
    // solution();
    // solution('a');
    // solution(true);
    // solution(3);
    // solution({});
    // solution([]);
    solution([1]);
    solution(Array(1000000).fill(1));
    // solution(Array(1000001));

    console.assert(solution([9, 3, 9, 3, 9, 7, 9]) === 7);
})();


