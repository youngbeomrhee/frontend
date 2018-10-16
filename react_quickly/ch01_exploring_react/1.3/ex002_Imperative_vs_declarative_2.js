/**
 * Created by whybe on 2018. 9. 16..
 */

// 명령형
function getNestedValueImperatively(object, propertyName) {
    const propertyNameList = propertyName.split('.'),
        maxNestedLevel = propertyNameList.length;
    let currentObject = object;

    for (let currentNestedLevel = 0; currentNestedLevel < maxNestedLevel; currentNestedLevel++) {
        if(!currentObject || typeof currentObject === 'undefined') return undefined;
        currentObject = currentObject[propertyNameList[currentNestedLevel]];
    }
    return currentObject;
}

const profile = {account: '47574416'},
    profileDeep = {account: {number: 47574416}},
    profileDeep2 = {account: {number: {serial: 47574416}}};

console.log(getNestedValueImperatively(profile, 'account') === '47574416');
console.log(getNestedValueImperatively(profileDeep, 'account.number') === 47574416);
console.log(getNestedValueImperatively(profileDeep2, 'account.number.serial') === 47574416);


// 선언형
function getValue(object, propertyName) {
    return !object ? undefined : object[propertyName];
}

function getNestedValueDeclaratively(object, propertyName) {
    // return propertyName.split('.').reduce(function (object, propertyName) {
    //     return !object ? undefined : object[propertyName];
    // }, object);
    return propertyName.split('.').reduce(getValue, object);
}

console.log(getNestedValueDeclaratively({bar: 'baz'}, 'bar') === 'baz');
console.log(getNestedValueDeclaratively({bar: {baz: 1}}, 'bar.baz') === 1);