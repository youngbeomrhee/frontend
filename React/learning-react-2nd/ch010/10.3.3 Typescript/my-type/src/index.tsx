import React, {useState} from 'react';
import ReactDOM from 'react-dom';

type AppProps = {
    item: string;
}

// function App(props: AppProps) {
function App({ item }: AppProps) {
    const [fabricColor, setFabricColor] = useState("purple");

    return (
        <div>
            {/*<h1>{props.item}</h1>*/}
            <h1>{item}</h1>
            <h1>{fabricColor}</h1>
            <button onClick={() => setFabricColor("blue")}>
            {/*<button onClick={() => setFabricColor(3)}>*/}
                Make the Jacket Blue
            </button>
        </div>
    );
}

ReactDOM.render(
  <React.StrictMode>
    <App item="jacket"/>
    {/*<App item={1}/>*/}
  </React.StrictMode>,
  document.getElementById('root')
);
