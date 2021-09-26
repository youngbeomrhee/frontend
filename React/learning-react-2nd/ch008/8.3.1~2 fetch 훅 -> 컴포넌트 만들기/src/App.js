import React, {useState} from "react";
import Fetch from "./Fetch";
import {SearchForm} from "./SearchForm";
// import { UserRepositories } from "./UserRepositories";

function GitHubUser({ login }) {
  return (
    <Fetch
      uri={`https://api.github.com/users/${login}`}
      renderSuccess={UserDetails}
    />
  );
}

function UserDetails({ data }) {
  return (
    <div className="githubUser" style={{margin: '10px'}}>
      { data && data.login ? (
        <>
          <img src={data.avatar_url} alt={data.login} style={{ width: 200 }} />
          <div>
            <h1>{data.login}</h1>
            {data.name && <p>{data.name}</p>}
            {data.location && <p>{data.location}</p>}
          </div>
        </>
      ) : (
        <>해당하는 User가 없습니다.</>
      )}
    </div>
  );
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
