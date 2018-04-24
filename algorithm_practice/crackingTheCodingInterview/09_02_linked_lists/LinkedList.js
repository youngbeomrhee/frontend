/**
 * Created by yblee on 2018-04-10.
 */
function errParam(msg) {
    if(msg) throw msg;
    throw '필수인자가 누락되었습니다.';
}
function typeCheck(instance, type) {
    if(!(instance instanceof type)) throw new TypeError(type);
}
function require(...args) {
    let nullEles = args.reduce((accum, curr)=>{
        if(!curr) accum.push(curr);
    }, []);
    if(nullEles.length > 0) throw '필수값이 누락되었습니다 : ' + nullEles;
}
class Node {
    constructor(prev, ele=errParam(), next) {
        this.prev = prev ? prev : null;
        this.next = next ? next : null;
        this.ele = ele ? ele : null;
    }
}

class LinkedList {
    constructor(arr) {
        this.head = null;
        this.tail = null;
        this.length = 0;
        if(arr) {
            this.addAll(arr);
        }
    }
    linkFirst(ele=errParam()) {
        const first = this.head,
            prev=null,
            next=first,
            newNode = new Node(prev, ele, next);
        this.head = newNode;
        if(!first) {
            this.tail = newNode;
        } else {
            first.prev = newNode;
        }
        this.length++;
    }
    linkLast(ele=errParam()) {
        const last = this.tail,
            prev=last,
            next=null,
            newNode = new Node(prev, ele, next);
        this.tail = newNode;
        if(!last) {
            this.head = newNode;
        } else {
            last.next = newNode;
        }
        this.length++;
    } 
    isElementIndex(index) {     // index가 제대로 된 범위 안에 들어오는지 확인
        return index >= 0 && index < this.length;
    }
    checkElementIndex(index) {
        if (!this.isElementIndex(index)) throw RangeError(index);
    }
    getFirst() {
        if(!this.head) throw '첫 번째 요소가 없습니다.';
        return this.head;
    }
    getLast() {
        if(!this.tail) throw '마지막 요소가 없습니다.';
        return this.tail;
    }
    indexOf(ele=errParam()) {
        let index = 0,
            x = this.head;

        if (ele === null) {
            for (; x !== null; x = x.next) {
                if (x.ele == null)
                    return index;
                index++;
            }
        } else {
            for (; x !== null; x = x.next) {
                if (ele === x.ele)
                    return index;
                index++;
            }
        }
        return -1;
    }
    lastIndexOf(ele=errParam()) {
        let index = this.length,
            x = this.tail;

        if (ele === null) {
            for (; x !== null; x = x.prev) {
                index--;
                if (x.ele == null)
                    return index;
            }
        } else {
            for (; x !== null; x = x.prev) {
                index--;
                if (ele === x.ele)
                    return index;
            }
        }
        return -1;
    }
    contains(ele=errParam()) {
        return this.indexOf(ele) >= 0;
    }

    linkBefore(ele=errParam(), succ=errParam()) {
        typeCheck(succ, Node);
        if(!this.contains(succ.ele)) throw 'List에 해당 값이 없습니다.';

        const pred = succ.prev,
            newNode = new Node(pred, ele, succ);
        succ.prev = newNode;
        if(!pred) {
            this.head = newNode;
        } else {
            pred.next = newNode;
        }
        this.length++;
    }

    linkAfter(ele=errParam(), pred=errParam()) {
        typeCheck(pred, Node);
        if(!this.contains(pred.ele)) throw 'List에 해당 값이 없습니다.';
        const succ = pred.next,
            newNode = new Node(pred, ele, succ);
        pred.next = newNode;
        if(!succ) {
            this.tail = newNode;
        } else {
            succ.prev = newNode;
        }
        this.length++;
    }


/*
    linkBefore(ele, succ) {
        const newNode = new Node(ele);
        succ.prev = newNode;
        if(succ)
    }*/
}

