// 명령형 프로그래밍(imperative programming)
const string = 'This is the midday show with Cheryl Waters';
let urlFriendly = '';

for (let i = 0; i < string.length; i++) {
    if(string[i] === ' ') {
        urlFriendly += "+";
    } else {
        urlFriendly += string[i];
    }
}

console.log(urlFriendly);

const urlFriendly2 = string.replace(/ /g, "+");
console.log(urlFriendly2);
console.assert(urlFriendly === urlFriendly2);

