// 의존성 주입을 설정에 활용해보자
var MyApp = MyApp || {};

MyApp.diContainer = new DiContainer();

MyApp.diContainer.register(
    'Service',    // 웹 서비스를 가리키는 DI 태그
    [],           // 의존성 없음
                  // 인스턴스를 반환하는 함수
    function () {
        return new ConferenceWebSvc();
    }
);

MyApp.diContainer.register(
    'Messenger',
    [],
    function () {
        return new Messenger();
    }
);

MyApp.diContainer.register(
    'AttendeeFactory',
    ['Service', 'Messenger'],   // Attendee는 service 및 messenger에 의존한다.
    function (service, messenger) {
        return function (attendeeId) {
            return new Attendee(service, messenger, attendeeId);
        };
    }
);

var attendeeId = 123,
    sessionId = 1;

var attendee = MyApp.diContainer.get('AttendeeFactory')(attendeeId);
attendee.reserve(sessionId);

function ConferenceWebSvc() {
}
function Messenger() {
}