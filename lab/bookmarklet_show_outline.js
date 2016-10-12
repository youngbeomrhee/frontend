/**
 * Created by yblee on 2016-10-11.
 */
function showLine(ele) {
  document.querySelectorAll(ele).forEach(function(_this){
    _this.style.outline = '1px solid red';
  });
}


function showOutline(p_eles) {
  var eles = p_eles || ['div', 'p', 'table', 'nav', 'li', 'footer'];
  eles.forEach(function (_this) {
    showLine(_this);
  });
};

showOutline();


function removeLine(ele) {
  document.querySelectorAll(ele).forEach(function(_this){
    _this.style.outline = '';
  });
}

function removeOutline(p_eles) {
  var eles = p_eles || ['div', 'p', 'table', 'nav', 'li', 'footer'];
  eles.forEach(function (_this) {
    removeLine(_this);
  });
};

removeOutline();