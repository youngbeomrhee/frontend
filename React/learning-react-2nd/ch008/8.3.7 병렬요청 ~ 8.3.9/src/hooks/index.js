import {useState, useEffect, useCallback, useMemo, useRef} from "react";

export function useFetch(uri) {
  const [data, setData] = useState();
  const [error, setError] = useState();
  const [loading, setLoading] = useState(true);
  // mount 여부 확인
  const mounted = useMountedRef();

  useEffect(() => {
    if (!uri) return;
    fetch(uri)
      .then(data => {
        if (!mounted.current) throw new Error("component is not mounted");
        return data;
      })
      .then(data => data.json())
      .then(setData)
      .then(() => setLoading(false))
      // .catch(setError);
      .catch(error => {
        // debugger;
        if(!mounted.current) return;
        setError(error);
      });
  }, [uri]);

  return {
    loading,
    data,
    error
  };
}

export const useIterator = (items = [], initialValue = 0) => {
  const [i, setIndex] = useState(initialValue);

  // prev와 next 함수의 값도 메모화하여 성능을 향상
  const prev = useCallback(() => {
  // 참고로 useCallback은 아래와 같이 값으로 치환하여 useMemo로 변환할 수 있다
  // const prev = useMemo(() => () => {
    if (i === 0) return setIndex(items.length - 1);
    setIndex(i - 1);
  }, [i]);

  const next = useCallback(() => {
    if (i === items.length - 1) return setIndex(0);
    setIndex(i + 1);
  }, [i]);

  const item = useMemo(() => items[i], [i]);

  return [item || items[0], prev, next];
};

// 마운트 여부를 확인할 수 있는 hook
export function useMountedRef() {
  const mounted = useRef(false);
  // 최초 실행시 true로 설정
  useEffect(() => {
    mounted.current = true;
    // mount 해제시 false로 설정
    return () => mounted.current = false;
  });
  return mounted;
}
