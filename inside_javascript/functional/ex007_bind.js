/**
 * Created by YB on 2016-06-18.
 */

var print_all = function (arg) {
    for (var i in this) { console.log(i + " : " + this[i]); }
    for (var j in arguments) { console.log(j + " : " + arguments[j]); }
}

var myobj = {name: "zzoon"};

var myfunc = print_all.bind(myobj);
myfunc();

var myfunc1 = print_all.bind(myobj, 'yb', 'others');
myfunc1('insidejs');
