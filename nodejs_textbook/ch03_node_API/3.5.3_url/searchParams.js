/**
 * Created by whybe on 2018. 9. 27..
 */
const { URL } = require('url'),
    myURL = new URL('http://www.gilbut.co.kr?page=3&limit=10&category=nodejs&category=javascript');

console.log('myURL ->', myURL);
console.log('myURL.searchParams ->', myURL.searchParams);
console.log('myURL.searchParams.getAll("category") ->', myURL.searchParams.getAll("category"));
console.log('myURL.searchParams.get("limit") ->', myURL.searchParams.get("limit"));
console.log('myURL.searchParams.has("page") ->', myURL.searchParams.has("page"));
console.log();

console.log('myURL.searchParams.keys() ->', myURL.searchParams.keys());
console.log('myURL.searchParams.values() ->', myURL.searchParams.values());
console.log();

myURL.searchParams.append("filter", "es3");
myURL.searchParams.append("filter", "es5");
console.log('myURL.searchParams.getAll("filter") ->', myURL.searchParams.getAll("filter"));
console.log();

myURL.searchParams.set("filter", "es6");
console.log('myURL.searchParams.getAll("filter") ->', myURL.searchParams.getAll("filter"));
console.log();

myURL.searchParams.delete("filter");
console.log('myURL.searchParams.getAll("filter") ->', myURL.searchParams.getAll("filter"));
console.log();

console.log('myURL.searchParams.toString() ->', myURL.searchParams.toString());
myURL.search = myURL.searchParams.toString();
console.log();

console.log('myURL ->', myURL);
console.log('myURL.searchParams ->', myURL.searchParams);

myURL.search = null;
console.log();

console.log('myURL ->', myURL);
console.log('myURL.searchParams ->', myURL.searchParams);

