/**
 * Created by YB on 2016-10-28.
 */

var Cookie = {};

(function () {
    function stringToObj(obj, string, seperator) {
        var key = string.slice(0, string.indexOf(seperator)),
            val = string.slice(string.indexOf(seperator)+1);
        obj[key] = val;
    }
    function parseCookieObj () {
        var cookieArr = document.cookie.split(';').map((cookieStr)=>cookieStr.trim());
        var cookieObj = {};
        for(var cookie of cookieArr) {
            stringToObj(cookieObj, cookie, '=');
        }
        return cookieObj;
    }
    Cookie.getCookieKeys = function () {
        return Object.keys(parseCookieObj());
    }
    Cookie.getCookieValues = function () {
        return Object.values(parseCookieObj());
    }
    Cookie.getCookieValue = function (key) {
        return parseCookieObj()[key];
    }
    Cookie.setCookie = function (key, value) {
        document.cookie = key + '=' + value;
    }
})();
