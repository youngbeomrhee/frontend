/**
 * Created by yblee on 2017-04-28.
 */


function addPerson() {
  if(arguments.length < 2) {
    throw Error('인자가 없습니다.');
  } else if(Array.prototype.some.call(arguments, function (arg) { return typeof arg !== 'string'; })) {
    throw Error('최초의 2개의 인자는 모두 String 타입이어야 합니다.');
  }

  var keys = ['first', 'last', 'dob', 'gender', 'address'],
    args = Array.prototype.slice.call(arguments),
    i = 0;

  return keys.reduce(function(prev, next) {
    var tempObj = {};
    tempObj[next] = args[i];
    prev.push(tempObj);
    i++;
    return prev;
  }, []);
}


describe('addPerson 함수', function () {

  it('실행시에 2개의 인자를 받지 않으면 exception을 발생시킨다', function () {
    expect(function () { addPerson(1); }).toThrowError(Error);
  });

  it('실행시에 2개의 인자가 있으면 exception을 발생시키지 않는다', function () {
    expect(function () { addPerson(1, 2); }).not.toThrowError('인자가 없습니다.');
  });

  it('실행시에 2개의 인자는 String 타입이어야 한다.', function () {
    expect(function () { addPerson(1, 2); }).toThrowError('최초의 2개의 인자는 모두 String 타입이어야 합니다.');
    expect(function () { addPerson('s', 's'); }).not.toThrowError();
  });
});


// TODO : 리턴한 결과값에 대한 유효성 검증
describe('return test', function () {
/*
  it('실행한 결과로 반환되는건 객체여야 한다.', function () {
    expect(addPerson('test', 'test')).toBe(jasmine.objectContaining({first : 'test', last: 'test'}));
  });
*/

  /*

   it('실행시에 이름과 성 2개의 인자를 받는다', function () {
   // spyOn(window, 'addPerson');
   // addPerson(1, 2);
   expect(function () { addPerson()}).toHaveBeenCalledWith(jasmine.anything(), jasmine.anything());

   });
   */
});
