import React from "react";
import { Fetch } from "./Fetch";
import RepoMenu from "./RepoMenu";

export function UserRepositories({ login, selectedRepo, onSelect = f => f }) {
  return (
    <Fetch
      uri={`https://api.github.com/users/${login}/repos`}
      renderSuccess={({ data }) => (
        <RepoMenu
          repositories={data}
          selectedRepo={selectedRepo}
          onSelect={onSelect}
        />
      )}
    />
  );
}
