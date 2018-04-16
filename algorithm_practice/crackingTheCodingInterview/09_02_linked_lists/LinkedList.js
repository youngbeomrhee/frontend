/**
 * Created by yblee on 2018-04-10.
 */


class Node {
    constructor(e, p, n) {
        this.prev = p ? p : null;
        this.next = n ? n : null;
        this.ele = e ? e : null;
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

    linkFirst(e) {
        const f = this.head,
            prev=null,
            next=f;
        const newNode = new Node(e, prev, next);
        this.head = newNode;
        if(!f) {
            this.tail = newNode;
        } else {
            f.prev = newNode;
        }
        this.length++;
    }

    linkLast(e) {
        const l = this.tail,
            prev=l,
            next=null;
        const newNode = new Node(e, prev, next);
        this.tail = newNode;
        if(!l) {
            this.head = newNode;
        } else {
            l.next = newNode;
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

/*
    linkBefore(ele, succ) {
        const newNode = new Node(ele);
        succ.prev = newNode;
        if(succ)
    }*/
}

