import './App.css';
import React, {Suspense} from "react";
import ErrorBoundary from "./ErrorBoundary";
import Status from "./Status";
import {GridLoader} from "react-spinners";


// 재사용 가능한 형태로 변경
function createResource(pending) {
  let error, response;
  pending.then(r => (response = r)).catch(e => (error = e));

  return {
    read() {
      if (error) throw error;
      if (response) return response;
      throw pending;
    }
  }
}

// 컴포넌트에서 사용하기 위해 프로미스를 리턴
const threeSecondsToGnar = new Promise(resolves => (
  setTimeout(() => resolves({gnar: "gnarly!"}), 3000))
);

const resource = createResource(threeSecondsToGnar);

function Gnar() {
  const result = resource.read();
  return <h1>Gnar: {result.gnar}</h1>;
}

function App() {
  return (
    <Suspense fallback={<GridLoader />}>
      <ErrorBoundary>
        {/*<Status />*/}
        <Gnar />
      </ErrorBoundary>
    </Suspense>
  )
}

export default App;
