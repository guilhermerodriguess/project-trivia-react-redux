import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Login from './pages/Login';
import logo from './trivia.png';
import './App.css';

export default function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={ logo } className="App-logo" alt="logo" />
        <p>
          SUA VEZ
        </p>
      </header>
      <Switch>
        <Route path="/" component={ Login } />
      </Switch>
    </div>
  );
}
