import React from "react";
import "./base.css";

export default class AwaitEmail extends React.Component {
    render() {
        return (
            <div className="awaitPage">
                <div className="awaitBox">
                <img src="https://i.imgur.com/bmyPn9e.png" alt="icon"></img>
                <h1>An email has been sent! Check your emails for the verification link.</h1>
                </div>
            </div>
        )
    }
}