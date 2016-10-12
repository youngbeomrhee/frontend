/**
 * Created by yblee on 2016-10-10.
 */
// 명령형 프로그래밍을 함수형 프로그래밍으로

function lyricSegment(n) {
  return _.chain([])
    .push(n + ' bottles of beer on the wall')
    .push(n + ' bottles of beer')
    .push('take one pass')
    .tap(function(lyrics) {
      if(n>1)
        lyrics.push((n-1) + ' bottles of beer on the wall.');
      else
        lyrics.push('no more');
    })
    .value();
}

function song(start, end, lyricGen) {
  return _.reduce(_.range(start, end, -1),
    function (acc, n) {
      return acc.concat(lyricGen(n));
    }, []);
}
