import React from "react";
import Session from "../../../resource/session.js";
import Axios from "axios";
import { Redirect, Link } from "react-router-dom";
import "./base.css";

class QuizBox extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            url: "",
            thumbnail: "",
            name: "",
        }
    }

    componentDidMount = () => {
        this.setState({
            url: this.props.url,
            thumbnail: this.props.thumbnail || "https://dpcpa.com/wp-content/uploads/2015/01/thumbnail-default.jpg",
            name: this.props.name
        });
    }

    render() {
        return (
            <Link to={this.state.url}>
                <div className="quizBox">
                    <div className="quizThumbnail" style={{ backgroundImage: `url("${this.state.thumbnail}")` }} />
                    <div className="quizName">{this.state.name}</div>
                </div>
            </Link>
        )
    }
}

export default class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            avatarURL: "",
            quizzes: [],
            token: "",
            id: "",
            redirectLogin: false,
        }
    }

    componentDidMount = () => {
        var token = Session.getToken();
        if (!token)
            return this.setState({ redirectLogin: true });
        Axios.post("api/getuser", { token: token })
            .then(res => {
                if (res.data.success) {
                    return this.setState({
                        username: res.data.username,
                        avatarURL: res.data.avatarURL || "https://icon-library.com/images/default-profile-icon/default-profile-icon-16.jpg",
                        quizzes: res.data.quizzes,
                        id: res.data.id,
                        token: token,
                    });
                }
                return this.setState({ redirectLogin: true });
            });
    }

    renderQuizzes = () => {
        var quizzes = [];
        this.state.quizzes.forEach((quiz, i) => {
            quizzes.push(
                <QuizBox name={quiz.name} thumbnail={quiz.thumbnailURL} url={`/hostquiz?id=${quiz.id}`} key={i} />
            )
        });
        return quizzes;
    }

    redirectLogin = () => {
        if (this.state.redirectLogin)
            return <Redirect to="/login" />
    }

    render() {
        return (
            <div className="profilePage">
                {this.redirectLogin()}
                <div className="profileTop">
                    <div className="topbar">
                        <div className="avatar" style={{ backgroundImage: `url("https://icon-library.com/images/default-profile-icon/default-profile-icon-16.jpg")` }} />
                        <div className="usernameBox">Username:  {this.state.username}</div>
                        <Link to="/joinquiz">
                            <button className="joinButton">Join A Game!</button>
                        </Link>
                        <Link to="/editor">
                            <button className="editButton">Quiz Editor</button>
                        </Link>
                    </div>
                </div>
                <div className="profileBottom">
                    <div className="quizSection">
                        <h1>Your Quizzes:</h1>
                        <br></br>
                        <br></br>
                        <br></br>
                        <br></br>
                        {this.renderQuizzes()}
                    </div>
                </div>
            </div>
        )
    }
}