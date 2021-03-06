  /**
   * Created by yblee on 2016-10-11.
   */
  function addXArea(ele) {
    document.querySelectorAll(ele).forEach(function(_this){
      var rightEnd = _this.offsetLeft + _this.offsetWidth - 20;
      var top = _this.offsetTop;
      var xArea = document.createElement('span');
      xArea.classList.add('removeArea');
      xArea.innerHTML = '<div style="background-color:silver;color:white;width:20px;height:20px;position:absolute;text-align:center;font-size:13px;z-index:1000;cursor:pointer;left:'+rightEnd+'px;top:'+top+'px;" onclick="javascript:this.parentElement.parentElement.remove();allHtmlInit()">X</div>';
      _this.appendChild(xArea);
      _this.style.outline = '1px solid red';
    });
  }

  function removeXArea() {
    document.querySelectorAll('.removeArea').forEach(function(_this){
      _this.remove();
    });
  }

  function allHtmlInit(p_eles) {
    removeXArea();
    var eles = p_eles || ['div', 'p', 'table', 'nav', 'li', 'footer'];
    eles.forEach(function (_this) {
      addXArea(_this);
    });
  };

  allHtmlInit();