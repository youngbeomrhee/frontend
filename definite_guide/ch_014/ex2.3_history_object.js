/**
 * Created by yblee on 2016-10-11.
 */

function getArgs(locSearch) {
  var args = {};
  var query = locSearch || document.location.search;
  query = query.replace(/\?/, '');    // 물음표 삭제
  var pairs = query.split('&');
  for (var i = 0; i < pairs.length; i++) {
    var pair = pairs[i];
    var pos = pair.indexOf('=');    // "이름=값"을 찾는다.
    if(pos === -1) continue;    // 찾지 못했다면 건너뛴다.
    var argname = pair.substring(0, pos);   // 이름을 추출한다.
    var value = pair.substring(pos + 1);    // 값을 추출한다.
    value = decodeURIComponent(value);
    args[argname] = value;
  }
  return args;
}


console.log(getArgs('?gfe_rd=cr&ei=KVH8V8iPEIammQWp57bQCg'));
console.log(getArgs());   // 브라우져에서 실행