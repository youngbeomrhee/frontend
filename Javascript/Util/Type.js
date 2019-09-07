import { missParam } from "./Test";

const dataTypes = {
    'boolean': true,
    'null': null,
    'undefined': undefined,
    number: 0,
    string: '',
    'symbol': Symbol(),
    object: {}
};

export function validType(typeAssertionFunc=missParam(), p=missParam())  {
    if (!typeAssertionFunc(p)) throw Error(`${p}이 ${typeAssertionFunc} 함수체크를 통과하지 못했습니다.`);
}

export function validIntRange(p=missParam(), min=missParam(), max=missParam()) {
    validType(Number.isInteger, p);
    if((p < min) || (p > max)) throw Error(`${p}는 ${min} 이상이고 ${max} 이하여야 합니다.`);
}
