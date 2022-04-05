import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Login from './pages/Login';
import Config from './pages/Config';
import './App.css';

export default function App() {
  return (
    <div className="App">
      <Switch>
        <Route path="/config" component={ Config } />
        <Route path="/" component={ Login } />
      </Switch>
    </div>
  );
}
