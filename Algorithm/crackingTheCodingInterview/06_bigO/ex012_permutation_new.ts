function permutation(str: string, prefix='', result: string[]) : void {
    // 종단점 설정
    if(str.length === 0) {
        result.push(prefix);
    } else {
        for (let i = 0; i < str.length; i++) {
            const pickedChar = str[i],
                rest = str.substr(0, i) + str.substr(i + 1),
                addedPrefix = prefix + pickedChar;
            permutation(rest, addedPrefix, result);
        }
    }
}

const result: string[] = [];
permutation('abc', '', result);
console.debug('\nabc의 순열', result);

/*  */
interface IPermutation {
    _result: string[];
    _str: string;
    printResult(): void;
    _permutation(str: string, prefix: string): void;
}

class StringPermutation implements IPermutation {
    _result: string[] = [];
    _str: string;
    _callCount: number = 0;
    constructor(str: string) {
        this._str = str;
        this._permutation(str);
    }
    reset(str: string) {
        this._str = str;
        this._result = [];
        this._callCount = 0;
        this._permutation(str);
    }
    printResult(): void {
        console.log(`* ${this._str}의 순열 : `);
        console.log(this._result);
        console.log(`call count: ${this._callCount}`)
    }
    _permutation(str: string, prefix=''): void {
        this._callCount++;
        // 종단점 설정
        if(str.length === 0) {
            this._result.push(prefix);
        } else {
            for (let i = 0; i < str.length; i++) {
                const pickedChar = str[i],
                    rest = str.substr(0, i) + str.substr(i + 1),
                    addedPrefix = prefix + pickedChar;
                this._permutation(rest, addedPrefix);
            }
        }
    }
}

const strPermutation = new StringPermutation('abc');
strPermutation.printResult();
strPermutation.reset('abcd');
strPermutation.printResult();


// ;
//
// console.debug('\nabcd의 순열');
// permutation('abcd');

