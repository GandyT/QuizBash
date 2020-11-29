import React from "react";
import "./base.css";

export default class FinishQuiz extends React.Component {
    render() {
        return (
            <div className="finishquizPage">
                <div className="finishquizText">
                    <img src="https://i.imgur.com/plZKvY8.png" alt="icon"></img>
                    <h1>You Have Finished The Quiz!</h1>
                    <h2>Thank you for taking this quiz, you may now close this window</h2>
                </div>
            </div>
        )
    }
}