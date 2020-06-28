import React from 'react';
// import logo from './logo.svg';
import './App.css';
import SocialLogin from './components/SocialLogin'
import Dashboard from "./components/Dashboard";
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Router>
        <div className="container">
          <Switch>
            <Route exact path='/social' component={SocialLogin} ></Route>
            <Route path='/Dashboard' component={Dashboard} ></Route>
            <Route exact path="/SignUp">
              <SignUp />
            </Route>
            <Route exact path="/SignIn">
              <SignIn />
            </Route>
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;
