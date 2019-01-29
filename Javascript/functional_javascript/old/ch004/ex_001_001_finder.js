/**
 * Created by YB on 2016-10-22.
 */

function best (fun, coll) {
    return Array.prototype.reduce.call(coll, function (x, y) {
        return fun(x, y) ? x : y;
    });
}

console.log(`best(function (x, y) { return x > y; }, [1,2,3,4,5]) :  ${best((x, y) => x > y, [1,2,3,4,5])}`);


