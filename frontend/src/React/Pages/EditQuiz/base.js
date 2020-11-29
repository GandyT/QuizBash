import React from "react";
import "./base.css";
import Axios from "axios";
import { Redirect } from "react-router-dom";
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
        if (!token) return this.setState({ redirectLogin: true }); // Remove this line when trying to do css
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
        if (e.target.getAttribute("id").toLowerCase() == "questionnumber") {
            if (!e.target.value) return this.setState({ question: "" });
            if (isNaN(parseInt(e.target.value))) return;
            if (parseInt(e.target.value <= 0)) return;
            if (e.target.value.indexOf(".") != -1) return;
            this.setState({ question: String(parseInt(e.target.value) - 1) });
        } else if (e.target.getAttribute("id").toLowerCase() == "quizNameInput") {
            this.state.quiz.set("name", e.target.value);
            this.forceUpdate();
        }
    }

    renderPage = () => {
        if (Object.keys(this.state.quiz).length <= 0) return;
        if (!this.state.question) return <div></div>
        var question = this.state.quiz.getQuestion(Number(this.state.question));
        if (!question) return <div></div>;
        var renderAnswerChoices = () => {
            var choices = [];
            question.choices.forEach((choice, i) => {
                if (question.correctchoice == i) {
                    choices.push(
                        <div className="answerChoice" key={i}>
                            <button key={i} className="correctChoiceBtn" />
                            <input className="choiceText" value={choice} type="text" onChange={(e) => {
                                question.choices[i] = e.target.value;
                                this.state.quiz.setQuestion(parseInt(this.state.question), question);
                                this.forceUpdate();
                            }} />
                        </div>
                    )
                } else {
                    choices.push(
                        <div className="answerChoice" key={i}>
                            <button className="markCorrectChoice" onClick={() => {
                                question.correctchoice = i;
                                this.state.quiz.setQuestion(Number(this.state.question), question);
                                this.forceUpdate();
                            }} />
                            <button className="markCorrectChoice redBtn" onClick={() => {
                                if (question.correctchoice > i) {
                                    question.correctchoice -= 1;
                                }
                                question.choices.splice(i, 1);
                                this.state.quiz.setQuestion(Number(this.state.question), question)
                                this.forceUpdate();
                            }} />
                            <input className="choiceText" value={choice} type="text" onChange={(e) => {
                                question.choices[i] = e.target.value;
                                this.state.quiz.setQuestion(parseInt(this.state.question), question);
                                this.forceUpdate();
                            }} />
                        </div>
                    )
                }
            });
            return choices;
        }
        return (
            <div className="questionEditPage">
                <div className="questionTitleBreak">
                    <input className="questionTitle" value={question.question} onChange={(e) => {
                        question.question = e.target.value;
                        this.state.quiz.setQuestion(parseInt(this.state.question), question);
                        this.forceUpdate();
                    }} />
                </div>
                <div className="answerChoices">
                    {renderAnswerChoices()}
                    <button class="addChoiceBtn" onClick={() => {
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

    addQuestion = () => {
        this.state.quiz.addQuestion();
        this.forceUpdate();
    }

    removeQuestion = () => {
        this.state.quiz.removeQuestion(Number(this.state.question));
        this.forceUpdate();
    }
    renderQuestion = () => {
        if (Object.keys(this.state.quiz).length != 0)
            return this.state.quiz.get("questions").length;
    }
    renderName = () => {
        if (Object.keys(this.state.quiz).length != 0)
            return this.state.quiz.get("name");
    }
    redirectLogin = () => {
        if (this.state.redirectLogin)
            return <Redirect to="/login" />
    }

    getPage = () => {
        if (this.state.question)
            return parseInt(this.state.question) + 1;
        return "";
    }
    render() {
        return (
            <div className="editQuizPage">
                {this.redirectLogin()}
                <div className="editorSideBar">
                    <div>Questions: {this.renderQuestion()}</div>
                    <input id="quizNameInput" className="sideBarInput" type="text" value={this.renderName()} onChange={this.handleChange} />
                    <div>
                        Page Number &nbsp;
                    <input id="questionNumber" className="editorPageInput" type="text" value={this.getPage()} onChange={this.handleChange} />
                    </div>
                    <button className="addQuestionBtn" onClick={this.addQuestion}>Add Question</button>
                    <button className="addQuestionBtn" onClick={this.removeQuestion}>Delete</button>
                    <button className="addQuestionBtn" onClick={this.save}>Save</button>
                </div>
                {this.renderPage()}
            </div>
        )
    }
}