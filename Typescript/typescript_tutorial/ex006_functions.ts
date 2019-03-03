

/* Writing the function type */
// Named function
function add(x:number, y:number) {
    return x + y;
}

// Anonymous function
let myAdd = function(x: number, y: number): number { return x + y; }

// Arrow function
myAdd = (x, y) => x + y;

// 할당시 정의하지 않으면 오류발생
// myAdd: (x: number, y: number) => number = function(x: number, y: number): number { return x + y; };
let myAdd2: (x: number, y: number) => number = function(x: number, y: number): number { return x + y; };
let myAdd3: (baseValue: number, increment: number) => number = function(x: number, y: number): number { return x + y; };

(() => {
    /* Optional and Default Parameters */
    function buildName(firstName: string, lastName: string) {
        return firstName + " " + lastName;
    }

    // let result1 = buildName("Bob");                  // 오류, 너무 적은 매개변수
    // let result2 = buildName("Bob", "Adams", "Sr.");  // 오류, 너무 많은 매개변수
    let result3 = buildName("Bob", "Adams");         // 아, 딱 맞습니다
})();


(() => {
    function buildName(firstName: string, lastName?: string) {
        if (lastName)
            return firstName + " " + lastName;
        else
            return firstName;
    }

    let result1 = buildName("Bob");                  // 올바르게 작동합니다
    // let result2 = buildName("Bob", "Adams", "Sr.");  // 오류, 너무 많은 매개변수
    let result3 = buildName("Bob", "Adams");         // 아, 딱 맞습니다
})();


(() => {
    function buildName(firstName: string, lastName = "Smith") {
        return firstName + " " + lastName;
    }

    let result1 = buildName("Bob");                  // 올바르게 작동하며 "Bob Smith"를 반환합니다
    let result2 = buildName("Bob", undefined);       // 여전히 작동하며 "Bob Smith"를 반환합니다.
    // let result3 = buildName("Bob", "Adams", "Sr.");  // 오류, 너무 많은 매개변수
    let result4 = buildName("Bob", "Adams");         // 아, 딱 맞습니다
})();

(() => {
    function buildName(firstName = "Will", lastName: string) {
        return firstName + " " + lastName;
    }

    // let result1 = buildName("Bob");                  // 오류, 너무 적은 매개변수
    // let result2 = buildName("Bob", "Adams", "Sr.");  // 오류, 너무 많은 매개변수
    let result3 = buildName("Bob", "Adams");         // 좋아요 "Bob Adams"를 반환합니다
    let result4 = buildName(undefined, "Adams");     // 좋아요 "Will Adams"를 반환합니다

})();


/* Rest Parameters */

(() => {
    function buildName(firstName: string, ...restOfName: string[]) {
        return firstName + " " + restOfName.join(" ");
    }

    let employeeName = buildName("Joseph", "Samuel", "Lucas", "MacKinzie");
})();


(() => {
    function buildName(firstName: string, ...restOfName: string[]) {
        return firstName + " " + restOfName.join(" ");
    }

    let buildNameFun: (fname: string, ...rest: string[]) => string = buildName;
}
)();


let suits = ["hearts", "spades", "clubs", "diamonds"];

function pickCard(x: {suit: string; card: number; }[]): number;
function pickCard(x: number): {suit: string; card: number; };
function pickCard(x: any): any {
    // Check to see if we're working with an object/array
    // if so, they gave us the deck and we'll pick the card
    if (typeof x == "object") {
        let pickedCard = Math.floor(Math.random() * x.length);
        return pickedCard;
    }
    // Otherwise just let them pick the card
    else if (typeof x == "number") {
        let pickedSuit = Math.floor(x / 13);
        return { suit: suits[pickedSuit], card: x % 13 };
    }
}

let myDeck = [{ suit: "diamonds", card: 2 }, { suit: "spades", card: 10 }, { suit: "hearts", card: 4 }];
let pickedCard1 = myDeck[pickCard(myDeck)];
console.log("card: " + pickedCard1.card + " of " + pickedCard1.suit);

let pickedCard2 = pickCard(15);
console.log("card: " + pickedCard2.card + " of " + pickedCard2.suit);

// let pickedCard3 = pickCard('str');
// console.log("card: " + pickedCard3.card + " of " + pickedCard2.suit);

// TODO : 이게 낫지 않나?
function pickCard2(x: {suit: string; card: number; }[] | number): any {
    // Check to see if we're working with an object/array
    // if so, they gave us the deck and we'll pick the card
    if (typeof x == "object") {
        let pickedCard = Math.floor(Math.random() * x.length);
        return pickedCard;
    }
    // Otherwise just let them pick the card
    else if (typeof x == "number") {
        let pickedSuit = Math.floor(x / 13);
        return { suit: suits[pickedSuit], card: x % 13 };
    }
}

