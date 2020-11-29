import React from "react";
import { Redirect } from "react-router-dom";
import Session from "../../../resource/session.js";
import Axios from "axios";
import "./base.css";

export default class TeacherWaiting extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            students: [],
            questions: [],
            playersFinal: [],
            token: "",
            quizId: "",
            gameId: "",
            ws: "",
            redirectLogin: false,
            question: 0,
            timeRemaining: 0,
            started: false,
            ended: false,
        }
    }

    componentDidMount = () => {
        var token = Session.getToken();
        if (!token)
            return this.setState({ redirectLogin: true });
        console.log("has token")
        var searchParams = new URLSearchParams(window.location.search);
        var quizId = searchParams.get("id");
        if (!quizId)
            return this.setState({ redirectLogin: true });
        console.log("has quiz id")
        Axios.post("api/creategame", { token: token, quizId: quizId })
            .then((res) => {
                console.log("successfully created a game!")
                if (!res.data.success) return this.setState({ redirectLogin: true });

                var ws = new WebSocket(`ws://${window.location.hostname}:8080/websocket`);
                ws.onopen = () => {
                    console.log("connected to websocket");
                    ws.send(JSON.stringify({
                        op: 1,
                        token: token,
                        gameId: res.data.gameId,
                    }))
                    this.setState({
                        questions: res.data.questions,
                        token: token,
                        quizId: quizId,
                        gameId: res.data.gameId,
                        ws: ws,
                    });
                }
                ws.onmessage = payload => {
                    var data = JSON.parse(payload.data)
                    var op = data.op;

                    if (op == 17) {
                        // Student Join
                        this.setState({ students: this.state.students.concat([data.username]) });
                    } else if (op == 7) {
                        this.setState({ playersFinal: data.players, ended: true });
                    }
                }
            })
    }

    redirectLogin = () => {
        if (this.state.redirectLogin)
            return <Redirect to="/login" />
    }

    nextRound = () => {
        console.log("attempting to start next round");
        this.state.ws.send(JSON.stringify({
            op: 9,
            token: this.state.token,
            gameId: this.state.gameId
        }));
        if (this.state.questions.length - 1 > this.state.question) {
            console.log("game isn't over, continuing");

            setTimeout(() => {
                this.state.ws.send(JSON.stringify({
                    op: 8,
                    token: this.state.token,
                    gameId: this.state.gameId,
                }));
                console.log("sent connection to start next round");
                var newQuestionNumber = this.state.question + 1;
                this.setState({
                    question: newQuestionNumber,
                    timeRemaining: this.state.questions[newQuestionNumber].time,
                }, this.countDown);
            }, 3000);
        }
    }

    countDown = () => {
        if (this.state.timeRemaining <= 0) {
            console.log('calling next round');
            return this.nextRound();
        } else {
            this.setState({ timeRemaining: this.state.timeRemaining - 1 });
        }

        setTimeout(() => { this.countDown() }, 1000);
    }

    startGame = () => {
        this.state.ws.send(JSON.stringify({
            op: 4,
            token: this.state.token,
            gameId: this.state.gameId
        }));
        console.log("started game");
        this.setState({
            timeRemaining: this.state.questions[0].time,
            started: true,
        }, this.countDown);
    }

    renderPage = () => {
        if (this.state.started && !this.state.ended)
            return (
                <div className="quizQuestionPage">
                    <div className="quizQuestionTitle">{this.state.questions[this.state.question].question}</div>
                    <div className="timeRemaining">{this.state.timeRemaining || "TIMES UP!"}</div>
                </div>
            )
    }

    renderStudents = () => {
        var students = [];
        this.state.students.forEach(username => {
            students.push(
                <div className="studentJoined">{username}</div>
            )
        });
        return students;
    }

    render() {
        if (this.state.ended) {
            return <div>Ended</div>
        }
        if (this.state.started) {
            return this.renderPage();
        }
        return (
            <div className="teacherWaiting">
                {this.redirectLogin()}
                <div className="teacherText">
                    <img src="https://i.imgur.com/NAMu24E.png" alt="icon"></img>
                    <div className="gameCode">{this.state.gameId}</div>
                    <h1>Students that have joined:</h1>
                    <div className="studentsJoined">
                        {this.renderStudents()}
                    </div>
                    <button className="startBtn" onClick={this.startGame}>Start Game</button>
                </div>
            </div>
        )
    }
}