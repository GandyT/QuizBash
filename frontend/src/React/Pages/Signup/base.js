import Axios from "axios";
import { Redirect, Link } from "react-router-dom";
import React from "react";
import "./base.css";

export default class Signup extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            username: "",
            email: "",
            firstName: "",
            lastName: "",
            dobMonth: "",
            dobDay: "",
            dobYear: "",
            password: "",
            cpassword: "",
            error: "",
            signup: false,
        }
    }

    handleChange = (e) => {
        var id = e.target.getAttribute('id');
        this.state.error = "";
        this.state[id] = e.target.value;
        console.log(`${id}: ${this.state[id]}`)
        this.forceUpdate();
    }

    redirect = () => {
        if (this.state.signup)
            return <Redirect to="/awaitemail" />
    }

    signup = () => {
        var data = {
            username: this.state.username,
            email: this.state.email,
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            dob: `${this.state.dobMonth}/${this.state.dobDay}/${this.state.dobYear}`,
            password: this.state.password,
            cpassword: this.state.cpassword
        }

        Axios.post("api/signup", data)
            .then(res => {
                if (res.data.success)
                    return this.setState({ signup: true });
                this.setState({ error: res.data.error });
            });
    }

    renderError = () => {
        if (this.state.error)
            return this.state.error;
    }

    render() {
        return (
            <div className="signupPage">
                {this.redirect()}
                <div className="signupBox">
                    <img src="https://i.imgur.com/FdFTkbt.png" alt="icon"></img>
                    <h1>Signup</h1>
                    <div className="inputBox">
                        <input className="signupInput" id="username" type="text" placeholder="Username" onChange={this.handleChange} value={this.state.username} />
                        <input className="signupInput" id="email" type="text" placeholder="Email" onChange={this.handleChange} value={this.state.email} />
                        <input className="signupInput" id="firstName" type="text" placeholder="First Name" onChange={this.handleChange} value={this.state.firstName} />
                        <input className="signupInput" id="lastName" type="text" placeholder="Last Name" onChange={this.handleChange} value={this.state.lastName} />
                        <div className="dobBox">
                            <input className="signupInput" id="dobMonth" type="text" placeholder="MM" onChange={this.handleChange} value={this.state.dobMonth} />
                            <input className="signupInput" id="dobDay" type="text" placeholder="DD" onChange={this.handleChange} value={this.state.dobDay} />
                            <input className="signupInput" id="dobYear" type="text" placeholder="YYYY" onChange={this.handleChange} value={this.state.dobYear} />
                        </div>
                        <input className="signupInput" id="password" type="password" placeholder="Password" onChange={this.handleChange} value={this.state.password} />
                        <input className="signupInput" id="cpassword" type="password" placeholder="Confirm password" onChange={this.handleChange} value={this.state.cpassword} />
                    </div>
                    <div className="bottomSignup">
                        <div className="signupError">{this.renderError()}</div>
                        <button className="signupBtn" onClick={this.signup}>Signup</button>
                        <Link to="/login">
                            <br></br>
                            <a className = "redirect">Already Have An Account?</a>
                        </Link>
                    </div>
                </div>
            </div>
        )
    }
}