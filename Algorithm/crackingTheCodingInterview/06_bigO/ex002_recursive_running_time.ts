

function f(n: number, label: string) : number {
    console.count(label);
    if(n <= 1) {
        return 1;
    }
    return f(n-1, label) + f(n-1, label);
}

console.log();
f(5, 'test1');

console.log();
f(4, 'test2');