/**
 * Created by yblee on 2016-10-14.
 */

/* navigator.userAgent에 담긴 정보 */

/*
 - IE Edge(11)
 Mozilla/5.0 (Windows NT 6.1; WOW64; Trident/7.0; SLCC2; .NET CLR 2.0.50727; .NET CLR 3.5.30729; .NET CLR 3.0.30729; Media Center PC 6.0; InfoPath.3; .NET4.0C; .NET4.0E; NetHelper70; GWX:RESERVED; rv:11.0) like Gecko

 - IE 10
 Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 6.1; WOW64; Trident/7.0; SLCC2; .NET CLR 2.0.50727; .NET CLR 3.5.30729; .NET CLR 3.0.30729; Media Center PC 6.0; InfoPath.3; .NET4.0C; .NET4.0E; NetHelper70; GWX:RESERVED)

 - IE 9
 Mozilla/5.0 (compatible; MSIE 9.0; Windows NT 6.1; WOW64; Trident/7.0; SLCC2; .NET CLR 2.0.50727; .NET CLR 3.5.30729; .NET CLR 3.0.30729; Media Center PC 6.0; InfoPath.3; .NET4.0C; .NET4.0E; NetHelper70; GWX:RESERVED)

 - IE 8
 Mozilla/4.0 (compatible; MSIE 8.0; Windows NT 6.1; WOW64; Trident/7.0; SLCC2; .NET CLR 2.0.50727; .NET CLR 3.5.30729; .NET CLR 3.0.30729; Media Center PC 6.0; InfoPath.3; .NET4.0C; .NET4.0E; NetHelper70; GWX:RESERVED)

 - chrome
 Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/43.0.2357.134 Safari/537.36 NetHelper70

 - Opera
 Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/53.0.2785.116 Safari/537.36 OPR/40.0.2308.81

 - Firefox
 Mozilla/5.0 (Windows NT 6.3; WOW64; rv:39.0) Getcko/20100101 Firefox/39.0 NetHelper70

*/

/* detect.js를 이용 */

/*
var getResource = function(url) {
  var httpRequest, returnObj;

  if (window.XMLHttpRequest) { // Mozilla, Safari, ...
    httpRequest = new XMLHttpRequest();
  } else if (window.ActiveXObject) { // IE
    try {
      httpRequest = new ActiveXObject("Msxml2.XMLHTTP");
    }
    catch (e) {
      try {
        httpRequest = new ActiveXObject("Microsoft.XMLHTTP");
      }
      catch (e) {}
    }
  }

  if (!httpRequest) {
    alert('Giving up :( Cannot create an XMLHTTP instance');
    return false;
  }

  httpRequest.onreadystatechange = function() {
    if (httpRequest.readyState === 4) {
      if (httpRequest.status === 200) {
        eval(httpRequest.responseText);
        successCallback();
      } else {
        alert('There was a problem with the request.');
      }
    }
  };
  httpRequest.open('GET', url);
  httpRequest.send();

  return returnObj;
}
*/
var getResource=function(url){var httpRequest,returnObj;if(window.XMLHttpRequest)httpRequest=new XMLHttpRequest;else if(window.ActiveXObject)try{httpRequest=new ActiveXObject("Msxml2.XMLHTTP")}catch(e){try{httpRequest=new ActiveXObject("Microsoft.XMLHTTP")}catch(e){}}return httpRequest?(httpRequest.onreadystatechange=function(){4===httpRequest.readyState&&(200===httpRequest.status?(eval(httpRequest.responseText),successCallback()):alert("There was a problem with the request."))},httpRequest.open("GET",url),httpRequest.send(),returnObj):(alert("Giving up :( Cannot create an XMLHTTP instance"),!1)};

getResource('https://raw.githubusercontent.com/darcyclarke/Detect.js/master/builds/1.0.0/detect.min.js');


function successCallback() {
  var ua = detect.parse(navigator.userAgent);

  if(ua.browser) {
    console.log('ua.browser.family = ' + ua.browser.family); // "Mobile Safari"
    console.log('ua.browser.major = ' + ua.browser.major); // 4
    console.log('ua.browser.minor = ' + ua.browser.minor); // 0
    console.log('ua.browser.patch = ' + ua.browser.patch); // 5
  }

  if(ua.device) {
    console.log('ua.device.family = ' + ua.device.family); // "iPhone"
    console.log('ua.device.major = ' + ua.device.major); // null
    console.log('ua.device.minor = ' + ua.device.minor); // null
    console.log('ua.device.patch = ' + ua.device.patch); // null
  }

  if(ua.os) {
    console.log('ua.os.family = ' + ua.os.family); // "iPhone"
    console.log('ua.os.major = ' + ua.os.major); // null
    console.log('ua.os.minor = ' + ua.os.minor); // null
    console.log('ua.os.patch = ' + ua.os.patch); // null
  }

  console.log('ua.toString() = ' + ua.toString()); // "Mobile Safari 4.0.5"
  console.log('ua.toVersionString() = ' + ua.toVersionString()); // "5.1"

  console.log('ua.toString("device") = ' + ua.toString('device')); // "iPhone"
  console.log('ua.toVersionString("device") = ' + ua.toVersionString('device')); // ""

  console.log('ua.toString("os") = ' + ua.toString('os')); // "iOS 4.0"
  console.log('ua.toVersionString("os") = ' + ua.toVersionString('os')); // "4.0"

  console.log('** summary = ', ua.browser.family, ua.browser.version, ua.os.name); // "4.0"
}
