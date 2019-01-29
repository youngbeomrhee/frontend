// 인자를 확인하는 테스트
/*
  - container는 '테스트 대상'으로 beforeEach에서 생성된다 테스트마다 인스턴스를 갓 구워내면 다른 테스트의 결과를 어지럽히지 않아도 된다.
  - 중첩된 describes와 it 함수가 인자로 받은 문자열을 죽 이어서 읽어보면
    "DiContainer register(name, dependencies, func)는 인자가 하나라도 누락되었거나 타입이 잘못되면 예외를 던진다."는 문장이 된다.
*/
describe('DiContainer', function() {
  var container;
  beforeEach(function() {
    container = new DiContainer();
  });
  describe('register(name,dependencies,func)', function() {

    // 01
    it('인자가 하나라도 누락되었거나 타입이 잘못되면 예외를 던진다', function() {
      var badArgs = [
        // 인자가 아예 없는 경우
        [],
        // name만 있는 경우
        ['Name'],
        // name과 dependencies만 있는 경우
        ['Name',['Dependency1','Dependency2']],
        // dependencies가 누락된 경우
        // (상용 프레임워크는 지원하지만 DiContainer는 지원하지 않음)
        ['Name', function() {}],
        // 타입이 잘못된 다양한 사례들
        [1,['a','b'], function() {}],
        ['Name',[1,2], function() {}],
        ['Name',['a','b'], 'should be a function']
      ];
      badArgs.forEach(function(args) {
        expect(function() {
          container.register.apply(container,args);
        // }).toThrow();
        }).toThrowError(container.messages.registerRequiresArgs);
        // 보다 정확하고 명확한 테스트를 위해 .toThrowError(container.messages.registerReqeuiresArgs); 와 같이 테스트 할수도 있다.
      });
    });
  });
});