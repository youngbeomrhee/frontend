/*

*/
// 컨테이너는 인젝터블과 의존성을 등록하고, 요청 시 객체를 내어주는 두 가지 일을 한다
DiContainer = function() {
};
/**
 *
 * @param name : 인젝터블명
 * @param dependencies : 의존성 명을 담은 배열
 * @param func : 인젝터블 객체를 반환하는 함수. 인젝터블 인스턴스를 요청하면 컨테이너는 이 함수를 호출하여 반환값을 다시 그대로 반환한다.
 *  또한, 컨테이너는 요청받은 객체의 의존성 인스턴스 역시 이 함수에 전달한다
 */
DiContainer.prototype.register = function(name,dependencies,func) {
  // 처음 버전이라 하는 일이 없다.
};