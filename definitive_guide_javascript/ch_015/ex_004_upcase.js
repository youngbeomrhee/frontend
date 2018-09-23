/**
 * Created by YB on 2016-10-29.
 */

// TODO : 함수형으로 추상화 시키기
function upcase(n) {
    if(n.nodeType == 3) {
        n.data = n.data.toUpperCase();
    } else {
        var kids = n.childNodes;
        for(var i=0; i<kids.length; i++) upcase(kids[i]);
    }
}

function allNodeShow(root) {
    console.log(root.nodeType, root);

    var kids = root.childNodes;
    for(var i=0; i<kids.length; i++) allNodeShow(kids[i]);
}

function showDomTree(root, _spaces='') {
    const spaces = _spaces + '.',
        children = root.children,
        tagName = root === document ? '#document' : root.tagName;
    console.log(_spaces + tagName);
    if(children && children.length>0) {
        [].forEach.call(children, (ele) => {
            showDomTree(ele, spaces);
        });
    }
}