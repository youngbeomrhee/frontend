import React, {useState, useEffect, useCallback} from "react";

import ReactMarkdown from "react-markdown";
import {useMountedRef} from "./hooks";

export default function RepositoryReadme({repo, login}) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
  const [markdown, setMarkdown] = useState("");
  // component mounted 여부 확인
  const mounted = useMountedRef();

  // 처음 렌더링 될 때 memoization
  const loadReadme = useCallback(async (login, repo) => {
    setLoading(true);
    const uri = `https://api.github.com/repos/${login}/${repo}/readme`;
    const {download_url} = await fetch(uri).then(res => res.json());
    const markdown = await fetch(download_url).then(res => res.text());
    if(mounted.current) {
      setMarkdown(markdown);
      setLoading(false);
    }
  }, []);

  // 처음 렌더링된 직후 실행
  useEffect(() => {
    if (!repo || !login) return;
    loadReadme(login, repo).catch(setError);
  }, [repo, login]);

  if (error) return <pre>{JSON.stringify((error, null, 2))}</pre>
  if (loading) return <p>Loading...</p>;

  return <ReactMarkdown children={markdown} skipHtml={true}/>;
}