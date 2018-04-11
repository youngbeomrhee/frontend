/**
 * Created by yblee on 2018-04-10.
 */


class Node {
    constructor(e, p, n) {
        this.prev = p ? p : null;
        this.next = n ? n : null;
        this.ele = e;
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
        const f = this.head;
        const newNode = new Node(e, null, f);
        this.head = newNode;
        if(!f) {
            this.tail = newNode;
        } else {
            f.prev = newNode;
        }
        this.length++;
    }

    linkLast(e) {
        const l = this.tail;
        const newNode = new Node(ele, l, null);
        this.tail = newNode;
        if(!l) {
            this.head = newNode;
        } else {
            l.next = newNode;
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

