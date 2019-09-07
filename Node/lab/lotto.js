const apply = ['a', 'b', 'c', 'd', 'e'];
const winner = [];

// TODO : assertion 관련 메서드 추가
const isDebugging = true,
    debug = console.debug;

class Lottery {
    constructor(candidates) {
        this.candidates = candidates;
        this.winner = [];
    }
    whoIsWinner(num=1) {
        for (let i = 1; i < num; i++) {
            let winnerIdx = getRandomInt(1, this.candidates.length-1),
                winner = this.candidates[winnerIdx];
        }
    }
    _getRandomIntInclusive(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    getCandidates() {
        return this.candidates;
    }
}

// function getWinner(applies, winners) {
//     const applyLength = applies.length,
//         idx = getRandomIntInclusive(1, applyLength-1),
//         winner = applies[idx];
//     console.log(winner);
//
//     winners.push(applies.splice(idx, 1));
// }

// getWinner(apply, winner);


function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// 같은 배열인지 확인. 연산비용이 적은 순서로 비교
function isSameArrays(arr1, arr2) {
    return Array.isArray(arr1) && Array.isArray(arr2) && (arr1.length === arr2.length) && (JSON.stringify(arr1) === JSON.stringify(arr2));
}

function assertTrue(candidates1, candidates2, assertion) {
    if(assertion) {
        if(!assertion(candidates1, candidates2)) { throw Error(`${candidates1} is not equal to ${candidates2}`); }
        return true;
    } else {
        if(candidates1 !== candidates2) { throw Error(`${candidates1} is not equal to ${candidates2}`); }
        return true;
    }
}

function describe(desc, testFunc, ...params){
    try {
        testFunc.apply(null, params);
    } catch(e) {
        console.error(desc, '-', e.message);
    }
}



// test cases
isDebugging && (() => {
    console.log('# debugging');
    const candidates = ['a', 'b', 'c', 'd', 'e'],
        lottery = new Lottery(candidates);

    // debug();
    describe('아무 연산도 하지 않은 lottery의 후보는 초기화때 입력해 준 값과 같다', ()=> {
        assertTrue(1, lottery.getCandidates(), isSameArrays);
    });

    //
    // const returnedCandidates = lottery.getCandidates();
    // returnedCandidates.add('returnedCandidates');

})();


