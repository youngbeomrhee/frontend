import React from "react";
import { UserRepositories } from "./UserRepositories";
import { Fetch } from "./Fetch";

function UserDetails({ data }) {
  return (
    data && data.login ? (
      <div className="githubUser">
        <img src={data.avatar_url} alt={data.login} style={{ width: 200 }} />
        <div>
          <h1>{data.login}</h1>
          {data.name && <p>{data.name}</p>}
          {data.location && <p>{data.location}</p>}
        </div>
        <UserRepositories
          login={data.login}
          onSelect={repoName => console.log(`${repoName} selected`)}
        />
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
  return <GitHubUser login="moonhighway" />;
}
