import React, {useState, useEffect} from "react";

export function useFetch(uri) {
  const [data, setData] = useState();
  const [error, setError] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!uri) return;
    fetch(uri)
      .then(data => data.json())
      .then(setData)
      .then(() => setLoading(false))
      .catch(setError);
  }, [uri]);

  return {
    loading,
    data,
    error
  };
}

// export default function Fetch({
//                                 uri,
//                                 renderSuccess,
//                                 loadingFallback = <p>loading...</p>,
//                                 renderError = error => <pre>{JSON.stringify(error, null, 2)}</pre>
//                               }) {
//   const {loading, data, error} = useFetch(uri);
//   if (loading) return loadingFallback;
//   if (error) return renderError(error);
//   if (data) return renderSuccess({data});
// }
