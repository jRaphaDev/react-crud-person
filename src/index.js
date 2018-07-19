import React from 'react';
import ReactDOM from 'react-dom';

//import { Router, Route, IndexRoute, browserHistory } from "react-router";
import { BrowserRouter, Route } from 'react-router-dom'

import './css/index.css';
import './css/pure-min.css';
import './css/side-menu.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
    <BrowserRouter >
        <Route path='/' component={App} />
    </BrowserRouter>,
    document.getElementById('root')
);
registerServiceWorker();
