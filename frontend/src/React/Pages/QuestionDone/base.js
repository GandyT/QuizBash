import React from "react";
import "./base.css";

export default class questionEnd extends React.Component {
    render() {
        return (
            <div className="questionendPage">
                <div className="questionendText">
                    <img src="https://i.imgur.com/i90Lvf0.png" alt="icon"></img>
                    <h1>Question Finished!</h1>
                    <h2>Waiting for others...</h2>
                </div>
            </div>
        )
    }
}