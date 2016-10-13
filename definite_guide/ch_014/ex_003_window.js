/**
 * Created by YB on 2016-10-14.
 */
var addDiv = document.createElement('div');
addDiv.style.position = 'absolute';
addDiv.style.bottom = '10px';
addDiv.style.right = '10px';
addDiv.style.zIndex = 1000;
addDiv.innerHTML = '<span id="windowSize"></span>';
document.querySelector('#windowSize');
window.addEventListener('resize', (x = function() {
    document.querySelector('#windowSize').innerHTML = (window.outerWidth + ' x ' + window.outerHeight);
}));