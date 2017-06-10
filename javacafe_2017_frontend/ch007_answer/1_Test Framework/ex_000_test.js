// 테스트 코드를 보고 구현부를 예상해본다
// 기본구조
describe('"함수(인자1, 인자2)" 형식으로 기재한다', function() {
    it('테스트 할 내용을 기재한다', function() {
        expect(true).toBe(true);
    });

    // 무조건 true를 리턴하는 true 함수를 구현해보자
    it('func() === true', function () {
        expect(func()).toBe(true);
    });
});
