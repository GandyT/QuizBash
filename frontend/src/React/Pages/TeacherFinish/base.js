import React from "react";
import "./base.css";

export default class TeacherFinish extends React.Component {
    render() {
        return (
            <div className="teacherFinish">
                <div className="finishText">
                    <img src="https://i.imgur.com/zWxRFq8.png" alt="icon"></img>
                    <h1>All Done!</h1>
                    <h2>Check out the statistics:</h2>
                </div>
                <div className="statBox">
                    <h1>Student Performance:</h1>
                    <hr></hr>
                    <br></br>
                    <h2>Student Scores:</h2>
                </div>
            </div>
        )
    }
}