import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';


ReactDOM.render(
    <React.StrictMode>
        <App name="React" using={true} openOrClosed={"Opesn"}/>
    </React.StrictMode>,
    // <App name={true}/>,
    document.getElementById("root")
);