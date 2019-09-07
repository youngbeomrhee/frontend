
function solution(clothes) {
    const clothMap = clothes.reduce((chart, cloth) => {
        const kind = cloth[1];
        return chart[kind] ? (chart[kind] = chart[kind] + 1, chart) : (chart[kind] = 2, chart);
    }, {});

    return Object.values(clothMap).reduce((p, n) => p * n) - 1;
}

console.assert(solution([["yellow_hat", "headgear"], ["blue_sunglasses", "eyewear"], ["green_turban", "headgear"]]) === 5);
console.assert(solution([["crow_mask", "face"], ["blue_sunglasses", "face"], ["smoky_makeup", "face"]]) === 3);