import './App.css';
import React, {useState, lazy, Suspense} from "react";
import Agreement from "./Agreement";
import {ClimbingBoxLoader} from "react-spinners";
import ErrorBoundary from "./ErrorBoundary";

// import Main from "./Main";
// loding 지연
const Main = lazy(() => import("./Main"));

function App() {
  const [agree, setAgree] = useState(false);
  if (!agree) return <Agreement onAgree={() => setAgree(true)} />;

  return (
    <ErrorBoundary>
      <Suspense fallback={<ClimbingBoxLoader />}>
        <Main />
      </Suspense>
    </ErrorBoundary>
  )
}

export default App;
