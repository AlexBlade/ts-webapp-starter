import React from 'react';
import ReactDom from 'react-dom';
import { Provider } from 'react-redux';
import AppMain from "./pages/AppMain";
import { store } from './store';

ReactDom.render(
    <Provider store={store}>
        <AppMain/>
    </Provider>,
    document.getElementById('root')
);