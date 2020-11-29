import Axios from "axios";
import { Redirect, Link } from "react-router-dom";
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
                console.log(res);
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
            <div className="loginPage">
                {this.redirect()}
                <div className="loginBox" >
                    <img src="https://i.imgur.com/r42mQyx.png" alt="icon"></img>
                    <h1>Login</h1>
                    <div className="inputLogin">
                        <input className="input-field" id="email" placeholder="Email" type="text" onChange={this.handleChange} value={this.state.email} />
                        <input className="input-field" id="password" placeholder="Password" type="password" onChange={this.handleChange} value={this.state.password} />
                    </div>
                    <div className="loginBottom">
                        <div className="loginError">{this.renderError()}</div>
                        <button className="loginBtn" onClick={this.login}>Login</button>
                    </div>
                    <div className="bottomLogin">
                        <Link to="/signup">
                            <br></br>
                            <a className = "redirect">Don't Have An Account?</a>
                        </Link>
                    </div>
                </div>
            </div>
        );
    }
}