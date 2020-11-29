import React from "react";
import "./base.css";
import { Redirect } from "react-router-dom";
import Session from "../.././../resource/session.js";

class WaitingRoom extends React.Component {
    render() {
        return (
            <div className="background">
                <div className="bar">
                    <h3 className="top-text">
                        Waiting Room
                        </h3>
                </div>
                <div className="add-bar">
                    <img className="spin" src="https://i.imgur.com/NAMu24E.png"></img>
                    <h3 className="generictext">Waiting for host to start!</h3>
                </div>
            </div>
        )
    }
}

export default class StudentWaiting extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            ws: "",
            token: "",
            gameId: "",
            currentQuestion: "",
            joined: false,
            started: false,
            ended: false,
            chosen: false,
            redirectLogin: false,
        };
    }

    componentDidMount = () => {
        var token = Session.getToken();
        if (!token)
            this.setState({ redirectLogin: true });
        this.setState({ token: token })
    }

    redirectLogin = () => {
        if (this.state.redirectLogin)
            return <Redirect to="/login" />
    }

    joinGame = () => {
        var ws = new WebSocket(`ws://${window.location.hostname}:8080/websocket`);
        ws.onopen = () => {
            ws.send(JSON.stringify({
                op: 2,
                token: this.state.token,
                gameId: this.state.gameId,
            }));
            console.log("connected to the game");
            this.setState({
                ws: ws,
                joined: true
            });
        }

        ws.onmessage = payload => {
            var data = JSON.parse(payload.data);
            var op = data.op;

            if (op == 5) {
                // Incoming Question
                this.setState({
                    chosen: false,
                    currentQuestion: {
                        header: data.question,
                        choices: data.choices
                    }
                })
            }
        }
    }

    renderQuestionPage = () => {

        var renderChoices = () => {
            var choices = [];
            this.state.currentQuestion.choices.forEach((choice, i) => {
                choices.push(
                    <div className="gameChoice" key={i}>
                        <button className="gameChoiceBtn" onClick={() => {
                            this.state.ws.send(JSON.stringify({
                                op: 3,
                                token: this.state.token,
                                gameId: this.state.gameId,
                                choice: i
                            }))
                            this.setState({
                                chosen: true,
                            })
                        }} />
                        {choice}
                    </div>
                )
            })
            return choices;
        }

        return (
            <div className="gameQuestionPage">
                <div className="gameQuestionName">this.state.currentQuestion.header</div>
                <div className="gameQuestionChoices">
                    {this.renderChoices()}
                </div>
            </div>
        )
    }

    render() {
        if (this.state.started)
            return this.renderQuestionPage();
        if (!this.state.started && this.state.joined)
            return <WaitingRoom />
        if (!this.state.joined)
            return (
                <div className="enterCodePage">
                    {this.redirectLogin()}
                    <div className="enterCodeBox">
                        <input className="enterCodeInput" placeholder="Enter Code" type="text" onChange={(e) => {
                            if (e.target.value && isNaN(e.target.value)) return;
                            this.setState({ gameId: e.target.value });
                        }} value={this.state.gameId} />
                        <div className="break" />
                        <div className="break" />
                        <button className="enterCodeBtn" onClick={this.joinGame}>Enter</button>
                    </div>
                </div>
            )
    }
}
