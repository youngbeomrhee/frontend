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

class DoubleLinkedList {
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
            node.prev = this.tail;
        }
        this.tail = node;   // 무조건 마지막에 삽입
        this.length++;
    }
    pop() {
        let lastNode = this.tail;
        this.tail.prev.next = null;
        this.length--;
        return lastNode;
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
        inputNode.prev = currNode;  // currNode를 inputNode를  다음에 넣어줌

        if(currNode===this.tail) {  // currNode node가 tail일 경우에는 inputNode를 tail로 바꿔준다
            this.tail = inputNode;
        } else {
            inputNode.next.prev = inputNode;
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
    removeIndex(index) {
        if(typeof index !== 'number') throw '삭제하려는 위치는 숫자만 가능합니다.';
        if(index<0 || index>this.length-1) throw `삭제하려는 위치가 범위(0~${this.length-1})를 벗어났습니다.`;
        let targetNode, i;
        if(index < this.length/2) {    // index가 전체길이의 절반보다 작으면 앞에서 검색
            targetNode = this.head;
            i=0;
            while(i<index) {    // 삭제하려는 위치까지 노드 이동
                targetNode = targetNode.next;
                i++;
            }
        } else {    // 뒤에서부터 검색
            targetNode = this.tail;
            i=this.length;
            while(i-1>index) {    // 삭제하려는 위치까지 노드 이동
                targetNode = targetNode.prev;
                i--;
            }
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
        if(targetNode!==this.head) {
            targetNode.prev.next = targetNode.next;
        } else {
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
    dispReverse() {
        let currNode = this.tail;
        while(currNode) {
            console.log(currNode.element + (currNode.prev ? ' <-> ' : ''));
            currNode = currNode.prev;
        }
    }
}
/*

let ll = new LinkedList();
ll.push('test1');
ll.push('test2');
ll.push('test3');

if(!(
    ll.head.element === 'test1' &&
    ll.head.next.element === 'test2' &&
    ll.head.next.next.element === 'test3' &&
    ll.head.prev === null &&
    ll.tail.next === null &&
    ll.length === 3
    )) throw '오류';

ll.insertToIndex(1, 'test2-1');

if(!(
    // ll.head.element === 'test1' &&
    // ll.head.next.element === 'test2' &&
    ll.head.next.next.element === 'test2-1' &&
    // ll.head.next.next.next.element === 'test3' &&
    ll.head.next.next.next.prev.element === 'test2-1' &&
    // ll.head.prev === null &&
    // ll.tail.next === null &&
    ll.length === 4
    )) throw '오류';

ll.insertNextToVal('test2-1', 'test2-2');

if(!(
        ll.head.next.next.element === 'test2-1' &&
        ll.head.next.next.next.element === 'test2-2' &&
        ll.length === 5
    )) throw '오류';

ll.insertNextToVal('test3', 'test4');

if(!(
        ll.head.next.next.next.next.next.element === 'test4' &&
        ll.length === 6
    )) throw '오류';

console.dir(ll.head);


ll.insertNextToVal('test3', 'sameVal');
ll.insertNextToVal('test3', 'sameVal');
ll.insertNextToVal('sameVal', 'betweenSameVal');
ll.insertNextToLastVal('sameVal', 'lastSameVal');

if(!(
        ll.head.next.next.next.next.element === 'test3' &&
        ll.head.next.next.next.next.next.element === 'sameVal' &&
        ll.head.next.next.next.next.next.next.element === 'betweenSameVal' &&
        ll.head.next.next.next.next.next.next.next.element === 'sameVal' &&
        ll.head.next.next.next.next.next.next.next.next.element === 'lastSameVal' &&
        ll.length === 10
    )) throw '오류';

ll.removeIndex(9);
ll.removeIndex(0);
ll.removeIndex(2);

if(!(
        ll.head.element === 'test2' &&
        ll.tail.element === 'lastSameVal' &&
        ll.head.next.next.element === 'test3' &&
        ll.length === 7
    )) throw '오류';


console.log('# 출력 : head to tail');
ll.display();

ll.removeVal('test2');
ll.removeLastVal('sameVal');

console.log('# 출력 : head to tail');
ll.display();
console.log('# 출력 : tail to head');
ll.dispReverse();

if(!(
        ll.head.element === 'test2-1' &&
        ll.head.next.next.next.next.element === 'lastSameVal' &&
        ll.length === 5
    )) throw '오류';
*/
