/**
 * Created by whybe on 2018. 9. 16..
 */
function add1 (x, y) {
    return x + y;
}
console.log(`add1(1, 2) -> `, add1(1, 2));

const add2 = (x, y) => {
    return x + y;
}
console.log(`add2(1, 2) -> `, add2(1, 2));

const add3 = (x, y) => x + y;
console.log(`add3(1, 2) -> `, add3(1, 2));

const add4 = (x, y) => (x + y);
console.log(`add4(1, 2) -> `, add4(1, 2));

function not1(x) {
    return !x;
}
console.log(`not1(true) -> `, not1(true));

const not2 = x => !x;
console.log(`not2(true) -> `, not2(true));

const relationship1 = {
    name: 'zero',
    friends: ['nero', 'hero', 'xero'],
    logFriends: function () {
        const that = this;
        this.friends.forEach(function(friend) {
            console.log(`that.name, friend -> `, that.name, friend);
        });
    }
};
relationship1.logFriends();

const relationship2 = {
    name: 'zero',
    friends: ['nero', 'hero', 'xero'],
    logFriends() {
        this.friends.forEach(friend => {
            console.log(`this.name, friend -> `, this.name, friend);
        });
    }
};
relationship2.logFriends();