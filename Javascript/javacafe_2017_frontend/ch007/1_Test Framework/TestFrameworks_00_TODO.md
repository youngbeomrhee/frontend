구현명세
==========
### 승객(passenger) 객체, 항공편(flight) 객체를 입력받은 createReservation은 passengeInformation 프로퍼티가 승객 객체, flightInformation 프로퍼티가 항공편 객체인 새로운 객체를 반환한다.

    @param passenger: { firstName: *, lastName: *}
    @param flight: { number: *, carrier: *, destination: *}
    @returns {{passengerInformation: *, flightInformation: *}}

소스 흐름
==========
1. TestFrameworks_01x.x 에서는 함수부터 구현하고 테스트케이스를 작성해보자
2. 문제를 확인하고 TestFrameworks_02x.x 에서는 구현명세에 맞춰 테스트케이스를 먼저 작성해본다
3. TestFrameworks_02x.x의 중복을 제거하여 TestFrameworks_03x.x를 만든다
4. 테스트 더블(test double - 어떤 함수/객체의 본래 구현부를 테스트 도중 다른 (보통은 더 간단한) 코드로 대체한 것) 역할을 하는 재스민 spy를 활용하여 함수의 실행여부를 확인해 본다  