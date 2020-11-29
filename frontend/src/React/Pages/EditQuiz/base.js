import React from "react";
import "./base.css";
import Axios from "axios";
import Session from "../../../resource/session.js";
import QuizForm from "../../../resource/quiz.js";

export default class EditQuiz extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            id: "",
            token: "",
            quiz: {},
            question: "0",
            redirectLogin: false,
        }
    }

    componentDidMount = () => {
        var token = Session.getToken();
        if (!token)
            return this.setState({ redirectLogin: true });
        var searchParams = new URLSearchParams(window.location.search);
        var id = searchParams.get("id");
        if (!id)
            return this.setState({ redirectLogin: true });
        Axios.post("api/getquiz", { id: id })
            .then(res => {
                if (!res.data.success)
                    return this.setState({ redirectLogin: true });
                this.setState({
                    id: id,
                    token: token,
                    quiz: new QuizForm(id, res.data.name, res.data.creatorId, res.data.description, res.data.thumbnailURL, res.data.questions)
                });
            });
    }

    handleChange = (e) => {
        if (e.target.getAttribute("id").toLowerCase() == "questionNumber") {
            if (isNaN(e.target.value)) return;
            if (parseInt(e.target.value < 0)) return;
            if (e.target.value.indexOf(".") != -1) return;
            this.setState({ question: String(e.target.value) });
        } else if (e.target.getAttribute("id").toLowerCase() == "quizNameInput") {
            this.state.quiz.set("name", e.target.value);
            this.forceUpdate();
        }
    }

    renderPage = () => {
        var question = this.state.quiz.getQuestion(Number(this.state.question));
        var renderAnswerChoices = () => {
            var choices = [];
            question.choices.forEach((choice, i) => {
                if (question.correctchoice == i) {
                    choices.push(
                        <div className="answerChoice">
                            <button key={i} className="markCorrectChoice correctChoiceBtn" />
                            {choice}
                        </div>
                    )
                } else {
                    choices.push(
                        <div className="answerChoice">
                            <button key={i} className="markCorrectChoice" onClick={() => {
                                question.correctchoice = i;
                                this.state.quiz.setQuestion(Number(this.state.question), question);
                                this.forceUpdate();
                            }} />
                            {choice}
                        </div>
                    )
                }
            });
            return choices;
        }
        return (
            <div className="editorPage">
                <div className="questionTitle">{question.question}</div>
                <div className="answerChoices">
                    {renderAnswerChoices()}
                    <button onClick={() => {
                        var question = this.state.quiz.getQuestion(Number(this.state.question));
                        question.choices.push("edit choice");
                        this.state.quiz.setQuestion(Number(this.state.question), question);
                        this.forceUpdate();
                    }}>Add Choice</button>
                </div>
            </div>
        )
    }

    save = () => {
        this.state.quiz.save(this.state.token);
    }

    render() {
        return (
            <div>
                <div className="editorSideBar">
                    <input id="quizNameInput" className="sideBarInput" type="text" value={this.state.quiz.get("name")} onChange={this.handleChange} />
                    <input id="questionNumber" className="editorPageInput" type="text" value={this.state.question} onChange={this.handleChange} />
                    <button className="saveQuizBtn">Save</button>
                </div>
                {this.renderPage()}
            </div>
        )
    }
}