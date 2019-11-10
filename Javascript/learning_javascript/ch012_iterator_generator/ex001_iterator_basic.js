

const book = [
    "Twinkle, twinkle, little bat!",
    "How I wonder what you're at!",
    "Up above the world you fly,",
    "Like a tea tray in the sky.",
    "Twinkle, twinkle, little bat!",
    "How I wonder what you're at!",
];

(_=> {
    console.log('\n# iterator 기본예제');
    const it = book.values();
    console.dir(it);

    console.log(it.next());
    console.log(it.next());
    console.log(it.next());
    console.log(it.next());
    console.log(it.next());
    console.log(it.next());
    console.log(it.next());
    console.log(it.next());
    console.log(it.next());
    }
)();

(_=> {
    console.log('\n# iterator를 활용하여 for of 흉내내보기');
    const it = book.values();
    let current = it.next();
    while(!current.done) {
        console.log(current);
        current = it.next();
    }
})();

(_=> {
    console.log('\n# iterator는 독립적이다');
    const it1 = book.values();
    const it2 = book.values();

    it1.next();
    it1.next();

    it2.next();

    console.assert(it1.next() !== it2.next());
})();


