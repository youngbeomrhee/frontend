/**
 * Created by whybe on 2018. 9. 25..
 */
const url = require('url'),
    URL = url.URL;

const myURL = new URL('http://gilbut.co.kr/book/bookList.aspx?sercate1=001001000#anchor');  // WHATWG URL Standard로 파싱. 추천

console.log('myURL ->', myURL);
console.log('url.format(myURL) ->', url.format(myURL));
console.log('---------------------------------------');

const parsedURL = url.parse('http://gilbut.co.kr/book/bookList.aspx?sercate1=001001000#anchor');    // (Node.js) Legacy URL Standard로 파싱. 사실상 deprecated
console.log('parsedURL ->', parsedURL);
console.log('url.format(parsedURL) ->', url.format(parsedURL));

// https://nodejs.org/api/url.html#url_url_format_url_options 에서 url.format에 WHATWG URL과 Node.js Legacy URL을 던질 때의 차이점이 기술되어 있다
