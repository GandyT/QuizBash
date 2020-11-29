import React from "react";
import { Redirect, Link } from "react-router-dom";
import Axios from "axios";
import Session from "../../../resource/session.js";
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

export default class Editor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            token: undefined,
            quizzes: [],
            loginRedirect: false,
        }
    }

    componentDidMount = () => {
        var token = Session.getToken();
        // if (!token) return this.setState({ loginRedirect: true }); // Comment this line out to work on css

        Axios.post("api/getuser", { token: token })
            .then(res => {
                if (!res.data.success) return this.setState({ loginRedirect: true });;
                this.setState({
                    token: token,
                    quizzes: res.data.quizzes
                })
            });
    }

    renderQuizzes = () => {
        var quizzes = [];
        quizzes.forEach((quiz, i) => {
            quizzes.push(
                <QuizBox name={quiz.name} thumbnail={quiz.thumbnailURL} url={`/editquiz?id=${quiz.id}`} key={i} />
            )
        });

        return quizzes;
    }

    redirect = () => {
        if (this.state.loginRedirect)
            return <Redirect to="/login" />
    }

    render() {
        {this.redirect()}
        return (

            <div className="background">
                <div className="sidebar">
                    <h3 className="sidebartext">Question #:</h3>
                    <br></br>
                    <h3 className="placeholder">SOME NUMBER HERE</h3>
                    <br></br>
                    <h3 className="sidebartext">Name:</h3>
                    <br></br>
                    <h3 className="placeholder">SOME NAME HERE</h3>
                    <button className="quizbuttons">Delete question</button>
                    <button className="quizbuttons">Save</button>
                    <button className="quizbuttons">Add question</button>
                </div>
                <div className="questionHolder">
                    <div className="individualquestion">
                        <h3 className="sectiontext">Question: </h3>
                        <h3 className="answertext">Some random question here!</h3>
                        <h3 className="sectiontext">Answer: </h3>
                        <h3 className="answertext">Some random answer here!</h3>
                    </div>
                </div>
                {this.redirect()}
                    {this.renderQuizzes()}
            </div>
        )
    }
}
