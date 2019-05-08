let color_lawn = {
    title: '잔듸',
    color: '#00FF00',
    rating: 0
};

function rateColor(color, rating) {
    color.rating = rating;
    return color;
}

console.log(rateColor(color_lawn, 5).rating);
console.log(color_lawn.rating);

let color_lawn2 = {
    title: '잔듸',
    color: '#00FF00',
    rating: 0
};

const rateColor2 = function (color, rating) {
    return Object.assign({}, color, {rating: rating});
};

console.log(rateColor2(color_lawn2, 5).rating);
console.log(color_lawn2.rating);

let color_lawn3 = {
    title: '잔디',
    color: '#00FF00',
    rating: 0
};

const rateColor3 = (color, rating) => ({
    ...color,
    rating
});

console.log(rateColor3(color_lawn3, 5).rating);
console.log(color_lawn3.rating);

// 배열의 경우
let colorArray = [
    {title: '과격한 빨강'},
    {title: '잔디'},
    {title: '파티 핑크'}
];

const addColor = function (title, colors) {
    colors.push({title: title});
    return colors;
};

console.assert(addColor('매력적인 초록', colorArray).length === colorArray.length);

const addColor2 = (title, array) => array.concat({title});
console.assert(addColor2('매력적인 빨강', colorArray).length !== colorArray.length);

const addColor3 = (title, list) => [...list, {title}];
console.assert(addColor3('매력적인 파랑', colorArray).length !== colorArray.length);


/* 순수성 */
(() => {
    const frederick = {
        name: "Frederick Douglass",
        canRead: false,
        canWrite: false
    }

    function selfEducate() {
        frederick.canRead = true
        frederick.canWrite = true
    }

    selfEducate()

    console.dir(frederick);
})();

(() => {
    const frederick = {
        name: "Frederick Douglass",
        canRead: false,
        canWrite: false
    }

    function selfEducate() {
        frederick.canRead = true
        frederick.canWrite = true
    }

    selfEducate()

    console.dir(frederick);
})();

(() => {
    const frederick = {
        name: "Frederick Douglass",
        canRead: false,
        canWrite: false
    }

    const selfEducate = person => {
        person.canRead = true
        person.canWrite = true
        return person
    }

    // 여전히 순수 함수가 아니고 원본 객체를 변화시킨다.
    console.log( selfEducate(frederick) )
    console.log( frederick )
})();


(() => {
    const frederick = {
        name: "Frederick Douglass",
        canRead: false,
        canWrite: false
    }

    const selfEducate = person => ({
        ...person,
        canRead: true,
        canWrite: true
    });

    // 순수함수로 객체를 인자로 받아서 새 객체를 반환한다.
    // 아무 부수 효과도 발생시키지 않는다
    console.log(selfEducate(frederick));
    console.log(frederick);
})();


/* 데이터 변환 */
(() => {

    const schools = [
        "Yorktown",
        "Washington & Lee",
        "Wakefield"
    ], originData = JSON.stringify(schools);

    // join
    console.log( schools.join(", ") );
    // 원본이 그대로인지 테스트
    console.assert(JSON.stringify(schools) === originData);

    // filter
    const wSchools = schools.filter(school => school[0] === 'W');
    console.log(wSchools);
    console.assert(JSON.stringify(schools) === originData);

    // filter
    const cutSchool = (cut, list) => list.filter(school => school !== cut);
    console.log(cutSchool('Washington & Lee', schools));
    console.assert(JSON.stringify(schools) === originData);

    // map
    const highSchools = schools.map(school => `${school} Hight School`);
    console.log(highSchools);
    console.assert(JSON.stringify(schools) === originData);

    const highSchoolObjs = schools.map(school => ({name: school}))
    console.log(highSchoolObjs);
    console.assert(JSON.stringify(schools) === originData);
})();


(() => {
    const schools = [
        { name: "Yorktown"},
        { name: "Stratford" },
        { name: "Washington & Lee"},
        { name: "Wakefield"}
    ], originData = JSON.stringify(schools);

    const editName = (oldName, name, arr) => (
            arr.map(item => (item.name === oldName) ?
                    ({...item,name}) :
                    item
            )
    );

    const updatedSchools = editName('Stratford', 'HB Woodlawn', schools);
    console.log(updatedSchools[1]);
    console.log(schools[1]);
    console.assert(JSON.stringify(schools) === originData);

    const editNth = (n, name, arr) => (
            arr.map((item, i) => (i === n) ?
                    ({...item,name}) :
                    item
            )
    );

    const updatedSchools2 = editNth(2, 'Mansfield', schools);
    console.log(updatedSchools2[2]);
    console.log(schools[2]);
    console.assert(JSON.stringify(schools) === originData);

})();


(()=>{

    const schools = {
        "Yorktown": 10,
        "Washington & Lee": 2,
        "Wakefield": 5
    }, originData = JSON.stringify(schools);

    const schoolArray = Object.keys(schools).map(key => ({
        name: key,
        wins: schools[key]
    }));

    console.log(schoolArray);
    console.assert(JSON.stringify(schools) === originData);

})();

/* reduce */
(()=>{

    const ages = [21,18,42,40,64,63,34]

    const maxAge = ages.reduce((max, age) => {
        console.log(`${age} > ${max} = ${age > max}`)
        if (age > max) {
            return age
        } else {
            return max
        }
    }, 0)

    console.log('maxAge', maxAge)

    const max = ages.reduce((max, value) => (value > max) ? value : max, 0);
    console.log('max:', max);

})();



(()=>{
    const colors = [
        {
            id: '-xekare',
            title: "과격한 빨강",
            rating: 3
        },
        {
            id: '-jbwsof',
            title: "큰 파랑",
            rating: 2
        },
        {
            id: '-prigbj',
            title: "큰곰 회색",
            rating: 5
        },
        {
            id: '-ryhbhsl',
            title: "바나나",
            rating: 1
        }
    ]

    const hashColors = colors.reduce((hash, {id, title, rating}) => {
        hash[id] = {title, rating}
        return hash
    }, {});

    console.dir(hashColors)

})();



(()=>{
    const colors = ["red", "red", "green", "blue", "green"];

    const distinctColors = colors.reduce((distinct, color) => (distinct.indexOf(color) !== -1) ? distinct : [...distinct, color], []);

    console.dir(distinctColors);
})();


/* HOF(High Order Function) */
(()=>{
    const invokeIf = (condition, fnTrue, fnFalse) => (condition) ? fnTrue() : fnFalse(),
        showWelcome = () => console.log("Welcome!!!"),
        showUnauthorized = () => console.log("Unauthorized!!!");

    invokeIf(true, showWelcome, showUnauthorized);
    invokeIf(false, showWelcome, showUnauthorized);

    /* currying */

    const getFakeMembers = count => new Promise((resolves, rejects) => {
            const api = `https://api.randomuser.me/?nat=US&results=${count}`
            const request = new XMLHttpRequest()
            request.open('GET', api)
            request.onload = () =>
                    (request.status === 200) ?
                            resolves(JSON.parse(request.response).results) :
                            reject(Error(request.statusText))
            request.onerror = (err) => rejects(err)
            request.send()
        }),
        userLogs = userName => message => console.log(`${userName} -> ${message}`),
        log = userLogs('grandpa23');

    log('attempted to load 20 fake members');
    getFakeMembers(20).then(
        members => log(`successfully loaded ${members.length} members`),
        error => log('encountered an error loading members')
    );

    const say = greeting => message => console.log(`${greeting}. ${message}`),
        englishSay = say('Hello'),
        koreanSay = say('안녕하세요');
    englishSay('nice to meet you');
    koreanSay('만나서 반가습니다');

})();


/* 재귀 */
(()=>{
    const countdown = (value, fn) => {
        fn(value);
        return (value > 0) ? countdown(value-1, fn) : value;
    }
    countdown(10, value => console.log(value));
})();


(()=>{
    const countdown = (value, fn, delay=1000) => {
        fn(value);
        return (value > 0) ? setTimeout(() => countdown(value-1, fn), delay) : value;
    }
    countdown(10, value => console.log('', value));
})();


(()=>{
    const dan = {
        type: "person",
        data: {
            gender: "male",
            info: {
                id: 22,
                fullname: {
                    first: "Dan",
                    last: "Deacon"
                }
            }
        }
    }

    const deepPick = (fields, object={}) => {
        const [first, ...remaining] = fields.split(".")
        return (remaining.length) ?
                deepPick(remaining.join("."), object[first]) :
                object[first]
    }

    console.log( deepPick("type", dan) )
    console.log( deepPick("data.info.fullname.first", dan) )
})();


/* 합성(composition) */
(()=>{
    const template = 'hh:mm:ss tt',
        clockTime = template.replace('hh', '03')
            .replace('mm', '33')
            .replace('ss', '33')
            .replace('tt', 'PM');
    console.log(clockTime);
})();


(()=>{

    const createClockTime = date => ({date})

    const appendAMPM = ({date}) =>
            ({
                date,
                ampm: (date.getHours() >= 12) ? "PM" : "AM"
            })

    const civilianHours = clockTime => {
        const hours = clockTime.date.getHours()
        return {
            ...clockTime,
            hours: (hours > 12) ?
                    hours - 12 :
                    hours
        }
    }

    const removeDate = clockTime => {
        let newTime = {...clockTime}
        delete newTime.date
        return newTime
    }

    // 더 우아하게 함수를 합성하는 방법

    const compose = (...fns) =>
            (arg) =>
                    fns.reduce(
                            (composed, f) => f(composed),
                            arg
                    )

    const oneFunction = compose(
            createClockTime,
            appendAMPM,
            civilianHours,
            removeDate
    )

    const now = new Date();
    console.log(oneFunction(now));
    console.log(removeDate(civilianHours(appendAMPM(createClockTime(now)))));
})();



(()=>{
    // 매 초 시간을 로그에 남긴다.
    setInterval(logClockTime, 1000);

    function logClockTime() {

        // 현재 시각을 상용시로 표현하는 문자열을 얻는다.
        var time = getClockTime();

        // 콘솔을 지우고 시간을 로그에 남긴다.
        console.clear();
        console.log('[1] :', time);
    }

    function getClockTime() {

        // 현재 시각을 얻는다.
        var date = new Date();
        var time = "";

        // 시각을 직렬화한다.
        var time = {
            hours: date.getHours(),
            minutes: date.getMinutes(),
            seconds: date.getSeconds(),
            ampm: "AM"
        }

        // 상용시로 변환한다.
        if (time.hours == 12) {
            time.ampm = "PM";
        } else if (time.hours > 12) {
            time.ampm = "PM";
            time.hours -= 12;
        }

        // 시간을 2글자로 만들기 위해 앞에 0을 붙인다.
        if (time.hours < 10) {
            time.hours = "0" + time.hours;
        }

        // 분을 2글자로 만들기 위해 앞에 0을 붙인다.
        if (time.minutes < 10) {
            time.minutes = "0" + time.minutes;
        }

        // 초를 2글자로 만들기 위해 앞에 0을 붙인다.
        if (time.seconds < 10) {
            time.seconds = "0" + time.seconds;
        }

        // "hh:mm:ss tt" 형식의 문자열을 만든다.
        return time.hours + ":"
                + time.minutes + ":"
                + time.seconds + " "
                + time.ampm;

    }
})();


(()=>{
    const oneSecond = () => 1000
    const getCurrentTime = () => new Date()
    const clear = () => console.clear()
    const log = message => console.log('[2] :', message)

    const abstractClockTime = date =>
            ({
                hours: date.getHours(),
                minutes: date.getMinutes(),
                seconds: date.getSeconds()
            })

    const civilianHours = clockTime =>
            ({
                ...clockTime,
                hours: (clockTime.hours > 12) ?
                        clockTime.hours - 12 :
                        clockTime.hours
            })

    const appendAMPM = clockTime =>
            ({
                ...clockTime,
                ampm: (clockTime.hours >= 12) ? "PM" : "AM"
            })

    const display = target => time => target(time)

    const formatClock = format =>
            time =>
                    format.replace("hh", time.hours)
                            .replace("mm", time.minutes)
                            .replace("ss", time.seconds)
                            .replace("tt", time.ampm)

    const prependZero = key => clockTime =>
            ({
                ...clockTime,
                [key]: (clockTime[key] < 10) ?
                        "0" + clockTime[key] :
                        clockTime[key]
            })

    const compose = (...fns) =>
            (arg) =>
                    fns.reduce(
                            (composed, f) => f(composed),
                            arg
                    )

    const convertToCivilianTime = clockTime =>
            compose(
                    appendAMPM,
                    civilianHours
            )(clockTime)

    const doubleDigits = civilianTime =>
            compose(
                    prependZero("hours"),
                    prependZero("minutes"),
                    prependZero("seconds")
            )(civilianTime)

    const startTicking = () =>
            setInterval(
                    compose(
                            clear,
                            getCurrentTime,
                            abstractClockTime,
                            convertToCivilianTime,
                            doubleDigits,
                            formatClock("hh:mm:ss tt"),
                            display(log)
                    ),
                    oneSecond()
            )

    startTicking()
})();



(()=>{

})();



(()=>{

})();

