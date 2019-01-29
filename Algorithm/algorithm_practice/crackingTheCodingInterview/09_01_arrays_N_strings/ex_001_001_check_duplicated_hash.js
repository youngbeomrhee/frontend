/**
 * Created by yblee on 2018-03-30.
 */
class StrHashTable {
    constructor(max) {
        this.max = max;
        this.storage = [];
    }
    hashKey(s) {
        return 'hash' + (s.charCodeAt() % this.max);
    }
    insert(s) {
        const key = this.hashKey(s);
        if(this.storage[key]) {
            this.storage[key].push(s);
        } else {
            this.storage[key] = [s];
        }
    }
    insertAll(str) {
        for (let i = 0; i < str.length; i++) {
            let temp = str[i];
            this.insert(temp);
        }
    }
}

const str = 'asdkjfh2ihisudhㅁㄴㅇㄹ;ㅣㅏfis)(*^*^%#uhd23ㅁㄴㅇ라ㅓㅗㄴ아ㅓ로w9E87aFYOASDVGSAh9w783ra;sldkfja;sldkjf;laskjdfl;joi203093sl;dfkjas;ldfkja;sldfg\][892uy0thokl,m.asd;;hgjlkasjdg;l+_)(_*240t;oadsfng@!#$;lkahj32ㅛ5ㅐㅑㅓt208hy048;ldasdflㅂㅈㅅㄷiouㅌ치카퍼hwel&^%fubv0ㅁㄴㅁ노102b onweofwegfㅋㅌ치ㅏ퍼[dㅁ닝러ㅗky293h8ㅁㄹ야ㅕㅈ도ㅑ려ㅗ타촢hsdf7@%$!<>{}9h9823h';

const charHashes = new StrHashTable(65535);
charHashes.insertAll(str);
console.dir(charHashes.storage);