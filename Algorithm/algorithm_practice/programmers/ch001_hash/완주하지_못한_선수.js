/*

# 문제 설명
수많은 마라톤 선수들이 마라톤에 참여하였습니다. 단 한 명의 선수를 제외하고는 모든 선수가 마라톤을 완주하였습니다.

마라톤에 참여한 선수들의 이름이 담긴 배열 participant와 완주한 선수들의 이름이 담긴 배열 completion이 주어질 때, 완주하지 못한 선수의 이름을 return 하도록 solution 함수를 작성해주세요.

# 제한사항
마라톤 경기에 참여한 선수의 수는 1명 이상 100,000명 이하입니다.
completion의 길이는 participant의 길이보다 1 작습니다.
참가자의 이름은 1개 이상 20개 이하의 알파벳 소문자로 이루어져 있습니다.
참가자 중에는 동명이인이 있을 수 있습니다.

# 입출력 예
[leo, kiki, eden]	[eden, kiki] => leo
[marina, josipa, nikola, vinko, filipa]	[josipa, filipa, marina, nikola] => vinko
[mislav, stanko, mislav, ana]	[stanko, ana, mislav] => mislav

# 입출력 예 설명
예제 #1
leo는 참여자 명단에는 있지만, 완주자 명단에는 없기 때문에 완주하지 못했습니다.

예제 #2
vinko는 참여자 명단에는 있지만, 완주자 명단에는 없기 때문에 완주하지 못했습니다.

예제 #3
mislav는 참여자 명단에는 두 명이 있지만, 완주자 명단에는 한 명밖에 없기 때문에 한명은 완주하지 못했습니다.

 */

// N : participants.length

function solution(participants, completions) {
  let answer = null;

  // 1번 해볍
  // participants 순회 * completions 순회 2번(completions.indexOf, completions.splice)
  // O(N*2*(N-1)) = O(2N^2)
  // answer = solution1(participants, completions);

  // 2번 해법
  // 결국 관건은 participants 전체 순회(O(N))는 피할 수 없으므로 compeletions 배열을 순회(O(2*(N-1))를 줄이는 작업
  // completions을 가공하여 첫 글자를 hash key로 갖는 새로운 hashTable을 만든다
  // completions 순회(genCharHashTable) + participants 순회 * (최악의 경우 모두 첫 글자가 같은 경우) completions
  // O((N-1) + (N*(N-1))) = O(N^2)
  // 최악의 경우 절반의 big-O로 해결할 수 있지만 실제로는 훨씬 나은 성능을 보임
  // solution1의 O가 solutionWithInitialHash O보다 항상 크므로 N의 조건에 상관없이 solutionWithInitialHash 해결
  // answer = solutionWithInitialHash(participants, completions);

  answer = solutionWithDictionaryHash(participants, completions);

  return answer;
}

function solution1(participants, completions) {
  let answer = null,
    participant = null,
    matchedIdx = -1;

  for(var i=0; i<participants.length; i++) {  // O(N)
    participant = participants[i];
    matchedIdx = completions.indexOf(participant);  // O(N-1)
    if(matchedIdx<0) {
      answer = participant;
      break;
    } else {
      completions.splice(matchedIdx, 1);  // O(N-1)
    }
  }
  return answer;
}

function genCharHashTable(arrs) {
  return arrs.reduce((accum, temp)=>{
    const charIdx = temp[0];
    if(accum[charIdx]) {
      accum[charIdx].push(temp);
    } else {
      accum[charIdx] = [];
      accum[charIdx].push(temp);
    }
    return accum;
  }, {});
}

function solutionWithInitialHash(participants, completions) {
  let answer = null,
    participant = null;
  const charHashTable = genCharHashTable(completions);    // O(N-1)

  for(var i=0; i<participants.length; i++) {  // O(N)
    participant = participants[i];
    const charIdx = participant[0],
      charIdxParticipants = charHashTable[charIdx],
      participantIdx = charIdxParticipants? charIdxParticipants.indexOf(participant) : -1;
    if(participantIdx<0) {
      answer = participant;
      break;
    } else {
      charIdxParticipants.splice(participantIdx, 1);
    }
  }
  return answer;
}

function solutionWithDictionaryHash(participants, completions) {
  let answer = null,
    participant = null;
  const charHashTable = new CharHashTable(completions);    // O(N-1)

  for(var i=0; i<participants.length; i++) {  // O(N)
    participant = participants[i];

    // 완료자 목록에서 해당 참석자가 있는지 확인한 후에 있으면 지우고 없으면 해당 참가자가 없는 경우라 바로 종료
    const findResult = charHashTable.findAndRemove(participant);

    if(!findResult) {
      answer = participant;
      break;
    }
  }
  return answer;
}

class CharHashTable {
  constructor(strs) {
    this.hashTable = {};
    this.init(strs);
  }
  init(strs) {
    strs.forEach((ele) => {
      this.destruct(ele, this.hashTable, ele);
    });
  }
  // insert(obj, str) {
  //   if(obj.data) {
  //     obj.data.push(str);
  //   } else {
  //     obj.data = [str];
  //   }
  // }
  add(obj, str) {
    if(obj.count) {
      obj.count = obj.count + 1;
    } else {
      obj.count = 1;
    }
  }
  makeCharIndex(char, obj) {
    if(!obj[char]) {
      obj[char] = {};
    }
    return obj[char];
  }
  destruct(str, obj, all) {
    const c = str[0],
      rest = str.slice(1);

    obj = this.makeCharIndex(c, obj);

    // 종단점 설정
    if(!rest) {
      this.insert(obj, all);
    } else {
      this.destruct(rest, obj, all);
    }
  }
  findAndRemove(str) {
    const dataCount = this.findData(str.split(''), this.hashTable);
    if(dataCount && Array.isArray(data) && Array.length > 0) {
      data.pop();
      return true;
    } else {
      return false;
    }
  }
  findData(chars, obj) {
    const char = chars[0],
      rest = chars.slice(1);

    // 종단점 지정
    if(!char || !obj[char] || obj.data) {
      return (obj.count && obj.count > 0) ? obj.count : false;
    } else {
      obj = obj[char];
      return this.findData(rest, obj);
    }
  }
  remove(chars, obj) {
    const char = chars[0],
      rest = chars.slice(1);

    // 종단점 지정
    if(!char || !obj[char] || obj.count) {
      return (obj.count && obj.count > 0) ? true : false;
    } else {
      obj = obj[char];
      return this.findData(rest, obj);
    }
  }
  log() {
    console.log(JSON.stringify(this.hashTable));
  }
}
/*

const completions = ["marina","josipa","nikola","vinko","filipa"];

console.log('#########');

const charHashTable = new CharHashTable(completions);
charHashTable.log();

console.log("find marina -> ", charHashTable.find('marina'));
console.log("find anonymous -> ", charHashTable.find('anonymous'));

console.log('## marina 삭제');
console.log("charHashTable.findAndRemove('marina') ->", charHashTable.findAndRemove('marina'));

console.log("find marina -> ", charHashTable.find('marina'));

*/


console.log(solution(["marina", "josipa", "nikola", "vinko", "marina", "josipa", "nikola", "vinko", "marina", "josipa", "nikola", "vinko", "marina", "josipa", "nikola", "vinko", "marina", "josipa", "nikola", "vinko", "marina", "josipa", "nikola", "vinko", "marina", "josipa", "nikola", "vinko", "marina", "josipa", "nikola", "vinko", "marina", "josipa", "nikola", "vinko", "marina", "josipa", "nikola", "vinko"], ["marina", "josipa", "nikola", "vinko", "marina", "josipa", "nikola", "vinko", "marina", "josipa", "nikola", "vinko", "marina", "josipa", "nikola", "vinko", "marina", "josipa", "nikola", "vinko", "marina", "josipa", "nikola", "vinko", "marina", "josipa", "nikola", "vinko", "marina", "josipa", "nikola", "vinko", "marina", "josipa", "nikola", "vinko", "josipa", "nikola", "vinko"]));



