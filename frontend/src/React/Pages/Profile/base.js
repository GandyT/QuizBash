import React from "react";
import Session from "../../../resource/session.js";
import Axios from "axios";
import { Redirect } from "react-router-dom";
import "./base.css";

class QuizBox extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            url: "",
            thumbnail: "",
            name: "",
            redirect: false,
        }
    }

    componentDidMount = () => {
        this.setState({
            url: this.props.url,
            thumbnail: this.props.thumbnail || "https://dpcpa.com/wp-content/uploads/2015/01/thumbnail-default.jpg",
            name: this.props.name
        });
    }

    redirect = () => {
        if (this.state.redirect)
            return <Redirect to={this.state.url} />
    }

    render() {
        return (
            <div className="quizBox">
                {this.state.redirect()}
                <div className="quizThumbnail" style={{ backgroundImage: `url("${this.state.thumbnail}")` }} />
                <div className="quizName">{this.state.name}</div>
            </div>
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
                if (res.success) {
                    this.state.username = res.data.username;
                    this.state.avatarURL = res.data.avatarURL || "https://icon-library.com/images/default-profile-icon/default-profile-icon-16.jpg";
                    this.state.quizzes = res.data.quizzes;
                    this.state.id = res.data.id;
                    this.state.token = token;
                    return this.forceUpdate();
                }
                return this.setState({ redirectLogin: true });
            });
    }

    renderQuizzes = () => {
        var quizzes = [];
        this.state.quizzes.forEach((quiz, i) => {
            quizzes.push(
                <QuizBox name={quiz.name} thumbnail={quiz.thumbnailURL} url={`/hostquiz/${quiz.id}`} key={i} />
            )
        });
    }

    render() {
        return (
            <div>
                <div className="profileTop">
                    <div className="avatarBox">
                        <div className="avatar" style={{ backgroundImage: `url("${this.state.avatarURL}")` }} />
                    </div>
                    <div className="userInfoBox">
                        <div className="usernameBox">{this.state.username}</div>
                    </div>
                </div>
                <div className="profileBottom">
                    <div className="quizBox">
                        {this.renderQuizzes()}
                    </div>
                </div>
            </div>
        )
    }
}