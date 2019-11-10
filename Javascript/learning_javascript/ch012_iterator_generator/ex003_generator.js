(_=> {
    console.log('\n# 제너레이터의 특징 \n1.함수의 실행을 개별적 단계로 나눔으로써 함수의 실행을 제어한다. \n2. 실행중인 함수와 통신한다.');
    function* rainbow() {
        yield 'red';
        yield 'orange';
        yield 'yellow';
        yield 'green';
        yield 'blue';
        yield 'indigo';
        yield 'violet';
    }

    const it = rainbow();
    for(let color of it) {
        console.log(color);
    }
})();