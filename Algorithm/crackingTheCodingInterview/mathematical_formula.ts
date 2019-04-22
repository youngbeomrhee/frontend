/* n까지의 합 */
function sum1toN(n: number) : number {
    let sum = 0;

    for (let i = 1; i <= n; i++) {
        sum += i;
    }

    return sum;
}

console.assert(sum1toN(1) === 1, `${sum1toN(1)} is not 1`);
console.assert(sum1toN(10) === 55);
console.assert(sum1toN(9) === 45);
console.assert(sum1toN(100) === 5050);

function sum1toNFormula(n: number) : number {
    return n * (n + 1) * (1/2);
}

console.assert(sum1toNFormula(10) === 55);
console.assert(sum1toNFormula(9) === 45);
console.assert(sum1toNFormula(100) === 5050);

for (let i = 0; i < 1000; i++) {
    console.assert(sum1toN(i) === sum1toNFormula(i));
}


/* 2의 승수의 합 */
function sumMultiplier(base: number, to: number) : number {
    if(to<0) throw Error('승수는 0 이상입니다.');
    let sum = 0;
    for (let i = 0; i <= to; i++) {
        sum += Math.pow(base, i);
    }
    return sum;
}

console.assert(sumMultiplier(2, 0) === 2);

function sumMultiplierFormula(base: number, to: number) : number {
    if(to<1) throw Error('승수는 1 이상입니다.');
    return Math.pow(base, to) - 1;
}
/*
    승수      2진수     10진수
    --------------------------------------
    2의 0승   00001   1
    2의 1승   00010   2
    2의 2승   00100   4
    2의 3승   01000   8
    2의 4승   10000   16
합계 2의 5승-1 11111   32-1=31
*/




