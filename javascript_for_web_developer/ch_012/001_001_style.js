/**
 * Created by YB on 2016-11-19.
 */
/* cssText : style 을 핸들링 하는 가장 간단한 방법 */
document.body.innerHTML = '<div style="width:100px;height:100px;outline:1px solid black"></div>';
console.log(`document.querySelector('div').style.cssText : ${document.querySelector('div').style.cssText}`);
document.querySelector('div').style.cssText += 'background-color:red';
console.log(`document.querySelector('div').style.cssText : ${document.querySelector('div').style.cssText}`);

/* getComputedStyle : 상속받은 style까지 가져옴 */
document.body.innerHTML = '<div style=""><div style="width:100px;height:100px;outline:1px solid black"></div></div>';
document.defaultView.getComputedStyle(document.querySelector('div'));

/* styleSheets, cssRules, cssText */
document.body.innerHTML = '<div class="test_div">test</div>';
debugger;
document.head.innerHTML =
    `<style>
        div {
            width:100px;
            height:100px;
            outline:1px solid black;
        }
    </style>
    <style>
        div {
            width:50px;
            height:50px;
        }
        .test_div {
            background-color: red;
        }
    </style>
    `;

document.styleSheets;

document.styleSheets[0].cssRules;

document.styleSheets[1].cssRules;

document.styleSheets[1].cssRules[0].style.__proto__ === CSSStyleDeclaration.prototype;

document.styleSheets[1].cssRules[1].cssText;

var rules = document.styleSheets[1].cssRules[1];
ules.style.cssText += 'border: 2px solid blue';

/* insertRule() */
/*
document.styleSheets[0].insertRule('body { background-color: silver}', 0);

/!* IE를 포괄하는 함수 *!/
function insertRule(sheet, selectorText, cssText, position) {
    if (sheet.insertRule) {
        sheet.insertRule(selectorText + "{" + cssText + "}", position);
    } else if (sheet.addRule) {
        sheet.addRule(selectorText, cssText, position);
    }
}
*/

