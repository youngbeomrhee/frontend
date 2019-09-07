import { missParam } from 'Test';

export function mustThrow(func=missParam()) {
    let isThrown = false;
    try {
        func();
    } catch(e) {
        isThrown = true;
        return isThrown;
    } finally {
        if(!isThrown) throw `${func} must be thrown`;
    }
}

export const compose = (...funs) => arg => funs.reduce((p, fun) => fun(p), arg);

