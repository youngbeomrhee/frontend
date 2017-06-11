// attendeeCollection.iterate 함수의 단위 테스트
/*
  아래 테스트 코드는 다음 두 가지를 확인한다
  1. 콜백 실행 횟수가 정확하다.
  2. 콜백이 실행될 때마다 알맞은 인자가 전달된다.
 */
describe('Conference.attendeeCollection', function() {
  'use strict';

/*
  describe('contains(attendee)', function() {
    // 테스트가 있는지?
  });
  describe('add(attendee)', function() {
    // 테스트 추가
  });
  describe('remove(attendee)', function() {
    // 테스트 삭제
  });
*/

  describe('iterate(callback)', function() {
    var collection, callbackSpy;

    // collection에 attendee를 추가
    function addAttendeesToCollection(attendeeArray) {
      attendeeArray.forEach(function(attendee) {
        collection.add(attendee);
      });
    }

    // collection에 담긴 모든 attendee에 해당하는 callback이 제대로 호출됐는지 여부와 호출횟수를 test
    function verifyCallbackWasExecutedForEachAttendee(attendeeArray) {
      debugger;
      // 각 원소마다 한번씩 스파이가 호출되었는지 확인한다
      expect(callbackSpy.calls.count()).toBe(attendeeArray.length);

      // 각 호출마다 spy에 전달한 첫 번째 인자가 해당 attendee인지 확인한다
      var allCalls = callbackSpy.calls.all();
      for (var i = 0; i < allCalls.length; i++) {
        expect(allCalls[i].args[0]).toBe(attendeeArray[i]);
      }
    }

    beforeEach(function() {
      collection = Conference.attendeeCollection();   // attendee 객체를 담아둘 컬렉션
      callbackSpy = jasmine.createSpy();    // 빈껍데기 스파이 : 특정 객체의 메서드를 체크하지 않는다.
    });

    it('빈 콜렉션에서는 콜백을 실행하지 않는다', function() {
      collection.iterate(callbackSpy);
      expect(callbackSpy).not.toHaveBeenCalled();
    });

    it('콜렉션에 요소가 하나라도 있으면 콜백을 실행한다', function() {
      var attendees = [
        Conference.attendee('윤지', '김'),
      ];
      addAttendeesToCollection(attendees);
      collection.iterate(callbackSpy);

      expect(callbackSpy).toHaveBeenCalled();
      verifyCallbackWasExecutedForEachAttendee(attendees);
    });

    it('원소가 하나뿐인 콜렉션은 콜백을 한번만 실행한다', function() {
      var attendees = [
        Conference.attendee('윤지', '김')
      ];
      addAttendeesToCollection(attendees);

      collection.iterate(callbackSpy);
      verifyCallbackWasExecutedForEachAttendee(attendees);
    });

    it('콜렉션 원소마다 한번씩 콜백을 실행한다', function() {
      var attendees = [
        Conference.attendee('태희', '김'),
        Conference.attendee('정윤', '최'),
        Conference.attendee('유리', '성')
      ];
      addAttendeesToCollection(attendees);

      collection.iterate(callbackSpy);

      verifyCallbackWasExecutedForEachAttendee(attendees);
    });
  });
});