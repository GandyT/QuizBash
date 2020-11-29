import React from "react";
import "./base.css";
import Axios from "axios";
import Session from "../../../resource/session.js";
import { Redirect } from "react-router-dom";

export default class CreateQuiz extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            description: "",
            token: "",
            error: "",
            quizurl: "",
            loginRedirect: false,
        }
    }

    componentDidMount = () => {
        var token = Session.getToken();
        // if (!token) this.setState({ loginRedirect: true }); // Comment this line out to work on css
        this.setState({ token: token });
    }

    handleChange = (e) => {
        if (e.target.getAttribute("id") == "quizName") {
            this.state.error = "";
            this.setState({ name: e.target.value })
        } else {
            this.state.error = "";
            this.setState({ description: e.target.value })
        }
    }

    createQuiz = () => {
        console.log("creating quiz");
        Axios.post("api/createquiz", { token: this.state.token, name: this.state.name, description: this.state.description })
            .then(res => {
                console.log(res);
                if (!res.data.success)
                    return this.setState({ loginRedirect: true });
                this.setState({ quizurl: `/editquiz?id=${res.data.quizId}` });
            })
    }

    renderError = () => {
        if (this.state.error)
            return this.state.error
    }

    redirectLogin = () => {
        if (this.state.loginRedirect)
            return <Redirect to="login" />
    }
    redirectQuiz = () => {
        if (this.state.quizurl)
            return <Redirect to={this.state.quizurl} />
    }

    render() {
        return (
            <div>
                {this.redirectLogin()}
                {this.redirectQuiz()}
                <div className="bar"><h3 className="top-text">Quiz Editor</h3></div>
                <div className="background">
                    <div className="add-bar">
                      <input className="quizFields" id="quizName" onChange={this.handleChange} type="text" placeholder="Quiz Name" value={this.state.name} />
                      <input className="quizFields" id="quizDescription" onChange={this.handleChange} type="text" placeholder="Quiz Description" value={this.state.description} />
                      <button className="createQuiz">Create Quiz</button>
                    </div>
                    <div>
                    </div>
                </div>
                <div className="quizBoxLower">
                    <div className="quizBoxError">{this.renderError()}</div>
                    <button className="createQuizBtn" onClick={this.createQuiz}>Create Quiz</button>
                </div>
            </div>
        )
    }
}
