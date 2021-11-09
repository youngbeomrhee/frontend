import React, {createContext} from 'react';
import ReactDOM from 'react-dom';
// import './index.css';
import App from './App';
import colors from './color-data.json';

export const ColorContext = createContext();

ReactDOM.render(
  <ColorContext.Provider value={{ colors }}>
    <App />
  </ColorContext.Provider>,
  document.getElementById('root')
);
