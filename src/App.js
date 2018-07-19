import React, { Component } from 'react';
import logo from './logo.svg';
import './css/App.css';
import { PersonBox } from './components/Person';
import './css/pure-min.css';
import './css/side-menu.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to CRUD Person system .</h1>
        </header>
        <div className="App-intro">
          <PersonBox />
        </div>
      </div>
    );
  }
}

export default App;
