/**
 * Created by whybe on 2018. 3. 17..
 */
// 순열 : 서로 다른 n개의 원소에서 r개를 중복없이 골라 순서에 상관있게 나열하는 것을 n개에서 r개를 택하는 순열이라고 한다
// 현재 예제에서는 가능한 모든 순열을 뽑는다
/**
 * Created by whybe on 2018. 3. 17..
 */
// 순열 : 서로 다른 n개의 원소에서 r개를 중복없이 골라 순서에 상관있게 나열하는 것을 n개에서 r개를 택하는 순열이라고 한다
// 현재 예제에서는 가능한 모든 순열을 뽑는다
let endCallCount=0, iterCount=0;

class CallObj {
    constructor(name) {
        this.name = name;
        // this.인자 = [...params];
        this.children = [];
        this.isEnd = false;
    }
    addChild(callObj) {
        this.children.push(callObj);
    }
    end() {
        this.isEnd = true;
    }
}

function permutation(prefix, str, callObj) {

    if(!(callObj instanceof CallObj)) throw '잘못된 객체가 넘어왔습니다.';
    let childObj = new CallObj(`${arguments.callee.name}(${prefix}, ${str})`);
    callObj.addChild(childObj);

    if(str.length == 0) {	// 모든 문자가 빠짐없이 뽑혀서 더이상 뽑을 문자가 없으면 해당 쓰레드(재귀호출) 종료
        endCallCount++;
        childObj.end();
        console.log('# 완성된 조합 : ' + prefix);
    } else {
        for (var i = 0; i < str.length; i++) {	// 문자의 길이만큼 반복(하며 하나씩 뽑는다)
            iterCount++;
            const picked = str[i];	// 순차적으로(i) 문자 하나씩 뽑는다
            const rest = str.substr(0, i) + str.substr(i + 1);	// str에서 뽑고 난 나머지
            const addedPrefix = prefix + picked;	// 기존의 prefix에 새로 뽑은 문자를 추가

            // console.log(`permutation(prefix=${prefix}, str=${str}) 호출 => 기존 prefix(${prefix})와 뽑은 문자 하나(${picked})를 합쳐서 새로운 prefix(${prefix+picked})로 만들고 나머지문자(${rest})와 함께 재귀호출`);
            // console.trace();
            permutation(addedPrefix, rest, childObj);	// 고정시킬 문자와 나머지 문자를 재지정해서 다시 순열을 뽑는다
        }
    }
}

let callTree = new CallObj('root');
permutation('', 'abc', callTree);

console.log(`## 순열이 완성되는 시점에 permutation 함수가 몇 번이나 호출되는가? => ${endCallCount}
## 순열 생성이 완성되기 전에 permutation 함수는 몇 번이나 호출되는가? => ${iterCount}`);

console.log('## 호출트리 : ');
console.dir(callTree);



