/**
 * Created by yblee on 2018-03-15.
 */
/*
    최대공약수와 최소공배수
    두 수를 입력받아 두 수의 최대공약수와 최소공배수를 반환해주는 gcdlcm 함수를 완성해 보세요.
    배열의 맨 앞에 최대공약수, 그 다음 최소공배수를 넣어 반환하면 됩니다.
    예를 들어 gcdlcm(3,12) 가 입력되면, [3, 12]를 반환해주면 됩니다.
*/

function gcdlcm(a, b) {
    // 방법 1 - a, b의 모든 약수를 구해서 계산
    /*
     function getEles(num) { const eles = []; for(var i=1;i<=num;i++) { Number.isInteger(num/i) && eles.push(i) }; return eles}
     const aEles=getEles(a),
     bEles=getEles(b),
     gcd = aEles.reduce((result,curr)=>{bEles.indexOf(curr)>-1&&result.push(curr); return result}, []).pop(),
     lcd = a*b/gcd;
     return [gcd, lcd];
     */

    // 방법 2 - 유클리드 호제법
    function gcd(x, y) { return y ? gcd(y, x%y) : x; }
    return [gcd(a,b), a*b/gcd(a,b)];
}

// 아래는 테스트로 출력해 보기 위한 코드입니다.
console.log(gcdlcm(3,12));