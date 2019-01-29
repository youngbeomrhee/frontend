/**
 * Created by yblee on 2018-03-15.
 */
/*
    약수의 합
    어떤 수를 입력받아 그 수의 약수를 모두 더한 수 sumDivisor 함수를 완성해 보세요.
    예를 들어 12가 입력된다면 12의 약수는 [1, 2, 3, 4, 6, 12]가 되고, 총 합은 28이 되므로 28을 반환해 주면 됩니다.
*/

const getDevisors = (function() {
    let cache = {};	// 계산결과 cache에 저장

    return function(num) {
        if(cache[num]) return cache[num];
        let divisors = [num], divisor = Math.floor(num/2);	// 불필요한 계산 절반으로 줄이기

        while(divisor) {
            if(num%divisor===0) divisors.push(divisor);
            divisor--;
        }
        cache[num] = divisors;
        return divisors;
    }
})();

function sumDivisor(num) {
    if(num===0) throw Error('0은 약수가 존재하지 않습니다');
    if(!Number.isInteger(Number.parseInt(num))) throw Error('입력값은 숫자만 가능합니다');
    return getDevisors(num).reduce((p,n)=>p+n);
}

// 아래는 테스트로 출력해 보기 위한 코드입니다.
console.log(sumDivisor(12));
console.log(sumDivisor(10));
console.log(sumDivisor(21));
console.log(sumDivisor(112349872));
console.log(sumDivisor(112349872)); // cache를 통한 시간 단축

