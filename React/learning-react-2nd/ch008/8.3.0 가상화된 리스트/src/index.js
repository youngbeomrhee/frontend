import React from 'react';
import ReactDOM from 'react-dom';
// import './index.css';
import App from './App';
import AppAsIs from "./AppAsIs";

// 전체 리스트를 한 번에 렌더링 할 때(AppAsIs)와
// 가상화 된 리스트(오프스크린)을 지원하는 react-window를 사용하여 렌더링 하는 경우 성능 비교
ReactDOM.render(
  <React.StrictMode>
    <App />
    {/*<AppAsIs />*/}
  </React.StrictMode>,
  document.getElementById('root')
);
