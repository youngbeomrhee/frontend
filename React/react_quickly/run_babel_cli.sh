npm init;
/* 아래 구문 추가
"babel": {
    "presets": [
        "react"
    ]
},
*/

npm i babel-cli babel-preset-react --save-dev;

# ./node_modules/.bin/babel ./jsx -d ./js -w
./node_modules/.bin/babel ./ch08_scalable_react_component/8.1_prop-types/jsx -d ./ch08_scalable_react_component/8.1_prop-types/js -w