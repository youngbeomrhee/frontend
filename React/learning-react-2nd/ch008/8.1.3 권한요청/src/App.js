import './App.css';
import React, {useEffect, useState} from "react";

function GitHubUser({userId}) {
  const [data, setData] = useState();
  useEffect(() => {
    if (!userId) return;
    fetch(`https://api.github.com/users/${userId}`)
      .then(response => response.json())
      .then(setData)
      .catch(console.error)
  }, [userId]);

  if(data) return (<pre>{JSON.stringify(data, null, 2)}</pre>);

  return null;
}

function App() {
  return (
    <GitHubUser userId='youngbeomrhee' />
  );
}

export default App;
