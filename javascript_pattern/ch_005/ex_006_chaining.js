/**
 * Created by YB on 2016-10-15.
 */

var obj = {
    value: 1,
    increment: function () {
        this.value += 1;
        return this;
    },
    add: function (v) {
        this.value += v;
        return this;
    },
    shout: function () {
        alert(this.value);
    }
};

obj.increment().add(3).shout();
