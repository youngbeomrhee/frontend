/**
 * Created by whybe on 2017. 7. 25..
 */
'use strict';
paper.install(window);
paper.setup(document.getElementById('mainCanvas'));

// TODO
var c;
for (var x = 25; x < 400; x+=50) {
    for (var y = 25; y < 400; y+=50) {
        c = Shape.Circle(x, y, 20);
        c.fillColor = 'green';
    }
}
paper.view.draw();

// = Shape.Circle(100, 100, 50);
