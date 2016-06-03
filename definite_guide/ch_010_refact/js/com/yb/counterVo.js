/**
 * Created by yblee on 2016-06-03.
 */

if(!com.yb.counterVo) {
    com.yb.counterVo = {};
} else {
    createObjException('com.yb.counterVo');
}

(function(){
    var cntVo = com.yb.counterVo;

    var counter = 0;

    cntVo.getCounter = function() {
        console.log('counter : ' + counter);
        return counter;
    };

    cntVo.addCounter = function() {
        console.log('counter++');
        counter++;
    };

    cntVo.resetCounter = function() {
        console.log('counter\'s initialized');
        counter = 0;
    };
})();
