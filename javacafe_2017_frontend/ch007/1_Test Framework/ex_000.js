function sum(p1, p2) {
    if(Number.isInteger(p1) || Number.isInteger(p2)) {
        throw new Error();
    }

    return p1 + p2;
}
