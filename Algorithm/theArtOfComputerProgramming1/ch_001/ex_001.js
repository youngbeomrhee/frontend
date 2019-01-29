/**
 * Created by yblee on 2017-11-24.
 */

/* p26  알고리즘E : 최대공약수를 구하는 유클리들 알고리즘 */
function greatCommonDevisor(a, b) {
    let m=(a>b)?a:b, n=(a>b)?b:a, r=m%n;
    if(r===0) {
        return n;
    } else {
        m=n; n=r;
        return greatCommonDevisor(m, n);
    }
}

greatCommonDevisor(18, 12);
greatCommonDevisor(12, 18);
greatCommonDevisor(34, 54);
greatCommonDevisor(6, 12);
greatCommonDevisor(119, 544);


