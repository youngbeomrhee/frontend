/**
 * Created by yblee on 2017-03-27.
 */
/*
 아래에 나오는 함수를 함수형으로 구현해 보는게 문제입니다 :)
 스텝바이 스텝으로 책에 나온 과정처럼 기본 기능 구현 -> 추상화 -> 함수의 조합으로 문제 해결 이렇게 해보시면 좋습니다

 sum(1, 2, 3, 4, 5);
 sumArr([1, 2, 3, 4, 5]);
 safeSum(1, null, 3, 4, 5);
 safeMultiply(1, null, 3, 4, 5);
 checkObj(객체형인지 확인, 특정프로퍼티가 있는지 확인, 특정 프로퍼티의 값이 숫자인지 확인);
 */

describe("단순한 sum test", () => {
  it("sum(1, 2, 3, 4, 5) === 15", () => {
    expect(sum(1, 2, 3, 4, 5)).toBe(15);
  });
  it("sumArr([1,2,3,4,5]) === 15", () => {
    expect(sumArr([1,2,3,4,5])).toBe(15);
  });
});

describe("안전한 safeSum test", () => {
  it("safeSum(1, 2, 3, 4, 5) === 15", () => {
    expect(safeSum(1, 2, 3, 4, 5)).toBe(15);
  });
  it("safeSum(1, 2, 3, 4, 5, null) === 15", () => {
    expect(safeSum(1, 2, 3, 4, 5, null)).toBe(15);
  });
  it('safeSum(1, 2, "str", 3, null, undefined, {}, 4, [], 5) === 15', () => {
    expect(safeSum(1, 2, "str", 3, null, undefined, {}, 4, [], 5)).toBe(15);
  });
});

describe("type 체크 함수 test", () => {
  describe("isNumber test", () => {
    it("isNumber(1) === true", () => {
      expect(isNumber(1)).toBe(true);
    });
    it("isNumber('str') === false", () => {
      expect(isNumber('str')).toBe(false);
    });
    it("isNumber([]) === false", () => {
      expect(isNumber([])).toBe(false);
    });
    it("isNumber({}) === false", () => {
      expect(isNumber({})).toBe(false);
    });
    it("isNumber(true) === false", () => {
      expect(isNumber(true)).toBe(false);
    });
  });
  
  describe("isObject test", () => {
    it("isObject({}) === true", () => {
      expect(isObject({})).toBe(true);
    });
    it("isObject('str') === false", () => {
      expect(isObject('str')).toBe(false);
    });
    it("isObject([]) === false", () => {
      expect(isObject([])).toBe(false);
    });
    it("isObject(true) === false", () => {
      expect(isObject(true)).toBe(false);
    });
    it("isObject(1) === false", () => {
      expect(isObject(1)).toBe(false);
    });
  });
});


describe("hasProp1Numval 함수 test", () => {
  it("hasProp1Numval(1) -> 3개의 에러 메시지 리턴", () => {
    expect(hasProp1Numval(1).length).toBe(3);
  });
  it("hasProp1Numval([]) -> 3개의 에러 메시지 리턴", () => {
    expect(hasProp1Numval([]).length).toBe(3);
  });
  it("hasProp1Numval({}) -> 2개의 에러 메시지 리턴", () => {
    expect(hasProp1Numval({}).length).toBe(2);
  });
  it("hasProp1Numval({prop1: 'str'}) -> 1개의 에러 메시지 리턴", () => {
    expect(hasProp1Numval({prop1: 'str'}).length).toBe(1);
  });
  it("hasProp1Numval({prop1: 1}) -> 0개의 에러 메시지 리턴", () => {
    expect(hasProp1Numval({prop1: 1}).length).toBe(0);
  });
});

