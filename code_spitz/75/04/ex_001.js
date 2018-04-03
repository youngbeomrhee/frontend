/**
 * Created by yblee on 2018-04-02.
 */

const sel = (v, el=document) => el.querySelector(v);
const el = (tag, ...attr) => {
    const el = typeof tag === 'string' ? document.createElement(tag) : tag;
    for (let i = 0; i < attr.length;) {
        const k = attr[i++], v = attr[i++];
        if(typeof el[k] === 'function') {
            el[k](...(Array.isArray(v) ? v : [v]));
        } else if(k[0] === '@') {
            el.style[k.substr(1)] = v;
        } else {
            el[k] = v;
        }
        return el;
    }
}

