import React from 'react';
import {HashRouter} from "react-router-dom";
import {Switch} from "react-router";
import './styles/app.scss';

import Home from './components/home';
import TopBar from './components/TopBar';

function App() {
  return (
    <HashRouter >
        <TopBar />
        <div className="container main-container">
            <Switch>
                <Home exact path='/' />
            </Switch>
        </div>
    </HashRouter>
  );
}

export default App;
