(_=> {
    console.log('\n# yield 표현식과 양방향 통신');

    function* interrogate() {
        const name = yield 'What is your name?';
        console.log(name);
        const color = yield 'What is your favorite color?';
        console.log(color);
        return `${name}'s favorite color is ${color}`;
    }

    const it = interrogate();

    console.log(it.next().value);
    console.log(it.next('Ethan').value);
    console.log(it.next('Orange').value);
})();