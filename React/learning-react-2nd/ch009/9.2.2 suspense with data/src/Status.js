import React from "react";

// const loadStatus = () => "success - ready";

/*
// 에러 발생
const loadStatus = () => {
  throw new Error("Something went wrong");
  // "success - ready";
}
*/

/*
// 진행중 상태처리
const loadStatus = () => {
  throw new Promise(resolve => null);
}
*/

/* // setTimeout과 함께 사용시
const loadStatus = () => {
  console.log("load status");
  throw new Promise(resolves => setTimeout(resolves, 3000));
}
*/

// Suspense가 가능한 데이터 소스 만들기
const loadStatus = (() => {
  let error, response;
  const promise =
    new Promise(resolves => setTimeout(resolves, 3000))
      .then(() => response = "success")
      .catch(e => error = e);

  return () => {
    if (error) throw Error;
    if (response) return response;
    throw promise;
  }
})();

export default function Status() {
  const status = loadStatus();
  return <h1>status: {status}</h1>;
}
