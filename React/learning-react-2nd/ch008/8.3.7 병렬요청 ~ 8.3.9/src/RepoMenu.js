import React, { useEffect } from "react";
import { useIterator } from "./hooks";
import RepositoryReadme from "./RepositoryReadme";

// export default function RepoMenu({ repositories, onSelect = f => f }) {
export default function RepoMenu({ repositories, login }) {
  // 에러처리를 위한 default value 설정
  const [{ name } = {}, previous=()=>{}, next=()=>{}] = useIterator(repositories);

  /* // 제거
  useEffect(() => {
    if (!name) return;
    onSelect(name);
  }, [name]);
  */

  return (
    <>
      <div style={{display: "flex"}}>
        <button onClick={previous}>&lt;</button>
        <p>{name}</p>
        <button onClick={next}>&gt;</button>
      </div>
      {/* 추가 */}
      {/*<RepositoryReadme login={login} repo={name} />*/}
    </>
  );
}
