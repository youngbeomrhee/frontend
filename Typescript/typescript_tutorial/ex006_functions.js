"use strict";
/* Writing the function type */
// Named function
function add(x, y) {
    return x + y;
}
// Anonymous function
var myAdd = function (x, y) { return x + y; };
// Arrow function
myAdd = function (x, y) { return x + y; };
// 할당시 정의하지 않으면 오류발생
// myAdd: (x: number, y: number) => number = function(x: number, y: number): number { return x + y; };
var myAdd2 = function (x, y) { return x + y; };
var myAdd3 = function (x, y) { return x + y; };
(function () {
    /* Optional and Default Parameters */
    function buildName(firstName, lastName) {
        return firstName + " " + lastName;
    }
    // let result1 = buildName("Bob");                  // 오류, 너무 적은 매개변수
    // let result2 = buildName("Bob", "Adams", "Sr.");  // 오류, 너무 많은 매개변수
    var result3 = buildName("Bob", "Adams"); // 아, 딱 맞습니다
})();
(function () {
    var myAdd = function (x, y) { return x + y; };
});
(function () {
    function buildName(firstName, lastName) {
        if (lastName)
            return firstName + " " + lastName;
        else
            return firstName;
    }
    var result1 = buildName("Bob"); // 올바르게 작동합니다
    // let result2 = buildName("Bob", "Adams", "Sr.");  // 오류, 너무 많은 매개변수
    var result3 = buildName("Bob", "Adams"); // 아, 딱 맞습니다
})();
(function () {
    function buildName(firstName, lastName) {
        if (lastName === void 0) { lastName = "Smith"; }
        return firstName + " " + lastName;
    }
    var result1 = buildName("Bob"); // 올바르게 작동하며 "Bob Smith"를 반환합니다
    var result2 = buildName("Bob", undefined); // 여전히 작동하며 "Bob Smith"를 반환합니다.
    console.log('# result2', result2);
    var result3 = buildName("Bob", null); // 여전히 작동하며 "Bob Smith"를 반환합니다.
    console.log('# result3', result3);
    // let result3 = buildName("Bob", "Adams", "Sr.");  // 오류, 너무 많은 매개변수
    var result4 = buildName("Bob", "Adams"); // 아, 딱 맞습니다
})();
(function () {
    function buildName(firstName, lastName) {
        if (firstName === void 0) { firstName = "Will"; }
        return firstName + " " + lastName;
    }
    // let result1 = buildName("Bob");                  // 오류, 너무 적은 매개변수
    // let result2 = buildName("Bob", "Adams", "Sr.");  // 오류, 너무 많은 매개변수
    var result3 = buildName("Bob", "Adams"); // 좋아요 "Bob Adams"를 반환합니다
    var result4 = buildName(undefined, "Adams"); // 좋아요 "Will Adams"를 반환합니다
})();
/* Rest Parameters */
(function () {
    function buildName(firstName) {
        var restOfName = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            restOfName[_i - 1] = arguments[_i];
        }
        return firstName + " " + restOfName.join(" ");
    }
    var employeeName = buildName("Joseph", "Samuel", "Lucas", "MacKinzie");
})();
(function () {
    function buildName(firstName) {
        var restOfName = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            restOfName[_i - 1] = arguments[_i];
        }
        return firstName + " " + restOfName.join(" ");
    }
    var buildNameFun = buildName;
})();
var suits = ["hearts", "spades", "clubs", "diamonds"];
function pickCard(x) {
    // Check to see if we're working with an object/array
    // if so, they gave us the deck and we'll pick the card
    if (typeof x == "object") {
        var pickedCard = Math.floor(Math.random() * x.length);
        return pickedCard;
    }
    // Otherwise just let them pick the card
    else if (typeof x == "number") {
        var pickedSuit = Math.floor(x / 13);
        return { suit: suits[pickedSuit], card: x % 13 };
    }
}
var myDeck = [{ suit: "diamonds", card: 2 }, { suit: "spades", card: 10 }, { suit: "hearts", card: 4 }];
var pickedCard1 = myDeck[pickCard(myDeck)];
console.log("card: " + pickedCard1.card + " of " + pickedCard1.suit);
var pickedCard2 = pickCard(15);
console.log("card: " + pickedCard2.card + " of " + pickedCard2.suit);
// let pickedCard3 = pickCard('str');
// console.log("card: " + pickedCard3.card + " of " + pickedCard2.suit);
// TODO : 이게 낫지 않나?
function pickCard2(x) {
    // Check to see if we're working with an object/array
    // if so, they gave us the deck and we'll pick the card
    if (typeof x == "object") {
        var pickedCard = Math.floor(Math.random() * x.length);
        return pickedCard;
    }
    // Otherwise just let them pick the card
    else if (typeof x == "number") {
        var pickedSuit = Math.floor(x / 13);
        return { suit: suits[pickedSuit], card: x % 13 };
    }
}
