/**
 * Created by yblee on 2016-10-11.
 */
function removeXArea() {
  var eles = document.querySelectorAll('.removeArea');
  for (var i = 0; i < eles.length; i++) {
    eles[i].remove();
  }
}

function removeLine(ele) {
  // IE 때문에 아래와 같은 구조로 변경
  var eles = document.querySelectorAll(ele);

  for (var i = 0; i < eles.length; i++) {
    var _this = eles[i];
    _this.style.outline = '';
    _this.removeEventListener('mouseover', doHighlight);
    _this.removeEventListener('mouseleave', noHighlight);
  }
}

function removeOutline(p_eles) {
  var eles = p_eles || ['div', 'p', 'table', 'nav', 'li', 'footer'];
  for (var i = 0; i < eles .length; i++) {
    removeLine(eles[i]);
  }
};

removeXArea();
removeOutline();