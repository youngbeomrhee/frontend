/**
 * Created by whybe on 2018. 9. 16..
 */
const sayNode = function () {
    console.log(`node`);
}
const es = 'ES',
    oldObject = {
        sayJS: function () {
            console.log(`JS`);
        },
        sayNode: sayNode
    };
oldObject[es + 6] = 'fantastic';

oldObject.sayNode();
oldObject.sayJS();
console.log(`oldObject.ES6 -> `, oldObject.ES6);

const newObject = {
        sayJS() {
            console.log(`JS`);
        },
        sayNode,
        [es + 6]: 'fantastic'
    };

newObject.sayNode();
newObject.sayJS();
console.log(`newObject.ES6 -> `, newObject.ES6);
