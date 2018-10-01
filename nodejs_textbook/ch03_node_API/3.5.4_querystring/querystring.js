/**
 * Created by whybe on 2018. 9. 27..
 */
const url = require('url'),
    querystring = require('querystring'),
    parsedURL = url.parse('http://www.gilbut.co.kr?page=3&limit=10&category=nodejs&category=javascript'),
    query = querystring.parse(parsedURL.query);

console.log("query ->", query);
console.log("typeof query ->", typeof query);
console.log("querystring.stringify(query) ->", querystring.stringify(query));





