/**
 * Created by YB on 2016-10-14.
 */
var addDiv = document.createElement('div');
addDiv.style.position = 'absolute';
addDiv.style.bottom = '10px';
addDiv.style.right = '10px';
addDiv.style.zIndex = 1000;
addDiv.style.opacity = '0.8';
addDiv.style.backgroundColor = 'silver';
addDiv.innerHTML = '<span id="windowSize" style="padding:5px;font-size:20px;color:white">'+(window.outerWidth + ' x ' + window.outerHeight)+'</span>';
document.body.appendChild(addDiv);
document.querySelector('#windowSize');
window.addEventListener('resize', (x = function() {
    document.querySelector('#windowSize').innerHTML = (window.outerWidth + ' x ' + window.outerHeight);
}));