// 기본구조
describe('"함수(인자1, 인자2)" 형식으로 기재한다', function() {
    it('테스트 할 내용을 기재한다', function() {
        expect(true).toBe(true);
    });

    it('테스트 할 내용을 기재한다', function() {
        expect(sum(1,2)).toBe(3);
    });

    it('3+7=10', function() {
        expect(sum(3,7)).toBe(10);
    });

    it('3+7=10', function() {
        expect(function () {
            sum('',3);
        }).toThrow();
    });
});
