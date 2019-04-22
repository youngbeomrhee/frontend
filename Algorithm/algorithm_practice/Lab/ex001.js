
const votes = [
    12,
    'Alex',
    'Michael',
    'Harry',
    'Dave',
    'Michael',
    'Michaem',
    'Michaem',
    'Victor',
    'Harry',
    'Alex',
    'Mary',
    'Mary'
];

// function electionWinner(votes) {
//     const n = votes[0],
//         pollingScore = {},
//         maxVotedCandidates = [];
//     let maxScore = 0;
//
//     if(n < 1 || n > Math.pow(10, 4)) { throw Error('입력값의 범위는 "1이상 10의 4승"까지만 허용됩니다'); }
//
//     // function getCharIdx(char) {
//     //     if(typeof char !== 'string' && char.length !== 1) { throw Error('한 글자의 문자만 허용됩니다.'); }
//     //     return char.charCodeAt();
//     // }
//     //
//
//     for (let i = 1; i < n; i++) {
//         // const charIdx = getCharIdx(votes[i][0]);
//         // console.log(charIdx);
//         // 이미 charIdx로 데이터가 입력되어있지 않은 경우는 새로운 배열생성,
//         const temp = votes[i];
//         if(!pollingScore[temp]) {
//             pollingScore[temp] = { score: 1};
//         } else {
//             const score = pollingScore[temp].score + 1;
//             if(score > maxScore) {
//                 maxScore = score;
//             }
//             pollingScore[temp].score = score;
//         }
//     }
//     console.dir(pollingScore);
//
//     for(let name in pollingScore) {
//         if(pollingScore[name].score === maxScore) {
//             maxVotedCandidates.push(name);
//         }
//     }
//     console.dir(maxVotedCandidates);
//
//     // maxVotedCandidates.sort((a, b) => String.fromCharCode(a)-String.fromCharCode(b));
//     maxVotedCandidates.sort();
//     console.dir(maxVotedCandidates);
//     if(maxVotedCandidates.length === 1) {
//         return maxVotedCandidates[0];
//     } else {
//         maxVotedCandidates.sort();
//         return maxVotedCandidates[maxVotedCandidates.length-1];
//     }
// }



function electionWinner(votes) {
    const n = votes[0],     // 입력값의 갯수
            pollingScore = {},  // 전체 득표수가 담길 객체
            maxVotedCandidates = []; // 득표수가 가장 많은 후보자가 담길 배열
    let maxScore = 0;   // 최대 득표수 기록

    // 제한조건을 넘어서는 경우는 모두 에러로 처리
    if (n < 1 || n > Math.pow(10, 4)) { throw Error('입력값의 범위는 "1 <= n <= 10의 4승"까지만 허용됩니다.'); }

    // 전체 선회를 피할수는 없으므로 O(n) 동안 돌면서 현재의 배열을 { name: {score: x}, name2: {score: y}.. }의 형태로 가공한다
    for (let i = 1; i < n; i++) {
        const temp = votes[i];
        // 이미 이름과 일치하는 데이터가 없는 경우 score를 1로 초기화
        if (!pollingScore[temp]) {
            pollingScore[temp] = { score: 1 };
        } else {
            // 이미 이름과 일치하는 데이터가 있는 경우 score에 1추가
            const score = pollingScore[temp].score + 1;
            if (score > maxScore) {
                maxScore = score;
            }
            pollingScore[temp].score = score;
        }
    }

    // 최대득표를 한 사람을 배열에 push
    for (let name in pollingScore) {
        if (pollingScore[name].score === maxScore) {
            maxVotedCandidates.push(name);
        }
    }

    // 최대득표자가 한 명이면 결과 리턴
    if (maxVotedCandidates.length === 1) {
        return maxVotedCandidates[0];
    } else {
        // 복수인 경우 이름으로 정렬 후 마지막 요소 리턴
        maxVotedCandidates.sort();
        return maxVotedCandidates[maxVotedCandidates.length - 1];
    }
}



console.log(electionWinner(votes));

