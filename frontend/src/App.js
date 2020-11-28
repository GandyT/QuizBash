import './Main.css';
import React from "react";
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";

/* COMPONENTS */
import Home from "./React/Pages/Home/base.js";
import Login from "./React/Pages/Login/base.js";
import Signup from "./React/Pages/Signup/base.js";
import Profile from "./React/Pages/Profile/base.js";
import Editor from "./React/Pages/Editor/base.js";

class App extends React.Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/login" component={Login} />
          <Route path="/signup" component={Signup} />
          <Route path="/profile" component={Profile} />
          <Route path="/editor" component={Editor} />
        </Switch>
      </Router>
    );
  }
}

export default App;
