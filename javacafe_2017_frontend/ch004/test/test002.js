/**
 * Created by whybe on 2017. 4. 29..
 */
function addPerson(first, last) {
    /*if(arguments.length < 2) {
        throw Error('두 개의 인자가 필요합니다');
    }*/
    return {first: first, last: last};
}

describe('addPerson 함수', function () {
    it('실행시에 2개의 인자를 받지 않으면 exception을 발생시킨다', function () {
        expect(function () {
            addPerson(1);
        }).toThrowError(Error);
    });

});