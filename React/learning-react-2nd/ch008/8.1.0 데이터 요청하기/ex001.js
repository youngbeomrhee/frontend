const fetch = require('fetch');

fetch('https://api.github.com/users/moonhighway')
  .then(response => response.json())
  .then(console.log)
  .catch(console.error)

async function requestGithubUser(userId) {
  try {
    const res = await fetch(`https://api.github.com/users/${userId}`);
    const userData = await res.json();
    console.log(userData);
  } catch(e) {
    console.error(e);
  }
}

requestGithubUser('youngbeomrhee');

