/**
 * Created by YB on 2016-11-05.
 */

var agg = (function () {
    var index = 0,
        data = [1,2,3,4,5],
        length = data.length;

    return {
        next: function () {
            var element;
            if (!this.hasNext()) {
                return null;
            }
            element = data[index];
            index = index + 2;
            return element;
        },
        hasNext: function () {
            return index < length;
        },
        rewind: function () {
            index = 0;
        },
        current: function () {
            return data[index];
        }
    };
}());

// 테스트
while (agg.hasNext()) {
    console.log(agg.next());
}

// 처음으로 되돌린다.
agg.rewind();
console.log(`agg.current() : ${agg.current()}`);

console.log('\n### Iterator로 만들기');
function makeIterator(arr) {
    var index = 0,
        data = Array.prototype.slice.call(arr, 0),
        length = data.length;

    return {
        next: function () {
            var element;
            if (!this.hasNext()) {
                return null;
            }
            element = data[index];
            index = index + 1;
            return element;
        },
        hasNext: function () {
            return index < length;
        },
        rewind: function () {
            index = 0;
        },
        current: function () {
            return data[index];
        }
    };
}

(function () {
    var it = makeIterator(arguments);
    while (it.hasNext()) {
        console.log(`it.next() : ${it.next()}`);
    }
}(1, 2, 3));
