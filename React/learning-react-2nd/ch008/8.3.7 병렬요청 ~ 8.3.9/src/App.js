import React, {useState} from "react";
import { UserRepositories } from "./UserRepositories";
import { Fetch } from "./Fetch";
import {SearchForm} from "./SearchForm";
import RepositoryReadme from "./RepositoryReadme";

function UserDetails({ data }) {
  return (
    data && data.login ? (
      <div className="githubUser">
        <img src={data.avatar_url} alt={data.login} style={{ width: 200 }} />
        <div>
          <h1>{data.login}</h1>
          {data.name && <p>{data.name}</p>}
          {data.location && <p>{data.location}</p>}
        </div>{/*
        <UserRepositories
          login={data.login}
          onSelect={repoName => console.log(`${repoName} selected`)}
        />*/}
      </div>
    ) : (
      <>
        해당하는 데이터가 없습니다. 관리자에게 문의해 주세요
      </>
    )
  );
}

function GitHubUser({ login }) {
  return (
    <Fetch
      uri={`https://api.github.com/users/${login}`}
      renderSuccess={UserDetails}
    />
  );
}

export default function App() {
  const [login, setLogin] = useState('moonhighway');
  const [repo, setRepo] = useState('learning-react');

  const handleSearch = login => {
    if (login) return setLogin(login);
    setLogin("");
    setRepo("");
  }

  if (!login) return (<SearchForm value={login} onSearch={setLogin} />)

  return (
    <>
      <SearchForm value={login} onSearch={setLogin} />
      {login && <GitHubUser login={login} />}
      {login &&
        <UserRepositories
          login={login}
          repo={repo}
          onSelect={setRepo}
        />
      }
      {login && repo && (
        <RepositoryReadme login={login} repo={repo} />
      )}
    </>
  );
}
