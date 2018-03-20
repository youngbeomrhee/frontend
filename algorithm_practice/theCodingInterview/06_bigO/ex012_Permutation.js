/**
 * Created by whybe on 2018. 3. 17..
 */
// 순열 : 서로 다른 n개의 원소에서 r개를 중복없이 골라 순서에 상관있게 나열하는 것을 n개에서 r개를 택하는 순열이라고 한다
// 현재 예제에서는 가능한 모든 순열을 뽑는다
function permutation(prefix, str) {

    if(str.length == 0) {	// 모든 문자가 빠짐없이 선택되면 해당 쓰레드 종료
        console.log('# 완성된 조합 : ' + prefix);
    } else {
        for (var i = 0; i < str.length; i++) {	// 문자의 길이만큼 반복(하며 선택)
            const picked = str[i];	// 순차적으로(i) 하나씩 뽑는다
            const rest = str.substr(0, i) + str.substr(i + 1);	// str에서 뽑고 난 나머지
            const addedPrefix = prefix + picked;	// 기존의 prefix에 새로 뽑은 문자를 추가
            console.log('prefix : ', prefix, ' / str : ', str, ' => ', '기존 prefix(', prefix, ') + 새로 뽑은 문자(', picked, ')를 합쳐서 새로운 prefix로 만들고 나머지문자(', rest, ')와 함께 재귀호출');
            permutation(addedPrefix, rest);	// 고정시킬 문자와 나머지 문자를 재지정해서 다시 순열을 뽑는다
        }
    }
}

permutation('', 'abc');