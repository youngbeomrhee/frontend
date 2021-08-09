console.log('\n# 2.1.1 const 키워드');
(_ => {
  var pizza = 'pizza';
  pizza = false;
  console.log(pizza);
})();

(_ => {
  const pizza = true;
  // pizza = false;
  // TypeError: Assignment to constant variable.
})();

console.log('\n# 2.1.2 let 키워드');
console.log('# var');
(_ => {
  var topic = '자바스크립트';
  if (topic) {
    var topic = '리액트';
    console.log('in block: ', topic);
  }
  console.log('global:', topic);
})();

console.log('\n# let');
(_ => {
  let topic = '자바스크립트';
  if (topic) {
    let topic = '리액트';
    console.log('in block: ', topic);
  }
  console.log('global:', topic);
})();

console.log('\n# 2.1.3 템플릿 문자열');
(_ => {
  const lastName = 'Eich', firstName = 'Brendan', nickName = 'The Father of Javascript'
  console.log(lastName + ', ' + firstName + ', ' + nickName);
  console.log(`${lastName}, ${firstName}, ${nickName}`);

  const email = `
    ${firstName} 님께,  
   
    덕분에 먹고 살고 있습니다. 
    Long live ${nickName}!
  `;
  console.log(email);
})();

