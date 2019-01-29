/**
 * Created by YB on 2016-11-05.
 */
/*
런타임시 부가적인 기능을 객체에 동적으로 추가
*/
console.log('\n### decorator : 상속을 사용하여 구현');
// 생성자와 프로토타입 메서드
function Sale (price) {
    this.price = price || 100;
}
Sale.prototype.getPrice = function () {
    return this.price;
};

// decorator 객체들을 생성자 프로퍼티인 Sale.decorators의 프로퍼티로 구현된다.
Sale.decorators = {};

// decorator 구현 : 이 메서드는 처음에는 부모의 메서드로부터 값을 가져온 다음 그 값을 변경한다.
Sale.decorators.fedtax = {
    getPrice: function () {
        var price = this.uber.getPrice();
        price += price * 5 / 100;
        return price;
    }
};

// 이런 방식으로 decorator를 얼마든지 구현할 수 있다
Sale.decorators.quebec = {
    getPrice: function () {
        var price = this.uber.getPrice();
        price += price * 7.5 / 100;
        return price;
    }
};

Sale.decorators.money = {
    getPrice: function () {
        return '$' + this.uber.getPrice().toFixed(2);
    }
};

Sale.decorators.cdn = {
    getPrice: function () {
        return 'CDN$' + this.uber.getPrice().toFixed(2);
    }
};

// 임시생성자 패턴을 활용한 상속을 통해 decorate 메서드구현
Sale.prototype.decorate = function (decorator) {
    var F = function () {},
        overrides = this.constructor.decorators[decorator],
        i, newobj;
    F.prototype = this;
    newobj = new F();
    newobj.uber = F.prototype;
    for (i in overrides) {
        if (overrides.hasOwnProperty(i)) {
            newobj[i] = overrides[i];
        }
    }
    return newobj;
};




// 모든 조각들을 짜맞추는 decorator 메서드
var saleInQuebec = new Sale(100);  // 가격을 100달러로 지정
saleInQuebec = saleInQuebec.decorate('fedtax');     // 연방세를 추가
saleInQuebec = saleInQuebec.decorate('quebec');     // 지방세를 추가
saleInQuebec = saleInQuebec.decorate('money');     // 통화형식을 지정
console.log(`saleInQuebec.getPrice() : ${saleInQuebec.getPrice()}`);

var saleInCanada = new Sale(100);  // 가격을 100달러로 지정
saleInCanada = saleInCanada.decorate('fedtax');     // 연방세를 추가
saleInCanada = saleInCanada.decorate('cdn');     // 통화형식을 지정
console.log(`saleInCanada.getPrice() : ${saleInCanada.getPrice()}`);



console.log('\n### decorator : 목록을 사용하여 구현');

function Sale2(price) {
    this.price = price || 100;
    this.decorators_list = [];
}

Sale2.decorators = {};

Sale2.decorators.fedtax = {
    getPrice: function (price) {
        return price += price * 5 / 100;;
    }
};

Sale2.decorators.quebec = {
    getPrice: function (price) {
        return price += price * 7.5 / 100;
    }
};

Sale2.decorators.money = {
    getPrice: function (price) {
        return '$' + price.toFixed(2);
    }
};

Sale2.decorators.cdn = {
    getPrice: function (price) {
        return 'CDN$' + price.toFixed(2);
    }
};

Sale2.prototype.decorate = function (decorator) {
    this.decorators_list.push(decorator);
};

Sale2.prototype.getPrice = function () {
    var price = this.price,
        i,
        max = this.decorators_list.length,
        name;
    for (i = 0; i < max; i++) {
        name = this.decorators_list[i];
        price = Sale2.decorators[name].getPrice(price);
    }
    return price;
};


var saleInQuebec = new Sale2(100);  // 가격을 100달러로 지정
saleInQuebec.decorate('fedtax');     // 연방세를 추가
saleInQuebec.decorate('quebec');     // 지방세를 추가
saleInQuebec.decorate('money');     // 통화형식을 지정
console.log(`saleInQuebec.getPrice() : ${saleInQuebec.getPrice()}`);

var saleInCanada = new Sale2(100);  // 가격을 100달러로 지정
saleInCanada.decorate('fedtax');     // 연방세를 추가
saleInCanada.decorate('cdn');     // 통화형식을 지정
console.log(`saleInCanada.getPrice() : ${saleInCanada.getPrice()}`);