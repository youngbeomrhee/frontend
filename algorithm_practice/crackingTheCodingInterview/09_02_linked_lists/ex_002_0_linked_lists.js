/**
 * Created by yblee on 2018-04-05.
 */

class Node {
    constructor(element) {
        this.element = element;
        this.next = null;
    }
}

class LinkedList {
    constructor() {
        this.head = new Node('head');
    }
    remove(item) {
        const preNode = this.findPrevious(item);
        if(preNode.next) preNode.next = preNode.next.next;
    }
    findPrevious(item) {
        let currNode = this.head;
        while(currNode.next && currNode.next.element !== item) {
            currNode = currNode.next;
        }
        return currNode;
    }
    display() {
        let currNode = this.head;
        while(currNode.next) {
            console.log(currNode.next.element + (currNode.next.next ? ' -> ' : ' -> tail'));
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
    insert(newElement, item) {
        let newNode = new Node(newElement),
            current = this.find(item);
        newNode.next = current.next;
        current.next = newNode;
    }
}

let cities = new LinkedList();
cities.insert('Conway', 'head');
cities.insert('Russelville', 'Conway');
cities.insert('Carlisle', 'Russelville');
cities.insert('Alma', 'Carlisle');
cities.display();
console.log('# Carlisle 삭제');
cities.remove('Carlisle');
cities.display();