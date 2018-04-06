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
        this.head = null;
        this.tail = null;
        this.length = 0;
    }
    push(val) {
        if(!val) throw '입력값이 없습니다';
        const node = new Node(val);
        if(this.length===0) {   // 초기화
            this.head = node;
        } else {
            this.tail.next = node;
        }
        this.tail = node;   // 무조건 마지막에 삽입
        this.length++;
    }
    insertToIndex(index, val) {
        if(typeof index !== 'number') throw '삽입하려는 위치는 숫자만 가능합니다.';
        if(index<0 || index>this.length-1) throw `삽입하려는 위치가 범위(0~${this.length - 1})를 벗어났습니다.`;
        let inputNode = new Node(val),
            currNode = this.head,
            i=0;
        while(i<index) {    // 넣으려는 위치까지 노드 이동
            currNode = currNode.next;
            i++;
        }
        // inputNode를 current의 다음에 넣어줌
        this._insertNode(currNode, inputNode);
    }
    insertNextToVal(findVal, inputVal) {
        this._insertNode(this._findVal(findVal), new Node(inputVal));
    }
    insertNextToLastVal(findVal, inputVal) {
        this._insertNode(this._findLastVal(findVal), new Node(inputVal));
    }
    _insertNextTo(currNode, val) {
        if(!(currNode instanceof Node)) throw '입력된 값이 Node가 아닙니다.';
        let inputNode = new Node(val);
        this._insertNode(currNode, inputNode);
    }
    _insertNode(currNode, inputNode) {  // currNode 다음에 inputNode를 넣어준다
        if(!(currNode instanceof Node) || !(inputNode instanceof Node)) throw '입력된 값이 Node가 아닙니다.';

        inputNode.next = currNode.next; // 기존 currNode의 inputNode의 next로 옮겨준다

        if(currNode===this.tail) {  // currNode node가 tail일 경우에는 inputNode를 tail로 바꿔준다
            this.tail = inputNode;
        }

        currNode.next = inputNode;  // currNode의 다음 값을 inputNode로 설정
        this.length++;
    }
    _findVal(value) {
        let currNode = this.head;
        while(currNode.element !== value) {
            currNode = currNode.next;
            if(currNode === null) return null;
        }
        return currNode;
    }
    _findLastVal(value) {
        let currNode = this.tail;
        while(currNode.element !== value) {
            currNode = currNode.prev;
            if(currNode === null) return null;
        }
        return currNode;
    }
    getValue(index) {
        if(typeof index !== 'number') throw '찾는 위치는 숫자만 가능합니다.';
        if(index<0 || index>this.length-1) throw `찾으려는 위치가 범위(0~${this.length - 1})를 벗어났습니다.`;
        let currNode = this.head,
            i=0;
        while(i<index) {    // 넣으려는 위치까지 노드 이동
            currNode = currNode.next;
            i++;
        }
        return currNode;
    }
    removeIndex(index) {
        if(typeof index !== 'number') throw '삭제하려는 위치는 숫자만 가능합니다.';
        if(index<0 || index>this.length-1) throw `삭제하려는 위치가 범위(0~${this.length-1})를 벗어났습니다.`;
        let targetNode = this.head,
            i=0;
        while(i<index) {    // 삭제하려는 위치까지 노드 이동
            targetNode = targetNode.next;
            i++;
        }
        this.removeNode(targetNode);
        return targetNode;
    }
    removeVal(val) {
        this.removeNode(this._findVal(val));
    }
    removeLastVal(val) {
        this.removeNode(this._findLastVal(val));
    }
    removeNode(targetNode) {
        if(!(targetNode instanceof Node)) throw '입력된 값이 Node가 아닙니다.';
        if(targetNode===this.head) {
            this.head = targetNode.next;
        }
        if(targetNode!==this.tail) {
            targetNode.next.prev = targetNode.prev;
        } else {
            this.tail = targetNode.prev;
        }

        this.length--;
    }
    display() {
        let currNode = this.head;
        while(currNode) {
            console.log(currNode.element + (currNode.next ? ' <-> ' : ''));
            currNode = currNode.next;
        }
    }
}