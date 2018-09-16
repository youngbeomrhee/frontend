/**
 * Created by whybe on 2018. 9. 16..
 */
const array = ['nodejs', {}, 10, true],
    node = array[0],
    obj = array[1],
    bool = array[array.length - 1];

const [node2, obj2, , bool2] = array;
console.log(`node, obj, bool -> `, node, obj, bool);
console.log(`node2, obj2, bool2 -> `, node2, obj2, bool2);
