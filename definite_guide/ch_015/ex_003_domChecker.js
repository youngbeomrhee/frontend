/**
 * Created by YB on 2016-10-29.
 */

// TODO : 구현해보기
function domChecker(ele_string) {
    var firstPoint = ele_string.indexOf('.'),
        parent = ele_string.slice(0, firstPoint),
        rest = ele_string.slice(firstPoint+1),
        i;
    
    // 프로퍼티가 존재하면
    if(typeof parent === "undefined") {
        return parent
    }

    parent = parent[parts[i]];
};