구현명세
==========
### 참가자는 1인당 세션을 10개까지 등록할 수 있다 참가자가 한 세션을 등록하면 그 결과를 성공/실패 메시지로 화면에 표시하는 함수를 개발해야 한다

소스 흐름
==========
1. Attendee_nn.js에서 참가자 관리기능을 구현한다
2. Attendee_01.js의 문제점을 찾아서
3. Attendee_02.js에서 리팩토링한다
4. DiContainer_01_tests.js에서 DiContainer_00.js의 register 함수의 실행시에 인자를 확인하는 테스트를 작성한다 -> 실패
5. DiContainer_01_tests.js의 테스트를 통과할 수 있게 DiContainer_01.js를 작성한다
6. DiContainer_02_tests.js에서 의존성이 잘 주입되었는지 확인하는 DiContainer_01.js의 get 메서드를 테스트한다 -> 실패 
7. DiContainer_02_tests.js의 테스트를 통과할 수 있게 DiContainer_02.js를 작성한다
8. DiContainer_03_tests.js에서 DiContainer_02.js의 get메서드의 positive 테스트를 수행한다 -> 실패 
9. DiContainer_03_tests.js의 테스트를 통과할 수 있게 DiContainer_03.js를 작성한다 -> 의도치 않은 실패
10. DiContainer_03_tests.js의 테스트를 통과할 수 있게 DiContainer_03b.js를 작성한다 -> 성공
11. get 메서드가 자신이 반환하는 객체에 의존성을 제공할 수 있게 됐으므로 DiContainer_04_tests.js에 DiContainer_03.js에 1개의 메인 객체와 2개의 의존성을 등록하는 테스트를 만든다. 메인 객체는 두 의존성의 반환값을 합한 값을 반환한다. -> 실패
12. DiContainer_04_tests.js의 테스트를 통과할 수 있게 DiContainer_04.js를 작성한다 -> 성공
13. DiContainer_04_tests.js에 재귀적으로 의존성을 주입하는 테스트를 작성한다.

## 의존성 주입 프레임워크의 작동방식
1. 애플리케이션이 시작되자마자 각 인젝터블명을 확인하고 해당 인젝터블이 지닌 의존성을 지칭하며 순서대로 DI 컨테이너에 등록한다.
2. 객체가 필요하면 컨테이너에 요청한다.
3. 컨테이너는 일단 요청받은 객체와 그 의존성을 모두 재귀적으로 인스턴스화한다. 그런 다음, 요건에 따라 필요한 객체에 각각 주입한다.