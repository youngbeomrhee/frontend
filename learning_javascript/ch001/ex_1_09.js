/**
 * Created by whybe on 2017. 7. 25..
 */
'use strict';
paper.install(window);
paper.setup(document.getElementById('mainCanvas'));

// TODO
var myTool = new Tool();
myTool.onMouseDown = function (event) {
    var c = Shape.Circle(event.point.x, event.point.y, 20);
    c.fillColor = 'green';
};
paper.view.draw();

// = Shape.Circle(100, 100, 50);
