console.log('\n# 함수 선언문');

function logCompliment() {
  console.log('잘했어요!');
}

logCompliment();

(_ => {
  function logComplimentIF() {
    console.log('잘했어요! IF');
  }
})();

(_ => {
  logCompliment();
  // logComplimentIF(); // reference error
  // -> 실행 가능하게 하려면 logComplimentIF를 어떻게 바꿔야 될까?
})();

console.log('\n# 함수 표현식');
(_ => {
  const logCompliment = function () {
    console.log('잘했어요!');
  }
  logCompliment();
})();


console.log('\n# 함수 선언문  vs. 함수 표현식');
console.log('# 함수 선언문');
(_ => {
  // 선언하기 전에 함수를 호출한다
  hey();

  // 함수 선언
  function hey() {
    console.log('hey');
  }
})();

console.log('\n# 함수 표현식');
(_ => {
  // 선언하기 전에 함수를 호출한다
  // hey();  // ReferenceError: Cannot access 'hey' before initialization

  // 함수 표현식
  const hey = () => {
    console.log('hey');
  }
})();


console.log('\n# 인수넘기기');
(_ => {
  const logCompliment = function (firstName) {
    console.log(`잘했어요! ${firstName}`);
  }
  logCompliment('YB');

  const logCompliment2 = function (message, firstName) {
    console.log(`${message} ${firstName}`);
  }
  logCompliment2('잘했어요!', 'YB');

  const logCompliment3 = function () {
    console.log(...arguments);
  }
  logCompliment3('잘했어요!', 'YB');
})();

console.log('\n# 값 반환하기');
(_ => {
  function plus(a, b) {
    return Number(a) + Number(b);
  }

  function PlusGenerator(fixNumber) {
    return function (num) {
      return plus(fixNumber, num);
    }
  }

  const twoPlus = PlusGenerator(2);
  console.log(twoPlus(3));
  console.log(twoPlus(5));
})();

console.log('\n# 디폴트 파라미터');
(_ => {
  function check(mustNeeded = (_ => {
    throw '필수파라미터 누락';
  })()) {
    if (mustNeeded) console.log(mustNeeded);
  }

  check('필수파라미터 전달');
  // check(); //
})();

console.log('\n# 화살표함수');
(_ => {
  /*
  const gangwon = {
    reports: ['용평', '평창', '강촌', '강릉', '홍천'],
    print: function (delay = 1000) {
      setTimeout(function () {
        console.log(this.reports.join(','));  //
      }, delay);
    }
  }
  */

  // gangwon.print();  // TypeError: Cannot read property 'join' of undefined

  const gangwon = {
    reports: ['용평', '평창', '강촌', '강릉', '홍천'],
    print: function (delay = 1000) {
      setTimeout(() => {
        console.log(this.reports.join(', '));  //
      }, delay);
    }
  }
  gangwon.print();

  const gangwon2 = {
    reports: ['용평', '평창', '강촌', '강릉', '홍천'],
    print: (delay = 1000) => {
      setTimeout(() => {
        console.log(this.reports.join(', '));  //
      }, delay);
    }
  }
  // gangwon2.print(); // TypeError: Cannot read property 'join' of undefined

})();

console.log('\n# ');
(_ => {
})();
console.log('\n# ');
(_ => {
})();
console.log('\n# ');
(_ => {
})();