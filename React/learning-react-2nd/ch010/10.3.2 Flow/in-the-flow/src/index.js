//@flow
import React from 'react';
import ReactDOM from 'react-dom';

type Props = {
    item: string,
    cost?: number
};

function App(props: Props) {
    return (
        <div>
            <h1>{props.item}</h1>
            {props.cost && (<p>Cost: {props.cost}</p>)}
        </div>
    );
}
ReactDOM.render(
  <React.StrictMode>
    <App item="jacket"/>
  </React.StrictMode>,
  document.getElementById('root')
);
