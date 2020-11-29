import './Main.css';
import React from "react";
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";

/* COMPONENTS */
import Home from "./React/Pages/Home/base.js";
import Login from "./React/Pages/Login/base.js";
import Signup from "./React/Pages/Signup/base.js";
import Profile from "./React/Pages/Profile/base.js";
import Editor from "./React/Pages/Editor/base.js";
import AwaitEmail from "./React/Pages/AwaitEmail/base.js";
import VerifyFail from "./React/Pages/VerifyFail/base.js";
import VerifySuccess from "./React/Pages/VerifySuccess/base.js";
import CreateQuiz from "./React/Pages/CreateQuiz/base.js";
import TeacherWait from "./React/Pages/TeacherWaiting/base.js"

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
          <Route path="/awaitemail" component={AwaitEmail} />
          <Route path="/verify/fail" component={VerifyFail} />
          <Route path="/verify/success" component={VerifySuccess} />
          <Route path="/createquiz" component={CreateQuiz} />
          <Route path="/teacherwait" component={TeacherWait}/>
        </Switch>
      </Router>
    );
  }
}

export default App;
