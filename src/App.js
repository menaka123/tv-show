import React, {Component} from 'react';
import {HashRouter} from "react-router-dom";
import {Switch} from "react-router";
import './styles/app.scss';
import 'antd/dist/antd.css';

import Home from './components/home';
import TopBar from './components/TopBar';
import Results from './components/Results';
import Details from  './components/Details';

class App extends Component
{
    constructor(props) {
        super(props);
        this.state = {
            search: null,
        };
        this.setSearch = this.setSearch.bind(this);
    }

    setSearch (search)
    {
        this.setState({search});
    }

  render ()
  {

      return <HashRouter >
          <TopBar
              searched={ this.setSearch }
          />
          <div className="container main-container">
              <Switch>
                  <Home searched={ this.setSearch } exact path='/' />
                  <Results
                      exact
                      search={ this.state.search }
                      path='/results' />
                  <Details
                      exact
                      path='/details/:id' />
              </Switch>
          </div>
      </HashRouter>
  };
}

export default App;
