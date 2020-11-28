import Axios from "axios";
import { Redirect } from "react-router-dom";
import React from "react";
import "./base.css";
import Session from "../../../resource/session.js";

export default class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            login: false,
            error: ""
        }
    }

    handleChange = (e) => {
        var id = e.target.getAttribute("id");
        this.state.error = "";
        this.state[id] = e.target.value;
        this.forceUpdate();
    }

    redirect = () => {
        if (this.state.login)
            return <Redirect to="/profile" />
    }

    login = () => {
        Axios.post("api/login", { email: this.state.email, password: this.state.password })
            .then(res => {
                if (res.data.success) {
                    Session.setToken(res.data.token);
                    return this.setState({ login: true });
                }
                this.setState({ error: res.data.error });
            });
    }

    renderError = () => {
        if (this.state.error)
            return this.state.error;
    }

    render() {
        return (
            <div>
                {this.redirect()}
                <div className="loginBox" >
                    <div className="inputLogin">
                        <input id="email" type="text" value={this.state.email} />
                        <input id="password" type="text" value={this.state.password} />
                    </div>
                    <div className="loginBottom">
                        <div className="loginError">{this.renderError()}</div>
                        <button className="loginBtn">Login</button>
                    </div>
                </div>
            </div>
        );
    }
}