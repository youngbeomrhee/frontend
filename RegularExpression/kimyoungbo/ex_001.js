/**
 * Created by whybe on 2017. 10. 15..
 */
// 참고 : https://www.ecma-international.org/ecma-262/8.0/index.html#sec-regexp-regular-expression-objects
// https://developer.mozilla.org/ko/docs/Web/JavaScript/Guide/%EC%A0%95%EA%B7%9C%EC%8B%9D


// and, or, not

// 정규식표현 내에서 and

'abc'.match(/abc/);	// ["abc", index: 0, input: "abc"] a가 있으면서 b가 있으면서 c가 있는 값을 리턴
'xxxxxxxxxxabcxxxxxxxxxx'.match(/abc/);	// ["abc", index: 10, input: "xxxxxxxxxxabcxxxxxxxxxx"]
'abc'.match(/abdc/); // null -> a가 있으면서 b가 있으면서 d가 있으면서 c가 있는 값은 없음(null)

// 정규식표현 내에서 or
'abc'.match(/a|b|c/)	// ["a", index: 0, input: "abc"]
'abdc'.match(/a|b|c/)	// ["a", index: 0, input: "abdc"]

// 문자클래스 [] 내에서 or
'abdc'.match(/[abc]/);	// ["a", index: 0, input: "abdc"]

// 문자클래스 [] 내에서 부정
'abdc'.match(/[^abc]/);	// ["d", index: 2, input: "abdc"]



"안녕하세요".match(/안녕/);    // 안녕이라는 문자가 있는지 확

// 선언방법
var reg = /pattern/;
var reg = new RegExp('pattern');    // 문자가 동적을 들어오는 경우에 사용

'sports'.match(/sp/);   // 'sports'라는 문자가 /sp/ 패턴에 매치되는지 확인
'안녕하세요'.match(/^안녕/);   // 안녕이라는 문자로 시작하는 패턴에 매치되는지 확인


/* alternative : | */

// 왼쪽과 오른쪽을 모두 매치하여 관리영역에 저장
// 인덱스값이 가장 작은 값을 우선으로 반환하게 됨
// `"abcdef".match(/c|abc|a|def/)` 인경우 abc가 우선순위이므로 해당값이 반환됨

'12_34_56'.match(/23|56|34/);   // 34
'12_34_56'.match(/23|56|34/);   // 34 : 일치하는 모든 것을 검사 후에 인덱스가 작은 것 리턴

/* 앞뒤 문자 매치 : . */
'sports'.match(/.s/);   // ts 매치
'sports'.match(/.r./);  // ort 매치

/* unicode */
'\u0009'.match(/\t/);
'\u000A'.match(/\n/);   // ↵

/* 퀴즈 */
'ABCDE ABCXE'.match(/BC|DE|BC/g);   // ["BC", "DE", "BC"]
'ABCDE ABCXE'.match(/...D|..XE/g);  // ["ABCD", "BCXE"]

//  \B 63개 문자
'A12A 12B 12A'.match(/12\B/g);  // ["12", "12", "12"]

// \b 63개 이외의 문자
'A12A 12 12A'.match(/\b12\b/g); // ["12"]

'aaaaaaa'.match(/a+/);  // ["aaaaaaa", index: 0, input: "aaaaaaa"];
'aaaacaaa'.match(/a+/g);  // ["aaaa", "aaa"];

// 모든 문자 매치
'asdlkfjalsdkjf'.match(/.*/);   // ["asdlkfjalsdkjf", index: 0, input: "asdlkfjalsdkjf"]

// 모두가 숫자인걸 찾기
function isAllNumber(str) {
    return /^\d+$/.test(str);
}

isAllNumber();  // false
isAllNumber('131242s34');   // false
isAllNumber('a131242s34');  // false
isAllNumber('13124234');    // true


// * : 없거나 하나 이상 매치
'29384729as384'.match(/.*/);    // ["29384729as384", index: 0, input: "29384729as384"]
'29384729as384'.match(/38*/);   // ["38", index: 2, input: "29384729as384"]
"CAABAAA".match(/A*/);  // ["", index: 0, input: "CAABAAA"]
"CAABAAA".match(/A*/g); // ["", "AA", "", "AAA", ""]
'29384729as384'.match(/39*/);   // ["3", index: 2, input: "29384729as384"]
"123AAA".match(/123A*/);    // 123AAA
"123SSK".match(/123S*K/);   // 123SSK

// ? : 없거나 하나만 매치
"123AAA".match(/123A*/);    // 123A
"123SSK".match(/123S?K/);   // null

// 수에 매치
"aaa".match(/a{2}/);    // aa
"aaa".match(/a{3}/);    // aaa
"aaa".match(/a{4}/);    // null

"aaa".match(/a{2,}/);    // aaa
"aaa".match(/a{3,}/);    // aaa
"aaa".match(/a{4,}/);    // null

"aaabba".match(/a{2,}b/);   // aaab // a 2개 이상이면서 b

"aaabba".match(/a{2,3}b/);  // aaab //

// +? 1이상
'aaaac'.match(/aa+?/);  // aa
'aaaac'.match(/aa+?/g); // ['aa', 'aa]

// *? 0이상
'aaaac'.match(/aa*?/);  // a
'aaaac'.match(/aa*?/g); // ['a', 'a', 'a', 'a']

// TODO ???
'aaakk'.match(/a*?/g);
'aaakk'.match(/a*k/g); // ['aaak', 'k']
'aaakk'.match(/a*?k/g); // ['aaak', 'k'] // not greedy? 그러면 그냥 ak, k가 나와야 되는거 아닌가?

// 숫자범위 무시
'aaa'.match(/a{1,}?/);

// 문자패턴 []
'aaa'.match(/[abc]/);   // a


//
function isAlphabet(str) {
    return /^[a-zA-z]+$/.test(str);
}

'<div id="sports">축구</div>'.replace(/<\/?[^>]+>/ig,""); // innerHTML 가져오기


// 숫자만 \d
// 숫자이외 \D
// 보이지 않는 문자 \S
// 보이는 문자 \s
// \w 63개 문자
// \W 63개 이외의 문자
// \uhhhh   유니코드 값으로 매치
// \xhh 16진수 값으로 매치
// \c  제어문자



// 그룹화
// () 매치결과 캡처
'abcdef'.match(/ab(?:cd)ef/);
'abc'.match(/(a)/); // ['a', 'a']
// (a|b)+ : a 또는 b에 매치하고 그 결과로 하나 이상에 매치
// ()안의 a로 매치 매치되면 매치된 값을 캡처, 캡처된 값을 반환할 배열의 두 번째 엘리먼트에 설정
// 캡처된 값으로 매치. 매치가 되며 반환할 배열의 첫 번째에 설정

'abc'.match(/((a))/); // ['a', 'a', 'a']

// 서브패턴
// 소괄호() 안에 작성한 패턴을 지칭


// (?:) 캡처하지 않는 그룹
// 매치 결과를 캡처하지 않음. 매치 결과만 사용하려 할 때 제외 처리 필요 이때 캡처하지 않는 그룹 사용


// (?=) 전방매치
// zero-width, positive, lookahead
'abcc'.match(/ab(?=c)/);    // c를 찾고 앞부분만 검색

// (?!) 전방부정매치



// back tracking

// greedy
'aabaac'.match(/(aa|aabaac|b)/);    // ["aa", "aa", index: 0, input: "aabaac"]

'aabaac'.match(/(aa|aabaac|b)*/);   // ["aabaa", "aa", index: 0, input: "aabaac"]










