import React, {createContext} from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import ColorProvider from './ColorProvider'
// import colors from './color-data.json';

// export const ColorContext = createContext();

ReactDOM.render(
  <ColorProvider>
    <App />
  </ColorProvider>,
  document.getElementById('root')
);
