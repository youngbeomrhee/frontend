(_=> {
    console.log('\n# 이터레이터 프로토콜은 모든 객체를 이터러블 객체로 바꾸 수 있다.');
    
    class Log {
        constructor() {
            this.messages = [];
        }
        add(message) {
            this.messages.push({
                message,
                timestamp: Date.now()
            });
        }
        [Symbol.iterator]() {
            return this.messages.values();
        }
    }

    const log = new Log();

    log.add('first day at sea');
    log.add('spotted whale');
    log.add('spotted another vessel');

    for(let entry of log) {
        console.log(`${entry.message} @ ${entry.timestamp}`);
    }
})();

(_=> {
    console.log('\n# 직접 이터레이터를 만들수도 있다.');

    class Log {
        constructor() {
            this.messages = [];
        }
        add(message) {
            this.messages.push({
                message,
                timestamp: Date.now()
            });
        }
        [Symbol.iterator]() {
            let i = 0;
            const messages = this.messages;
            return {
                next() {
                    if(i >= messages.length) {
                        return { value: undefined, done: true};
                    } else {
                        return { value: messages[i++], done: false};
                    }
                }
            };
        }
    }
})();

(_=> {
    console.log('\n# 이터레이터는 무한한 데이터에도 사용할 수 있다.');

    class Fibonacci {
        [Symbol.iterator]() {
            let lval = 0, rval = 1;
            return {
                next() {
                    let nextVal = { value: rval, done: false};
                    rval += lval;
                    lval = nextVal.value;
                    return nextVal;
                }
            };
        }
    }

    const fibo = new Fibonacci();
    let i = 0;
    for(let n of fibo) {
        console.log(n);
        if(++i > 9) break;
    }
})();

