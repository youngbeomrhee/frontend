(_ => {
    function* abc() {
        yield 'a';
        yield 'b';
        return 'c';
        yield 'd';
    }

    console.log('\n# 제너레이터 내부에서 return문을 만나는 경우 done은 true로 바뀌고 중단됩니다');
    const it = abc();
    console.log(it.next());
    console.log(it.next());
    console.log(it.next());
    console.log(it.next());

    console.log('\n# 제너레이터에서는 return문을 해당 제너레이터를 중단시키는 경우에만 사용해야 합니다(return에는 반환값을 쓰지 않는게 좋다)');
    const it2 = abc();
    for(let l of it2) {
        console.log(l);
    }
    console.log('c는 출력되지 않');
})();