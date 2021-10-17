import React, { useState, useEffect } from "react";

// 깨지기 쉬운 코드
function GitHubUser({ login }) {
  const [data, setData] = useState();
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!login) return;
    setLoading(true);
    if (data && data.login === login) return;
    fetch(`https://api.github.com/users/${login}`)
      .then(res => res.json())
      .then(setData)
      .then(() => setLoading(false))
      // .then(data => {
      //   setTimeout(() => {
      //     setData(data);
      //     setLoading(false);
      //   }, 2000);
      // })
      .catch(setError);
  }, [login]);

  if (loading) return <h1>loading...</h1>;
  // if (error) return <pre>{JSON.stringify(error, null, 2)}</pre>;
  if (error || (data && !data.login)) return <pre>{JSON.stringify(error || data, null, 2)}</pre>;
  if (!data) return null;

  return (
    <div className="githubUser">
      <img src={data.avatar_url} alt={data.login} style={{ width: 200 }} />
      <div>
        <h1>{data.login}</h1>
        {data.name && <p>{data.name}</p>}
        {data.location && <p>{data.location}</p>}
      </div>
    </div>
  );
}

export default function App() {
  return <GitHubUser login="moonhighway" />;
  // return <GitHubUser login="moonhighwayasdf" />;
}
