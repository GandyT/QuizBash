import React from "react";
import "./base.css";

export default class roundEnd extends React.Component {
    render() {
        return (
            <div className="roundendPage">
                <div className="roundendText">
                    <img src="https://i.imgur.com/hME3OY8.png" alt="icon"></img>
                    <h1>This Round Has Ended!</h1>
                    <h2>Please wait for others to finish.</h2>
                </div>
            </div>
        )
    }
}