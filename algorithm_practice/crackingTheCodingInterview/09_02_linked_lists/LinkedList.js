/**
 * Created by yblee on 2018-04-10.
 */

function require(...args) {
    let nullEles = args.reduce((accum, curr)=>{
        if(!curr) accum.push(curr);
    }, []);
    if(nullEles.size > 0) throw '필수값이 누락되었습니다 : ' + nullEles;
}

class Node {
    constructor(prev, item=errParam(), next) {
        this.prev = prev ? prev : null;
        this.next = next ? next : null;
        this.item = item;
    }
}

class LinkedList {
    constructor(arr) {
        this.first = null;
        this.last = null;
        this.size = 0;
        if(arr) {
            this.addAll(arr);
        }
    }

    linkFirst(item=errParam()) {
        const first = this.first,
            prev=null,
            next=first,
            newNode = new Node(prev, item, next);
        this.first = newNode;
        if(!first) {
            this.last = newNode;
        } else {
            first.prev = newNode;
        }
        this.size++;
    }

    linkLast(item=errParam()) {
        const last = this.last,
            prev=last,
            next=null,
            newNode = new Node(prev, item, next);
        this.last = newNode;
        if(!last) {
            this.first = newNode;
        } else {
            last.next = newNode;
        }
        this.size++;
    }

    /**
     * Constructs an IndexOutOfBoundsException detail message.
     * Of the many possible refactorings of the error handling code,
     * this "outlining" performs best with both server and client VMs.
     */
    outOfBoundsMsg(index) {
        return "Index: "+index+", Size: "+this.size;
    }

    isElementIndex(index) {     // index가 제대로 된 범위 안에 들어오는지 확인
        return index >= 0 && index < this.size;
    }

    checkElementIndex(index) {
        if (!this.isElementIndex(index)) throw new RangeError(this.outOfBoundsMsg(index));
    }

    /**
     * Returns the (non-null) Node at the specified element index.
     */
    node(index) {
        // this.checkElementIndex(index);
        if (index < (this.size >> 1)) {
            let x = this.first;
            for (let i = 0; i < index; i++) {
                x = x.next;
            }
            return x;
        } else {
            let x = this.last;
            for (let i = this.size - 1; i > index; i--)
            x = x.prev;
            return x;
        }
    }

    get(index) {
        this.checkElementIndex(index);
        return this.node(index).item;
    }

    getFirst() {
        if(!this.first) throw '첫 번째 요소가 없습니다.';
        return this.first;
    }

    getLast() {
        if(!this.last) throw '마지막 요소가 없습니다.';
        return this.last;
    }

    indexOf(item=errParam()) {
        let index = 0,
            x = this.first;

        if (item === null) {
            for (; x !== null; x = x.next) {
                if (x.item == null)
                    return index;
                index++;
            }
        } else {
            for (; x !== null; x = x.next) {
                if (item === x.item)
                    return index;
                index++;
            }
        }
        return -1;
    }

    lastIndexOf(item=errParam()) {
        let index = this.size,
            x = this.last;

        if (item === null) {
            for (; x !== null; x = x.prev) {
                index--;
                if (x.item == null)
                    return index;
            }
        } else {
            for (; x !== null; x = x.prev) {
                index--;
                if (item === x.item)
                    return index;
            }
        }
        return -1;
    }

    contains(item=errParam()) {
        return this.indexOf(item) >= 0;
    }

    linkBefore(item=errParam(), succ=errParam()) {
        typeCheck(succ, Node);
        if(!this.contains(succ.item)) throw 'List에 해당 값이 없습니다.';

        const pred = succ.prev,
            newNode = new Node(pred, item, succ);
        succ.prev = newNode;
        if(!pred) {
            this.first = newNode;
        } else {
            pred.next = newNode;
        }
        this.size++;
    }

    linkAfter(item=errParam(), pred=errParam()) {
        typeCheck(pred, Node);
        if(!this.contains(pred.item)) throw 'List에 해당 값이 없습니다.';
        const succ = pred.next,
            newNode = new Node(pred, item, succ);
        pred.next = newNode;
        if(!succ) {
            this.last = newNode;
        } else {
            succ.prev = newNode;
        }
        this.size++;
    }

    addAll(arr) {
        arr.forEach((item) => {
            this.linkLast(item);
        });
    }

/*
    unlinkFirst(Node<E> f) {
        // assert f == first && f != null;
        final E element = f.item;
        final Node<E> next = f.next;
        f.item = null;
        f.next = null; // help GC
        first = next;
        if (next == null)
        last = null;
        else
        next.prev = null;
        size--;
        modCount++;
        return element;
    }

    unlinkLast(Node<E> l) {
        // assert l == last && l != null;
        final E element = l.item;
        final Node<E> prev = l.prev;
        l.item = null;
        l.prev = null; // help GC
        last = prev;
        if (prev == null)
            first = null;
        else
            prev.next = null;
        size--;
        modCount++;
        return element;
    }
*/

}

