import React from "react";
import "./base.css";

export default class teacherWaiting extends React.Component {
    render() {
        return (
            <div className="teacherWaiting">
                <div className="teacherText">
                    <img src="https://i.imgur.com/NAMu24E.png" alt="icon"></img>
                    <h1>Students that have joined:</h1>
                    <button className="startBtn">Start Game</button>
                </div>
            </div>
        )
    }
}