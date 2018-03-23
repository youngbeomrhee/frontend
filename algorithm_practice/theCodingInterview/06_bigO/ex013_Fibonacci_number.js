/**
 * Created by whybe on 2018. 3. 23..
 */



function fibo(n) {
    if(n<=0) return 0;
    if(n===1 || n===2) return 1;
    return fibo(n-1) + fibo(n-2);
}

fibo(5);
fibo(7);

