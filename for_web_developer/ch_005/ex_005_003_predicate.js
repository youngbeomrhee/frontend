/**
 * Created by yblee on 2016-06-10.
 */

function creatObjectPredicateFunction(propertyName) {
    return function(object1, object2) {
        var value1 = object1[propertyName];
        var value2 = object2[propertyName];

        if(value1 < value2) {
            return -1;
        } else if(value1 > value2) {
            return 1;
        } else {
            return 0;
        }
    };
}

var data = [{name: "Zach", age: 28}, {name: "Nichol", age: 29}];

data.sort(creatObjectPredicateFunction("name"));
console.log(data);

data.sort(creatObjectPredicateFunction("age"));
console.log(data);

