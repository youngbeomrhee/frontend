import React, {useState} from "react";
import Fetch from "./Fetch";
import {useFetch} from "./FetchAsIs";
import {SearchForm} from "./SearchForm";

function GitHubUser({ login }) {
  const {loading, data, error} = useFetch(
    `https://api.github.com/users/${login}`
  )
  return (
    <section className="githubUser" style={{margin: '10px'}}>
      {
        data && data.login ? (
          <section className="githubUser">
            <img
              src={data.avatar_url}
              alt={data.login}
              style={{ width: 200 }}
            />
            <div>
              <h1>{data.login}</h1>
              {data.name && <p>{data.name}</p>}
              {data.location && <p>{data.location}</p>}
            </div>
          </section>
        ) : (
          <>해당하는 User가 없습니다.</>
        )
      }
    </section>
  )
}

export default function App() {
  const [login, setLogin] = useState('moonhighway');
  return (
    <>
      <h2>Github Users</h2>
      <SearchForm value={login} onSearch={setLogin} />
      <GitHubUser login={login} />
    </>
  );
}
