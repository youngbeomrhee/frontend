const o = {
    a: 1,
    b: 2
};

let { a: new1, b: new2 }: { a: number, b: number } = o;

function keepWholeObject(wholeObject: { a: string, b?: number | string }) {
    let { a, b = 1001 } = wholeObject;
}

let defaults = { food: "spicy", price: "$$", ambiance: "noisy" };
let search = { ...defaults, food: "rich" };
console.log({...search});   // { food: 'rich', price: '$$', ambiance: 'noisy' }
let search2 = { food: "rich", ...defaults };
console.log({...search2});  // { food: 'spicy', price: '$$', ambiance: 'noisy' }