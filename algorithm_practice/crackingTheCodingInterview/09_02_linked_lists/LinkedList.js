/**
 * Created by yblee on 2018-04-10.
 */


class Node {
    constructor(prev, ele, next) {
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

    linkFirst(ele) {
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

    linkLast(ele) {
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

    getFirst() {
        if(!this.head) throw '첫 번째 요소가 없습니다.';
        return this.head;
    }

    getLast() {
        if(!this.tail) throw '마지막 요소가 없습니다.';
        return this.tail;
    }
    indexOf(node) {
        if(!(node instanceof Node)) throw '잘못된 타입이 들어왔습니다.';

        let curr = this.head,
            i=0,
            matchIdx=-1;

        if(!curr) return -1;
        while(curr.next) {
            if(curr === node) {
                matchIdx = i;
                break;
            }
            curr = curr.next;
            i++;
        }
        return matchIdx;
    }
    contains(node) {
        if(!(node instanceof Node)) throw '잘못된 타입이 들어왔습니다.';
        return this.indexOf(node)<=-1;
    }
    linkBefore(ele, succ) {
        if(!ele || !succ) throw '인자 2개는 필수입니다.';
        if(!(succ instanceof Node)) throw '잘못된 타입입니다.';
        if(!this.contains(succ)) throw 'List에 해당 값이 없습니다.';

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
/*

    linkAfter(ele, pred) {
        if(!ele || !pred) throw '인자 2개는 필수입니다.';
        if(!(pred instanceof Node)) throw '잘못된 타입입니다.';
        if(!this.contains(pred)) throw 'List에 해당 값이 없습니다.';

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
*/


/*
    linkBefore(ele, succ) {
        const newNode = new Node(ele);
        succ.prev = newNode;
        if(succ)
    }*/
}

