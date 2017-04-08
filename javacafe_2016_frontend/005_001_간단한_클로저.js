// 간단한 클로저

var outerValue = 'outerValue';

function outerFunction() {
    console.log(outerValue == 'outerValue');
}

outerFunction();

