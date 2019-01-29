/**
 * Created by whybe on 2018. 7. 1..
 */
let isDebugging = true,
    date;
const Debugger = function() {};

Debugger.log = function (message) {
    try {
        if(isDebugging) {
            date = new Date();
            const now = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + ' ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
            console.log('[DEBUG] ' + now + ' : ' + message);
        }
    } catch(exception) {
        return;
    }
}


