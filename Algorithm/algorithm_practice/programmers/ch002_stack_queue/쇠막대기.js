
function solution(arrangement) {
    let answer = 0;
    const st = [];

    for (let i = 0, len = arrangement.length; i < len; i++) {
        const c = arrangement[i],
            rest = arrangement.substr(i),
            isLaser = i > 0  && arrangement[i - 1] === '(';
        if(c === '(') {
            st.push(1);
        } else {
            st.pop();
            if(isLaser) {
                answer += st.length;
            } else {
                answer += 1;
            }
        }
    }
    return answer;
}

// console.assert(solution('(((()())))') === 6);
// console.assert(solution('()') === 0);
// console.assert(solution('()()') === 0);
// console.assert(solution('(())') === 2);
// console.assert(solution('()(())') === 2);
// console.assert(solution('(()())') === 3);
// console.assert(solution('(()())(())') === 5);
// console.assert(solution('((()())(())())') === 7);
// console.assert(solution('(((()())(())()))') === 12);
console.assert(solution('()(((()())(())()))(())') === 17);
// console.assert(solution('((()))') === 1);
// ()(())
// ()(((()())(())()))(())
// console.assert(solution('()(((()())(())()))(())') === 17);

