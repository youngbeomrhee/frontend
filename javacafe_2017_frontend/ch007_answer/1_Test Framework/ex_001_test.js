/**
 * Created by whybe on 2017. 6. 6..
 */
// 숫자 인자 2개를 받는 sum 함수를 구현해보자
describe('sum(p1, p2)', function() {
    it('sum(1, 2) = 3', function() {
        var param1 = 1,
            param2 = 2;

        var total = sum(param1, param2);
        expect(total).toBe(3);
    });
    it('sum(4, 8) = 12', function() {
        var param1 = 4,
            param2 = 8;

        var total = sum(param1, param2);
        expect(total).toBe(12);
    });
});