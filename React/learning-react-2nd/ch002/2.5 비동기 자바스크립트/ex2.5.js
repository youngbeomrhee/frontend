console.log(1);
fetch('https://api.randomuser.me/?nat=US&results=1').then(res => console.log(res.json()));

console.log(2);
fetch('https://api.randomuser.me/?nat=US&results=1')
  .then(res => res.json())
  .then(json => json.results)
  .then(console.log)
  .catch(console.error);

console.log(3);
const getFakePerson = async () => {
  let res = await fetch('https://api.randomuser.me/?nat=US&results=1');
  let {results} = res.json();
  console.log('# fakePerson: ', results);
}

console.log(4);
getFakePerson();

console.log(5);

const getFakePerson2 = async () => {
  try {
    let res = await fetch('https://api.randomuser.me/?nat=US&results=1');
    let {results} = await res.json();
    console.log('# fakePerson2: ', results);
  } catch(e) {
    console.error(e);
  }
}

console.log(6);
getFakePerson2();

console.log(7);

const getPeople = count => new Promise((resolves, rejects) => {
  const api = `https://api.randomuser.me/?nat=US&results=${count}`;
  const request = new XMLHttpRequest();
  request.open("GET", api);
  request.onload = _ => request.status === 200 ?
    resolves(JSON.parse(request.response).results) :
    reject(Error(request.statusText));
  request.onerror = err => rejects(err);
  request.send();
})

getPeople(5)
  .then(members => console.log('# getPeople: ', members))
  .catch(error => console.error(`getPeople faile: ${error.message}`));