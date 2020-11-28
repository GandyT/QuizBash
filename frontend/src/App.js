import './Main.css';
import React from "react";
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
import Home from "./React/Pages/Home/base.js";

class App extends React.Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
        </Switch>
      </Router>
    );
  }
}

export default App;
