import React from "react";
import "./base.css";
import makeChart from "../../../resource/chartjs.js";

export default class TeacherFinish extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            studentScores: [],
            chartRef: React.createRef(),
        }
    }

    componentDidMount = () => {
        var chartRef = this.state.chartRef.current.getContext("2d");
        var onlyScores = [];
        console.log(onlyScores);
        this.props.students.forEach(student => {
            onlyScores.push(student.score);
        })
        makeChart(chartRef, onlyScores, "Students", "Student Performance");
        this.setState({ studentScores: this.props.students });
    }

    renderStudentScores = () => {
        var scores = [];
        this.state.studentScores.forEach((student, i) => {
            scores.push(
                <div className="studentScore" key={i}>
                    {student.username} - {student.score}
                </div>
            )
        });
        return scores;
    }

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
                    <canvas id="studentChart" ref={this.state.chartRef} />
                    <hr></hr>
                    <br></br>
                    <h2>Student Scores:</h2>
                    <div className="studentScoresBox">
                        {this.renderStudentScores()}
                    </div>
                </div>
            </div>
        )
    }
}