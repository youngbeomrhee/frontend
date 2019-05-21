import React from 'react';
import {render} from 'react-dom';
import {createStore} from 'redux';
import reducer from './reducers';
import {Provider} from 'react-redux';
import App from './components/App';
import './index.css';

const store = createStore(reducer);
// console.log(store.getState());
render(
    <Provider store={store}>
        <App/>
    </Provider>,
    document.getElementById('root')
);