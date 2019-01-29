/**
 * Created by whybe on 2018. 9. 24..
 */

function showProps(obj) {
    for (prop in obj) {
        const val = obj[prop];
        try {
            if(typeof val === 'function') {
                console.log('- ' + prop + '()', ' : ', val());
            } else {
                console.log('- ' + prop, ' : ', val);
            }
        } catch(error) {
            console.error(error);
        }
    }
}

module.exports = {
    showProps
}