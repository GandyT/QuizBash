import React from "react";
import "./base.css";
import Axios from "axios";
import Session from "../../../resource/session.js";
import { Redirect } from "react-router-dom";

export default class Editor extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      quizzes: undefined
    }
  }
  redirect = () => {
      if (this.state.signup)
          return <Redirect to="/login" />
  }
  componentDidMount = ()=>{
    var token = Session.getToken;
    if (!token){
    }
    Axios.post("api/getuser", (token: token))
    .then(res => {
        if (res.success) {
            this.state.quizzes = res.data.quizzes;
            return this.forceUpdate();
        }
        this.setState({ error: res.data.error });
    });
  }
    render() {
        {this.redirect()}
        return (
            <div>`${this.state.quizzes}`</div>
        )
    }
}
