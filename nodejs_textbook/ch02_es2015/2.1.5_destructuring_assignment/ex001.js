/**
 * Created by whybe on 2018. 9. 16..
 */
/*
const candyMachine = {
    status: {
        name: 'node',
        count: 5
    },
    getCandy: function () {
        this.status.count--;
        return this.status.count;
    }
};
const getCandy = candyMachine.getCandy,
    count = candyMachine.status.count;

console.log(`count -> `, count);
console.log(`getCandy() -> `, getCandy());
console.log(`count -> `, count);
*/



const candyMachine2 = {
    status: {
        name: 'node',
        count: 5
    },
    getCandy() {
        this.status.count--;
        return this.status.count;
    }
};
const {getCandy, status: {count2}} = candyMachine2;

console.log(`count2 -> `, count2);
console.log(`getCandy2() -> `, getCandy());
console.log(`count2 -> `, count2);

// TODO : this 바인딩에 대한 오류수정