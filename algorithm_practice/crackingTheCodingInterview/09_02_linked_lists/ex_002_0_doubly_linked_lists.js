/**
 * Created by yblee on 2018-04-05.
 */

class Node {
    constructor(element) {
        this.element = element;
        this.next = null;
        this.prev = null;
    }
}

class LinkedList {
    constructor() {
        this.head = null;
        this.tail = null;
        this.length = 0;
    }
    insert(val) {
        if(!val) throw '입력값이 없습니다';
        const node = new Node(val);
        if(this.length===0) {
            this.head = node;
        } else {
            this.tail.next = node;
            node.prev = this.tail;
        }
        this.tail = node;
        this.length++;
    }
    insertTo(index) {
        if(typeof index !== 'number') throw '삽입하려는 위치는 숫자만 가능합니다.';
        if(index<0 || index>this.length-1) throw `삽입하려는 위치가 범위(0~${this.length - 1})를 벗어났습니다.`;

    }
    insertToSearch(val) {

    }
/*    dispReverse() {
        let currNode = this.head;
        currNode = this.findLast();
        while(currNode.previous) {
            console.log(currNode.element);
            currNode = currNode.previous;
        }
    }
    findLast() {
        let currNode = this.head;
        while(currNode.next) {
            currNode = currNode.next;
        }
        return currNode;
    }
    remove(item) {
        const currNode = this.find(item);
        if(currNode.next) {
            currNode.previous.next = currNode.next;
            currNode.next.previous = currNode.previous;
            currNode.next = null;
            currNode.previous = null;
        }
    }

    display() {
        let currNode = this.head;
        while(currNode.next) {
            console.log(currNode.next.element + (currNode.next ? ' <-> ' : ''));
            currNode = currNode.next;
        }
    }
    find(item) {
        let currNode = this.head;
        while(currNode.element !== item) {
            currNode = currNode.next;
        }
        return currNode;
    }
    insert(newElement) {
        let newNode = new Node(newElement),
            current = this.find(item);
        newNode.next = current.next;
        newNode.previous = current;
        current.next = newNode;
    }
    */
}

let ll = new LinkedList();
ll.insert('test1');
ll.insert('test2');
ll.insert('test3');

console.log(ll.head.element === 'test1');
console.log(ll.head.next.element === 'test2');
console.log(ll.head.next.next.element === 'test3');
console.log(ll.head.prev === null);
console.log(ll.tail.next === null);
console.log(ll.head.next.next === ll.tail);
console.log(ll.length === 3);


